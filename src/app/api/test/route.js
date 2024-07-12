// app/api/test/route.js

export async function GET(req) {
  return new Response(
    JSON.stringify({ message: "API funcionando correctamente" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
