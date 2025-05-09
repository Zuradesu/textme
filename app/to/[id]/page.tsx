'use client'

import { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function ToPage() {
  const { id } = useParams() as { id: string };
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const docRef = doc(db, "questions", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setQuestionText(snap.data().text);
      }
    };
    if (id) fetchQuestion();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const docRef = doc(db, "questions", id);
    await updateDoc(docRef, {
      answers: arrayUnion({
        text: answer,
        createdAt: Date.now(),
      }),
    });

    setAnswer("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="bg-[#0D1B2A] min-h-screen flex flex-col items-center justify-start pt-32 px-6 text-white font-[Afacad]">
      <div className="bg-white/10 border border-white rounded-xl p-6 max-w-md w-full shadow-md">
        <h1 className="text-white text-xl text-center font-semibold mb-4">
          {questionText}
        </h1>

        <form onSubmit={handleSubmit}>
          <textarea
            name="answer"
            placeholder="Type your anonymous answer..."
            rows={4}
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-4 rounded-md bg-[#132238] text-white placeholder:text-white/50 outline-none shadow-[0_0_8px_rgba(255,255,255,0.1)]"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-md shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition"
          >
            Send Answer
          </button>
        </form>

        {sent && (
          <p className="text-emerald-300 text-center mt-4">
            ✔️ Thanks! Your answer has been sent anonymously.
          </p>
        )}
      </div>
    </div>
  );
}
