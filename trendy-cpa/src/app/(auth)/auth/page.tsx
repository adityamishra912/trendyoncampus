"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  increment,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PersonalInfo from "@/components/auth/PersonalInfo";
import AcademicInfo from "@/components/auth/AcademicInfo";
import AdditionalInfo from "@/components/auth/AdditionalInfo";
import toast from "react-hot-toast";
import AvatarSelection from "@/components/auth/AvatarSelection";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = auth?.currentUser;
  const [step, setStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const avatars = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
  ];

  const form = useForm({
    defaultValues: {
      // Personal
      name: "",
      email: "",
      phone: "",
      gender: "",

      // Academic
      college: "",
      otherCollege: "",
      year: "",
      pincode: "",
      city: "",
      state: "",

      // Additional
      linkedin: "",
      motivation: "",
      referral: "",
    },
  });

  // Get User
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          form.setValue(
            "email",
            user.email || ""
          );

        }

      }
    );

    return () => unsubscribe();

  }, [form]);

  // Register
  const handleRegister = async () => {

    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      return;
    }

    try {
      setLoading(true);

      const values = form.getValues();

      // Validation
      if (
        !values.name ||
        !values.email ||
        !values.phone ||
        !values.gender ||
        !values.college ||
        !values.year ||
        !values.pincode ||
        !values.city ||
        !values.state
      ) {
        // setError("Please fill all required fields");
        // console.log("All fields not filled");
        toast.error("Please fill all required fields");
        setLoading(false);
        return;
      }

      // Generate unique CA id
      const userId = await generateUserId();
      console.log('ID:', userId)

      // Generate unique referral code for new user
      const myReferralCode = await generateReferralCode(values.name);
      console.log('Ref:', myReferralCode)

      let referredBy = null;
      let startingPoints = 0;

      // Check entered referral code
      if ((values.referral).trim() !== "") {

        const referralRef = doc(
          db,
          "referralCodes",
          (values.referral).trim().toUpperCase()
        );

        const referralSnap = await getDoc(referralRef);

        // Referral exists
        if (referralSnap.exists()) {

          referredBy = referralSnap.data().uid;

          // Give bonus to new user
          startingPoints = 100;
        } else {
          // setError("Invalid referral code");
          toast.error("Invalid referral code");
          setLoading(false);
          return;
        }
      }

      // Save to Firebase
      const userDocRef = await addDoc(collection(db, "users"), {
        uid: user?.uid,
        userId,
        fullName: values.name,
        email: values.email,
        phone: values.phone, // string
        gender: values.gender,
        college: values.college,
        yearOfStudy: Number(values.year), // number
        linkedinUrl: values.linkedin,

        profilePicture: selectedAvatar,

        pincode: values.pincode, // string
        city: values.city,
        state: values.state,
        motivation: values.motivation,

        points: startingPoints,
        tasksDone: 0,
        referrals: 0,

        referralCode: myReferralCode,
        referredBy,


        createdAt: new Date(),
      });


      // Store referral code mapping
      await setDoc(
        doc(db, "referralCodes", myReferralCode),
        {
          uid: user?.uid,
          userDocId: userDocRef.id,
          createdAt: serverTimestamp(),
        }
      );


      // If referral was used
      if (referredBy) {

        // Create referral history entry
        await addDoc(collection(db, "referrals"), {
          referrerUid: referredBy,
          referredUid: user?.uid,

          referredUserDocId: userDocRef.id,

          referralCodeUsed: (values.referral).trim().toUpperCase(),

          createdAt: serverTimestamp(),
        });


        // Reward referrer
        const usersRef = collection(db, "users");

        const q = query(
          usersRef,
          where("uid", "==", referredBy)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

          const referrerDoc = querySnapshot.docs[0];

          await updateDoc(referrerDoc.ref, {
            points: increment(100),
            referralsCount: increment(1),
          });
        }
      }

      // setError("");

      // Set session cookie and role for the newly registered user
      try {
        const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
        const role = "ambassador";
        sessionStorage.setItem("role", role);
        document.cookie = `tc_session=1; path=/; max-age=${COOKIE_MAX_AGE}`;
        document.cookie = `tc_role=${encodeURIComponent(role)}; path=/; max-age=${COOKIE_MAX_AGE}`;
      } catch (e) {
        // ignore cookie errors in non-browser environments
      }

      router.push('/dashboard/home');

    } catch (error) {
      console.error(error);
      // setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Generate unique id
  const generateUserId = async () => {
    let isUnique = false;
    let userId = "";

    while (!isUnique) {
      const random = Math.floor(100000 + Math.random() * 900000);

      userId = `TCA-2026-${random}`;

      const q = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        isUnique = true;
      }
    }

    return userId;
  };

  // Generate unique referral code
  const generateReferralCode = async (name: string) => {

    let isUnique = false;
    let code = "";

    while (!isUnique) {

      // Random 4 digit number
      const random = Math.floor(
        100000 + Math.random() * 900000
      );

      // First 4 letters from name
      const prefix = name
        .replace(/\s/g, "")
        .substring(0, 4)
        .toUpperCase();

      code = `${prefix}${random}`;

      const referralRef = doc(
        db,
        "referralCodes",
        code
      );

      const referralSnap = await getDoc(referralRef);

      if (!referralSnap.exists()) {
        isUnique = true;
      }
    }

    return code;
  };

  // Auto Scroll
  const onInvalid = (errors: any) => {

    const firstError = Object.keys(errors)[0];

    const element =
      document.querySelector(`[name="${firstError}"]`) ||
      document.getElementById(`${firstError}-field`);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    /*
      NORMAL INPUTS
    */
    const input = document.querySelector(
      `[name="${firstError}"]`
    ) as HTMLElement;

    if (input) {
      input.focus();
    }

    /*
      REACT SELECT
    */
    if (firstError === "college") {

      const reactSelectInput = document.querySelector(
        "#college-field input"
      ) as HTMLInputElement;

      reactSelectInput?.focus();

    }
  };

  // 
  // const validateCurrentStep = async () => {

  //   if (step === 1) {
  //     return await form.trigger([
  //       "name",
  //       "email",
  //       "phone",
  //       "gender",
  //     ]);
  //   }

  //   if (step === 2) {
  //     return await form.trigger([
  //       "college",
  //       "year",
  //       "pincode",
  //       "city",
  //       "state",
  //     ]);
  //   }

  //   if (step === 3) {
  //     return true;
  //   }

  //   if (step === 4) {
  //     return !!selectedAvatar;
  //   }

  //   return true;
  // };

  // Next/Prev

  // const nextStep = async () => {
  //   const valid = await validateCurrentStep();

  //   if (!valid) return;

  //   setStep((prev) => prev + 1);

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  const nextStep = async () => {
    let fields: string[] = [];

    if (step === 1) {
      fields = [
        "name",
        "email",
        "phone",
        "gender",
      ];
    }

    if (step === 2) {
      fields = [
        "college",
        "year",
        "pincode",
        "city",
        "state",
      ];
    }

    if (step === 3) {
      fields = [
        "motivation",
      ];
    }

    const valid = await form.trigger(fields as any);

    // if (!valid) {
    //   toast.error("Please fill all required fields");
    //   return;
    // }

    if (!valid) {
      const firstError = Object.keys(
        form.formState.errors
      )[0];

      const labels = {
        name: "Full Name",
        phone: "Phone Number",
        gender: "Gender",
        college: "College",
        year: "Year of Study",
        pincode: "Pincode",
        city: "City",
        state: "State",
      };

      toast.error(
        `${labels[firstError as keyof typeof labels]} is required`
      );

      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] px-4 py-10 md:px-8 flex flex-col items-center">

      <div className="mx-auto max-w-6xl flex flex-col items-center">

        {/* Heading */}
        <div className="mb-10">

          <h1
            className="
      text-4xl font-black
      tracking-tight text-center text-[#2D2926]
    "
          >
            Sign Up
          </h1>

          <p
            className="
      mt-2 text-[#6D4C41]
    "
          >
            Complete your details to join the TCAP program.
          </p>

        </div>

        {/* Progress Bar */}
        <div className="mb-10 w-full max-w-[680px]">

          <div className="mb-2 flex justify-between text-sm text-[#6D4C41]">
            <span>Step {step} of 4</span>
            <span>{step * 25}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#F3E7BC]">
            <div
              className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
              style={{
                width: `${step * 25}%`,
              }}
            />
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={form.handleSubmit(
            handleRegister,
            onInvalid
          )}
          className="space-y-10 max-w-[680px]"
        >

          {/* Sections */}
          {step === 1 && (
            <PersonalInfo form={form} />
          )}

          {step === 2 && (
            <AcademicInfo form={form} />
          )}

          {step === 3 && (
            <AdditionalInfo form={form} />
          )}

          {step === 4 && (
            <AvatarSelection
              avatars={avatars}
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
            />
          )}
          {/* Submit */}
          <div className="flex w-full gap-4">

            {/* Previous */}
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="
      flex-1
      rounded-2xl
      border border-[#D4AF37]/30
      bg-white
      px-8 py-4
      font-semibold
      text-[#5D4037]
    "
              >
                Previous
              </button>
            )}

            {/* Next */}
            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="
      flex-1
      rounded-2xl
      bg-gradient-to-r
      from-[#D4AF37]
      to-[#B8860B]
      px-8 py-4
      font-semibold
      text-[#2D2926]
    "
              >
                Next
              </button>
            )}

            {/* Create Account */}
            {/* <button
              type="submit"
              disabled={loading}
              className="
      flex-1
      rounded-2xl
      border border-[#D4AF37]/60
      bg-gradient-to-r from-[#D4AF37] to-[#B8860B]
      px-8 py-4
      font-semibold
      text-[#2D2926]
      transition-all
      hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button> */}

            {step === 4 && (
              <button
                type="submit"
                disabled={loading}
                className="
      flex-1
      rounded-2xl
      bg-gradient-to-r
      from-[#D4AF37]
      to-[#B8860B]
      px-8 py-4
      font-semibold
      text-[#2D2926]
    "
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            )}

          </div>
        </form>

      </div>

    </main>
  );
}