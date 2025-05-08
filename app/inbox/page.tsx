import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link"

interface Answer {
  text: string;
  createdAt: number;
}

interface Question {
  id: string;
  text: string;
  answers?: Answer[];
}

export default async function InboxPage() {
  const querySnapshot = await getDocs(collection(db, "questions"));

  const questions: Question[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Question, "id">;
    return {
      id: doc.id,
      text: data.text,
      answers: data.answers ?? [],
    };
  });



  return (
    <div className="bg-[#0D1B2A] min-h-screen flex flex-col items-center justify-start pt-32 px-6 font-[Afacad] text-white">
      <nav className="flex gap-6 mb-10">
        <Link
          href="/"
          className="px-4 py-1 font-medium text-sm opacity-60 hover:opacity-100 transition"
        >
          Home
        </Link>
        <Link
          href="/inbox"
          className="px-4 py-1 rounded-full border shadow-[0_0_8px_rgba(255,255,255,0.6)] font-medium text-sm"
        >
          Inbox
        </Link>
      </nav>

      <h1 className="text-2xl text-center font-bold mb-8">Inbox Jawaban</h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {questions.map((q) => (
          <Link
            key={q.id}
            href={`/inbox/${q.id}`}
            className="block bg-white/10 p-6 rounded-xl hover:bg-white/20 transition border border-white/10"
          >
            <p className="text-white/90 text-base font-semibold mb-2">{q.text}</p>
            <p className="text-sm text-gray-400">
              {q.answers?.length ?? 0} jawaban masuk
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
