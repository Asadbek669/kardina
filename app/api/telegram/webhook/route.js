export async function POST(req) {
  try {
    const update = await req.json();

    // Faqat xabar bo'lsa ishlatamiz
    if (!update.message) return new Response(null, { status: 200 });

    const chatId = update.message.chat.id;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    // Telegramga yuboradigan buyurtma matni (agar POST /order dan kelgan bo‘lsa)
    if (update.message.text && update.message.text.startsWith("/start")) {
      const welcomeText = `Salom! 👋\nSizning buyurtmangizni yuborishingiz mumkin.`;
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(welcomeText)}`
      );
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Webhook xatolik:", err);
    return new Response(null, { status: 500 });
  }
}
