"use server";

import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export async function sendAnswer(id: string, answer: string) {
  const docRef = doc(db, "questions", id);
  await updateDoc(docRef, {
    answers: arrayUnion({
      text: answer,
      createdAt: Date.now(),
    }),
  });
}
