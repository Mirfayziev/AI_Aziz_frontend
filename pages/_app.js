import "../styles/globals.css";
import { useState, useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col justify-center items-center text-white">
        <img src="/logo.png" className="w-24 h-24 animate-pulse" />
        <h1 className="text-2xl mt-4 font-bold text-blue-400">AI Aziz yuklanmoqda...</h1>
      </div>
    );
  }

  return <Component {...pageProps} />;
}
