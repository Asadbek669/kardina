export async function POST(req) {
  try {
    const { phone, cart } = await req.json();

    if (!phone || !cart || cart.length === 0) {
      return new Response(JSON.stringify({ error: "Ma'lumot yetarli emas" }), { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Env o'zgaruvchilari topilmadi!");
      return new Response(JSON.stringify({ error: "Server konfiguratsiyasi noto'g'ri" }), { status: 500 });
    }

    // Sana va vaqt
    const now = new Date();
    const dateStr = now.toLocaleDateString("uz-UZ");
    const timeStr = now.toLocaleTimeString("uz-UZ");

    // Buyurtma matni
    let totalSum = 0;
    const orderLines = cart.map((item, index) => {
      const lineTotal = item.price * item.quantity;
      totalSum += lineTotal;
      return `${index + 1}. ${item.title} — ${item.quantity} x ${item.price.toLocaleString("uz-UZ")} so'm = ${lineTotal.toLocaleString("uz-UZ")} so'm`;
    });
    const orderText = orderLines.join("\n");
    const totalText = `💰 Umumiy summa: ${totalSum.toLocaleString("uz-UZ")} so'm`;

    const message = `📦 Yangi buyurtma\n📅 Sana: ${dateStr}\n⏰ Vaqt: ${timeStr}\n\n${orderText}\n\n${totalText}`;

    // Buyurtma xabarini yuborish
    const telegramResp = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`,
      { method: "GET" }
    );

    const telegramData = await telegramResp.json();
    if (!telegramResp.ok) {
      console.error("Telegram xatolik:", telegramData);
      return new Response(JSON.stringify({ error: "Telegramga yuborishda xatolik yuz berdi", details: telegramData }), { status: 500 });
    }

    // Telefon raqamini alohida yuborish
    const phoneMessage = `📱 Telefon raqami: ${phone}`;
    await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(phoneMessage)}`,
      { method: "GET" }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("API xatolik:", err);
    return new Response(JSON.stringify({ error: "Serverda xatolik yuz berdi" }), { status: 500 });
  }
}
