export async function POST(req) {
  try {
    const { phone, cart } = await req.json();

    if (!phone || !cart || cart.length === 0) {
      return new Response(
        JSON.stringify({ error: "Ma'lumot yetarli emas" }),
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Env o'zgaruvchilari topilmadi!");
      return new Response(
        JSON.stringify({ error: "Server konfiguratsiyasi noto'g'ri" }),
        { status: 500 }
      );
    }

    // 🆔 Oddiy ID (keyin DB bilan almashtirasan)
    const orderId = Math.floor(100 + Math.random() * 900);

    // 🕒 Toshkent vaqti
    const now = new Date();
    const dateStr = now.toLocaleDateString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // 🛍 Mahsulotlar
    let totalSum = 0;

    const orderLines = cart
      .map((item) => {
        const lineTotal = item.price * item.quantity;
        totalSum += lineTotal;

        return `<b>${item.title}</b>
${item.quantity} x ${item.price.toLocaleString("uz-UZ")} so'm
💰 ${lineTotal.toLocaleString("uz-UZ")} so'm`;
      })
      .join("\n\n");

    // ✨ FINAL MESSAGE (chiroyli dizayn)
    const message = `
🆕 <b>YANGI BUYURTMA</b>
🆔 <b>ID:</b> ${orderId}

━━━━━━━━━━━━━━━

📦 <b>Mahsulotlar:</b>

${orderLines}

━━━━━━━━━━━━━━━

💵 <b>Jami:</b> ${totalSum.toLocaleString("uz-UZ")} so'm

🕒 <b>Vaqt:</b> ${dateStr}

📱 <b>Telefon:</b> ${phone}
`;

    // 🚀 Telegramga yuborish (POST + HTML)
    const telegramResp = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const telegramData = await telegramResp.json();

    if (!telegramResp.ok) {
      console.error("Telegram xatolik:", telegramData);
      return new Response(
        JSON.stringify({
          error: "Telegramga yuborishda xatolik yuz berdi",
          details: telegramData,
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("API xatolik:", err);
    return new Response(
      JSON.stringify({ error: "Serverda xatolik yuz berdi" }),
      { status: 500 }
    );
  }
}
