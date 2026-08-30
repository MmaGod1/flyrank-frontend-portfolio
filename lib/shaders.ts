// Shared precision + uniform declarations, identical across all four —
// every fragment shader below needs these regardless of what it draws.
const HEADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
`;

/* ------------------------------------------------------------------
   1. PAPER GRAIN — a slow, barely-visible noise texture in the current
   swatch's tones. Uses u_time (grain drifts) and u_resolution (so the
   grain scale is consistent regardless of canvas size). No u_mouse.
   ------------------------------------------------------------------ */
export const PAPER_GRAIN_FRAG = `${HEADER}

// Cheap pseudo-random number from a 2D coordinate — the standard
// "hash" trick used everywhere in shader noise: no real randomness,
// just a function that looks random enough.
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Base cardboard tone (swap these to match your active swatch, or
  // pass them in as a uniform if you want it to follow theme changes live).
  vec3 background = vec3(0.969, 0.945, 0.898); // approx --background (cream)

  // Grain: sample noise at a coordinate that drifts slowly with time,
  // so the texture crawls instead of flickering randomly every frame.
  vec2 grainUv = uv * u_resolution.xy * 0.5 + u_time * 4.0;
  float grain = random(grainUv) * 0.04; // keep amplitude tiny — this must stay subtle

  gl_FragColor = vec4(background + grain, 1.0);
}
`;

/* ------------------------------------------------------------------
   2. GRADIENT FLOW — a soft blob-like gradient cycling between
   background/accent/accent-strong. Uses u_time (the flow animates)
   and u_mouse (the flow gently leans toward the cursor).
   ------------------------------------------------------------------ */
export const GRADIENT_FLOW_FRAG = `${HEADER}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Your three theme tones, as 0-1 RGB.
  vec3 background   = vec3(0.969, 0.945, 0.898); // --background
  vec3 accent       = vec3(0.725, 0.510, 0.353); // --accent (cardboard)
  vec3 accentStrong = vec3(0.541, 0.353, 0.204); // --accent-strong

  // Pull the pattern's center toward the mouse position a little —
  // this is the entire "mouse influence" for this shader: nudging
  // where the gradient's focal point sits.
  vec2 center = mix(vec2(0.5, 0.5), u_mouse, 0.3);
  float dist = distance(uv, center);

  // Two overlapping sine waves driven by time create a slow, organic
  // pulse rather than a mechanical linear fade.
  float wave = sin(dist * 6.0 - u_time * 0.6) * 0.5 + 0.5;

  vec3 color = mix(background, accent, wave);
  color = mix(color, accentStrong, smoothstep(0.6, 1.0, wave) * 0.4);

  gl_FragColor = vec4(color, 1.0);
}
`;

/* ------------------------------------------------------------------
   3. FOLD CREASE — a grid of lines that bends toward the mouse, like
   a sheet of paper flexing where you touch it. Uses u_time (a gentle
   idle sway) and u_mouse (the actual bend direction/strength).
   ------------------------------------------------------------------ */
export const FOLD_CREASE_FRAG = `${HEADER}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  vec3 background = vec3(0.969, 0.945, 0.898); // --background
  vec3 lineColor  = vec3(0.725, 0.510, 0.353); // --accent

  // Displace uv away from straight, based on distance to the mouse —
  // this is what makes the grid look like it's folding around the cursor.
  vec2 toMouse = uv - u_mouse;
  float mouseDist = length(toMouse);
  float bend = 0.08 / (mouseDist + 0.15); // stronger bend closer to cursor
  vec2 bentUv = uv + normalize(toMouse) * bend * 0.05;

  // A slow idle sway so the grid isn't perfectly static when the
  // mouse hasn't moved — this is u_time's whole job here.
  bentUv.x += sin(bentUv.y * 3.0 + u_time * 0.3) * 0.01;

  // Thin horizontal "crease" lines, spaced evenly.
  float gridLine = abs(fract(bentUv.y * 12.0) - 0.5);
  float line = smoothstep(0.02, 0.0, gridLine);

  vec3 color = mix(background, lineColor, line * 0.5);
  gl_FragColor = vec4(color, 1.0);
}
`;

/* ------------------------------------------------------------------
   4. INK STAMP — a slow pulsing radial sweep in the accent color,
   like a rubber stamp breathing. Uses u_time (the pulse) and
   u_resolution (keeps the shape circular regardless of aspect ratio).
   No u_mouse — deliberately calm and non-reactive.
   ------------------------------------------------------------------ */
export const INK_STAMP_FRAG = `${HEADER}

void main() {
  // Correct for non-square canvases so the "stamp" stays circular
  // instead of stretching into an ellipse on wide screens.
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  vec3 background = vec3(0.969, 0.945, 0.898); // --background
  vec3 ink        = vec3(0.725, 0.510, 0.353); // --accent

  float dist = length(uv);

  // A ring that expands and fades, looping every few seconds —
  // fract() here is what makes it loop instead of expanding forever.
  float pulse = fract(u_time * 0.15);
  float ring = smoothstep(0.02, 0.0, abs(dist - pulse * 0.8));

  vec3 color = mix(background, ink, ring * 0.6);
  gl_FragColor = vec4(color, 1.0);
}
`;