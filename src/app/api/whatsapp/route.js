// app/api/webhook/route.js

export async function GET(req) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode && token) {
    if (mode === "subscribe" && token === "david") {
      // Token de verificación debe coincidir
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    } else {
      return new Response("Error de verificación", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } else {
    return new Response("Modo o token faltantes", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// app/api/webhook/route.js

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook recibido:", body);

    // Extrae los datos del mensaje
    const { Body, From } = body; // Asegúrate de ajustar esto según la estructura de los datos recibidos

    // Procesa los datos del mensaje
    const responseMessage = `Hola, recibimos tu mensaje: "${Body}" desde ${From}`;

    // Aquí podrías agregar lógica adicional, como guardar en una base de datos o responder al mensaje

    return new Response(
      JSON.stringify({ message: responseMessage, data: body }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al procesar el webhook:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar el webhook" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
