'use client'

import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { Geist, Geist_Mono, Bokor, Afacad_Flux } from "next/font/google";
import { useEffect } from "react";

const bokorFont = Bokor({ subsets: ["latin"], weight: "400", variable: "--font-bokor" });
const afacadFont = Afacad_Flux({ subsets: ["latin"], weight: "400", variable: "--font-afacad" });
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function Home() {
  const [question, setQuestion] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (!question.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "questions"), {
        text: question,
        createdAt: serverTimestamp(),
      });

      const url = `${window.location.origin}/to/${docRef.id}`;
      setLink(url);
      setQuestion("");
    } catch (err) {
      console.error("Gagal simpan ke Firebase:", err);
    }
  };

  const [history, setHistory] = useState<any[]>([]);

useEffect(() => {
  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setHistory(result);
  };

  fetchQuestions();
}, []);

  return (
    <div
      className={`bg-[#0D1B2A] min-h-screen flex flex-col items-center justify-start pt-32 px-6 font-[Afacad] text-white
      ${bokorFont.variable} ${afacadFont.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <nav className="flex gap-6 mb-10">
        <Link href="/" className="px-4 py-1 rounded-full border border-white shadow-[0_0_8px_rgba(255,255,255,0.6)] font-medium text-sm">
          Home
        </Link>
        <Link href="/inbox" className="px-4 py-1 font-medium text-sm opacity-60 hover:opacity-100 transition">
          Inbox
        </Link>
      </nav>

      <h1 className="text-lg mb-4">Add your question</h1>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your question here..."
          className="w-full px-4 py-3 bg-[#132238] text-white rounded-lg outline-none shadow-[0_0_12px_rgba(255,255,255,0.2)] placeholder:text-white/60"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mb-8 px-5 py-2 rounded-full bg-emerald-500 text-white font-medium text-sm shadow-[0_0_10px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] transition"
      >
        Generate Link
      </button>
      
      {history.length > 0 && (
  <div className="mt-8 w-full max-w-md space-y-4">
    {history.map((q) => (
      <div
        key={q.id}
        className="bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition border border-white/10"
      >
        <p className="text-white/90 text-base font-semibold">{q.text}</p>
        <p className="text-sm text-gray-400">
          <a
            href={`/to/${q.id}`}
            className="text-emerald-300 underline"
            target="_blank"
          >
            View Link
          </a>
        </p>
      </div>
    ))}
  </div>
)}


    </div>
  );
}
