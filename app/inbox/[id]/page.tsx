import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// ✅ Tambahan wajib agar typing tidak error saat build
export async function generateStaticParams() {
  return [];
}

// ✅ Gunakan function Page() biasa, non-async
export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <PageContent params={params} />;
}

// ✅ Logic async dipisah ke komponen ini
async function PageContent({ params }: { params: { id: string } }) {
  const docRef = doc(db, "questions", params.id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return notFound();

  const data = snap.data() as {
    text: string;
    answers?: { text: string; createdAt: number }[];
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📥 Jawaban Masuk</h1>

      <div className="max-w-3xl mx-auto">
        <p className="text-xl font-semibold mb-4 text-center border-b border-white/20 pb-4">
          Pertanyaan: {data.text}
        </p>

        <div className="flex flex-col gap-4">
          {data.answers && data.answers.length > 0 ? (
            data.answers.map((a, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-lg shadow-sm hover:bg-white/20 transition"
              >
                <p className="text-white/90">{a.text}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center">
              Belum ada jawaban masuk.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
