import { NextResponse } from "next/server";
import { sendEmailVerification } from "@/lib/resend";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const token = crypto.randomUUID();
  if (!db) {
    return NextResponse.json({ error: "Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* env vars." }, { status: 500 });
  }

  // Store verification token in Firestore keyed by email
  await setDoc(doc(db, "email_verifications", email), {
    email,
    token,
    created_at: new Date().toISOString(),
  });

  await sendEmailVerification(email, token);

  return NextResponse.json({ status: "sent" });
}
