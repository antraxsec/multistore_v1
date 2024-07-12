"use client";
import { useState, useEffect } from "react";

function WebhookMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Body: "Este es un mensaje de prueba",
            From: "+1234567890",
          }),
        });

        const data = await response.json();
        console.log(data);
        setMessages(data.data); // Asumiendo que la respuesta contiene los datos del mensaje
      } catch (error) {
        console.error("Error al consumir la API:", error);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Mensajes Recibidos</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.From}: {message.Body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WebhookMessages;
