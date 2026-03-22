// app/api/order/route.js
export async function POST(req) {
  try {
    const { phone, cart } = await req.json();

    if (!phone || !cart || cart.length === 0) {
      return new Response(JSON.stringify({ error: "Ma'lumot yetarli emas" }), {
        status: 400,
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN; // .env.local da saqlang
    const chatId = process.env.TELEGRAM_CHAT_ID;     // .env.local da saqlang

    const orderText = cart
      .map(
        (item) =>
          `${item.title} (${item.quantity} x ${item.price.toLocaleString(
            "uz-UZ"
          )} so'm)`
      )
      .join("\n");

    const message = `📦 Yangi buyurtma:\n${orderText}\n📱 Telefon: ${phone}`;

    const telegramResp = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        message
      )}`
    );

    if (!telegramResp.ok) {
      throw new Error("Telegramga yuborishda xatolik yuz berdi");
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Serverda xatolik yuz berdi" }),
      { status: 500 }
    );
  }
}