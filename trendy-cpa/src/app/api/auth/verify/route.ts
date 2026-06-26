import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }
  if (!db) {
    return NextResponse.json({ error: "Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* env vars." }, { status: 500 });
  }

  // Find verification doc by token
  const q = query(collection(db, "email_verifications"), where("token", "==", token));
  const snap = await getDocs(q);
  const first = snap.docs[0];
  if (!first) {
    return NextResponse.json({ error: "Invalid verification token" }, { status: 404 });
  }

  const { email } = first.data() as { email: string };

  // Update profile(s) where email matches
  const profilesQ = query(collection(db, "profiles"), where("email", "==", email));
  const profilesSnap = await getDocs(profilesQ);
  for (const p of profilesSnap.docs) {
    await updateDoc(doc(db, "profiles", p.id), { verified: true });
  }

  return NextResponse.json({ status: "verified" });
}
