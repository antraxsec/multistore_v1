// app/api/sendMessage/route.js

export async function POST(req) {
  const { to, type, options } = await req.json();
  let message = {};

  switch (type) {
    case "text":
      message = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
          preview_url: false,
          body: options.body,
        },
      };
      break;

    case "image":
      message = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "image",
        image: {
          link: options.imageLink,
          caption: options.caption,
        },
      };
      break;

    case "location":
      message = {
        messaging_product: "whatsapp",
        to: to,
        type: "location",
        location: {
          longitude: options.longitude,
          latitude: options.latitude,
          name: options.name,
          address: options.address,
        },
      };
      break;

    case "product":
      message = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "interactive",
        interactive: {
          type: "product",
          body: {
            text: options.bodyText,
          },
          footer: {
            text: options.footerText,
          },
          action: {
            catalog_id: options.catalogId,
            product_retailer_id: options.productId,
          },
        },
      };
      break;

    case "catalog":
      message = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "interactive",
        interactive: {
          type: "product_list",
          header: {
            type: "text",
            text: options.headerText,
          },
          body: {
            text: options.bodyText,
          },
          action: {
            catalog_id: options.catalogId,
            sections: options.sections,
          },
        },
      };
      break;

    default:
      return new Response(
        JSON.stringify({ success: false, error: "Invalid message type" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
  }

  const url = `https://graph.facebook.com/v19.0/365286886667892/messages`;
  const token =
    "EAAKqVdGnZCL4BO62elxskZCZB4h0u98P635E5WtmrWqlcWlhHx0flJ8otEOoRZBWZBBj0lMfQ4osyHCSZA0akaMFTJZBx4zzHZBcm6rFXlrmwL5FDhXaSaqH3fQfPPrGZCbHf5ZB9151YpTYmkP8ZA9ZAa4I7BcZAeMO1ZCuNknphaXHVkPVPlKTqBJPzme8XNPw9LeFVYsQZDZD";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
