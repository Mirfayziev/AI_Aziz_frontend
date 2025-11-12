import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // LocalStorage bilan chat saqlash
  useEffect(() => {
    const saved = localStorage.getItem("ai_chat");
    if (saved) setChat(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ai_chat", JSON.stringify(chat));
  }, [chat]);

  async function sendMsg(e) {
    e.preventDefault();
    if (!msg.trim()) return;

    const newChat = [...chat, { sender: "user", text: msg }];
    setChat(newChat);
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`,
        { text: msg },
        { timeout: 20000 }
      );
      const reply = res.data.response;
      setChat([...newChat, { sender: "ai", text: reply }]);
      await speak(reply);
    } catch (error) {
      setChat([
        ...newChat,
        { sender: "ai", text: "⚠️ Xatolik yuz berdi. Server yoki internetni tekshiring." },
      ]);
    } finally {
      setLoading(false);
      setMsg("");
    }
  }

  async function speak(text) {
    try {
      const fd = new FormData();
      fd.append("text", text);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/speak`,
        fd,
        { responseType: "blob" }
      );
      const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.play();
    } catch {
      console.log("Ovozli javobni o‘qib bo‘lmadi.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-4">
      {/* LOGO */}
      <header className="flex items-center justify-center space-x-2 mb-6 mt-4">
        <img src="/logo.png" alt="AI Aziz" className="w-10 h-10" />
        <h1 className="text-3xl font-bold tracking-wide">AI Aziz</h1>
      </header>

      {/* CHAT OYNA */}
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl p-4 space-y-2 overflow-y-auto h-[65vh]">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl ${
              c.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
            } w-fit max-w-[80%] break-words`}
          >
            {c.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">AI yozmoqda...</p>}
      </div>

      {/* XABAR YUBORISH */}
      <form onSubmit={sendMsg} className="w-full max-w-lg flex mt-4">
        <input
          className="flex-1 p-3 rounded-l-xl bg-gray-700 text-white outline-none placeholder-gray-400"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Savolingizni yozing..."
        />
        <button
          type="submit"
          className="bg-blue-600 px-5 rounded-r-xl hover:bg-blue-700 transition-all"
        >
          Yuborish
        </button>
      </form>

      <footer className="mt-6 text-sm text-gray-500">
        © 2025 AI Aziz — Shaxsiy sun’iy intellekt yordamchi
      </footer>
    </div>
  );
}






