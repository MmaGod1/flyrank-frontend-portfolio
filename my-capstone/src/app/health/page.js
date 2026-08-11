export default async function HealthPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      <h1>Health Check</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}