export async function POST(req) {
  try {
    const { phone, cart } = await req.json();

    // Ma'lumotni tekshirish
    if (!phone || !cart || cart.length === 0) {
      return new Response(
        JSON.stringify({ error: "Ma'lumot yetarli emas" }),
        { status: 400 }
      );
    }

    // Env o'zgaruvchilarni olish
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Env o'zgaruvchilari topilmadi!");
      return new Response(
        JSON.stringify({ error: "Server konfiguratsiyasi noto'g'ri" }),
        { status: 500 }
      );
    }

    // Buyurtma matni tayyorlash
    const orderText = cart
      .map(
        (item) =>
          `${item.title} (${item.quantity} x ${item.price.toLocaleString(
            "uz-UZ"
          )} so'm)`
      )
      .join("\n");

    const message = `📦 Yangi buyurtma:\n${orderText}\n📱 Telefon: ${phone}`;

    // Telegramga yuborish
    const telegramResp = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        message
      )}`,
      { method: "GET" } // GET ishlatiladi, GET yoki POST ikkalasi ishlaydi
    );

    const telegramData = await telegramResp.json(); // Telegramdan kelgan javob

    if (!telegramResp.ok) {
      console.error("Telegram xatolik:", telegramData);
      return new Response(
        JSON.stringify({ error: "Telegramga yuborishda xatolik yuz berdi", details: telegramData }),
        { status: 500 }
      );
    }

    // Muvaffaqiyatli yuborish
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API xatolik:", err);
    return new Response(
      JSON.stringify({ error: "Serverda xatolik yuz berdi" }),
      { status: 500 }
    );
  }
}
