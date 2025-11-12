import { useState } from "react";
import axios from "axios";

export default function Plan() {
  const [text, setText] = useState("");
  const [plan, setPlan] = useState("");

  async function generatePlan() {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plan`, { text });
    setPlan(res.data.plan);
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🗓️ Kundalik reja</h1>
      <textarea
        className="border p-2 w-full h-32 rounded mb-4"
        placeholder="Bugungi ishlaringni yozing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={generatePlan} className="bg-blue-600 text-white px-4 py-2 rounded">
        Reja tuzish
      </button>
      <pre className="mt-6 bg-white p-4 rounded shadow">{plan}</pre>
    </div>
  );
}
