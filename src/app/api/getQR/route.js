export async function GET(req) {
  if (global.qrCode) {
    return new Response(JSON.stringify({ qrCode: global.qrCode }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "QR Code not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
