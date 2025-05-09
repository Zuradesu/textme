import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { sendAnswer } from "@/app/actions/sendAnswer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ToPage(props: PageProps) {
  const params = await props.params;
  const docRef = doc(db, "questions", params.id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return notFound();
  const data = snap.data() as { text: string };

  return (
    <div className="bg-[#0D1B2A] min-h-screen flex flex-col items-center justify-start pt-32 px-6 text-white font-[Afacad]">
      <div className="bg-white/10 border border-white rounded-xl p-6 max-w-md w-full shadow-md">
        <h1 className="text-white text-xl text-center font-semibold mb-4">
          {data.text}
        </h1>

        <form
          action={async (formData) => {
            "use server";
            const answer = formData.get("answer")?.toString();
            if (!answer) return;
            await sendAnswer(params.id, answer);
          }}
        >
          <textarea
            name="answer"
            placeholder="Type your anonymous answer..."
            rows={4}
            required
            className="w-full p-4 rounded-md bg-[#132238] text-white placeholder:text-white/50 outline-none shadow-[0_0_8px_rgba(255,255,255,0.1)]"
          ></textarea>

          <button
            type="submit"
            className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-md shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition"
          >
            Send Answer
          </button>
        </form>
      </div>
    </div>
  );
}
