import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);
    setReply("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`,
        { text: msg },
        { timeout: 15000 }
      );
      setReply(res.data.response);
    } catch (error) {
      setReply("❌ Xatolik: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function playVoice() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/speak`,
        new URLSearchParams({ text: reply }),
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(res.data);
      new Audio(url).play();
    } catch (e) {
      alert("Ovozli javobda xato: " + e.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🤖 AI Aziz</h1>
      <textarea
        className="border p-2 w-1/2 h-24 rounded mb-4"
        placeholder="Xabar yozing..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <div className="flex space-x-4">
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>
        <button
          onClick={playVoice}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          🔊 Ovozli javob
        </button>
      </div>

      <div className="bg-white mt-6 p-4 rounded shadow-md w-1/2 min-h-[100px]">
        <p>{reply}</p>
      </div>
    </div>
  );
}



