export async function sendEmailVerification(email: string, token: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: "TCAP <no-reply@trendycampus.com>",
      to: email,
      subject: "Verify your TCAP email",
      html: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}">here</a> to verify your email and continue your TCAP onboarding.</p>`
    })
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Resend email failed: ${payload}`);
  }

  return response.json();
}
