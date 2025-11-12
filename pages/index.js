import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ai-aziz-backend.onrender.com/chat",
        { text: msg }
      );
      setReply(res.data.response);
    } catch (error) {
      setReply("Xatolik yuz berdi. Backend manzilini tekshiring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Aziz</h1>

      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Xabar yozing..."
        className="border p-2 w-1/2 h-24 mb-4 rounded"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Yuborilmoqda..." : "Yuborish"}
      </button>

      <div className="mt-6 bg-white p-4 rounded shadow-md w-1/2">
        <p>{reply}</p>
      </div>
    </div>
  );
}
