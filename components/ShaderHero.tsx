"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  // A fullscreen quad: a_position is just the four corners of the canvas
  // in clip space (-1 to 1). No 3D math needed for a 2D shader hero.
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

interface ShaderHeroProps {
  fragmentShader: string;
  className?: string;
}

export function ShaderHero({ fragmentShader, className }: ShaderHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
      }
      return shader;
    }

    const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = compile(gl.FRAGMENT_SHADER, fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad: two triangles covering the whole clip-space area.
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const u_time = gl.getUniformLocation(program, "u_time");
    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_mouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0.5, y: 0.5 };
    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // flip Y: GL origin is bottom-left
    }
    canvas.addEventListener("pointermove", handlePointerMove);

    function resize() {
      // Cap devicePixelRatio at 2 — rendering a fullscreen shader at raw
      // 3x/4x mobile pixel density burns battery/GPU for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas!.clientWidth * dpr;
      const height = canvas!.clientHeight * dpr;
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }

    let rafId: number;
    let startTime = performance.now();
    let isVisible = document.visibilityState === "visible";

    function render(now: number) {
      if (!isVisible) return; // paused; loop restarts from handleVisibilityChange
      resize();
      const elapsed = (now - startTime) / 1000;
      gl!.uniform1f(u_time, elapsed);
      gl!.uniform2f(u_resolution, canvas!.width, canvas!.height);
      gl!.uniform2f(u_mouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }

    function handleVisibilityChange() {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        startTime = performance.now(); // avoid a time jump after being hidden
        rafId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(rafId);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (prefersReducedMotion) {
      // Draw exactly one static frame at time = 0, then stop entirely.
      resize();
      gl.uniform1f(u_time, 0);
      gl.uniform2f(u_resolution, canvas.width, canvas.height);
      gl.uniform2f(u_mouse, 0.5, 0.5);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fragmentShader]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "block h-full w-full"}
      aria-hidden="true"
    />
  );
}