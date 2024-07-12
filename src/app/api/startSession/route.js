import wppconnect from "@wppconnect-team/wppconnect";

let client;

export async function POST(req) {
  try {
    client = await wppconnect.create({
      session: "sessionName",
      headless: true,
      useChrome: true,
      catchQR: (qrCode, asciiQR) => {
        global.qrCode = qrCode;
      },
    });

    return new Response(JSON.stringify({ message: "Session started" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error starting session" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
