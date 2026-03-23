export async function POST(req) {
  try {
    const update = await req.json();

    if (!update.message) return new Response(null, { status: 200 });

    const chatId = update.message.chat.id;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (update.message.text && update.message.text.startsWith("/start")) {
      const welcomeText = `
🌟 <b>Kardina Shop’ga xush kelibsiz!</b>

Assalomu alaykum! 👋  
Siz biz orqali eng sifatli mahsulotlarni qulay va tez buyurtma qilishingiz mumkin 🚀  

🛍 <b>Buyurtma berish juda oson:</b>  
👉 Saytga kiring va mahsulotni tanlang  

🌐 <b>Buyurtma uchun:</b>  
https://kardina.vercel.app  

💎 <b>Bizda:</b>  
✔ Sifatli mahsulotlar  
✔ Tezkor yetkazib berish  
✔ Ishonchli xizmat  

📞 Savollar bo‘lsa yozing — yordam beramiz 😊
`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeText,
          parse_mode: "HTML",
        }),
      });
    }

    return new Response(null, { status: 200 });

  } catch (err) {
    console.error("Webhook xatolik:", err);
    return new Response(null, { status: 500 });
  }
}
