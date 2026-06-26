"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function BasicInfoForm({ onNext }: { onNext: () => void }) {
  const { email, profileDraft, updateDraft } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof personalInfoSchema>>({ resolver: zodResolver(personalInfoSchema), defaultValues: { email, ...profileDraft } });

  useEffect(() => {
    reset({ email, ...profileDraft });
  }, [email, profileDraft, reset]);

  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    updateDraft(values as Record<string, unknown>);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-3xl border border-[#E6D28A] bg-gradient-to-br from-white/30 to-[#FAF4D3]/50 p-6 shadow-panel">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>Full Name</span>
          <input type="text" {...register("fullName")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]" />
          {errors.fullName && <p className="text-xs text-rose-400">{errors.fullName.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>Email</span>
          <input type="email" readOnly {...register("email")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#6D4C41] outline-none" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>Phone Number</span>
          <input type="tel" {...register("phone")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]" />
          {errors.phone && <p className="text-xs text-rose-400">{errors.phone.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>Gender</span>
          <select {...register("gender")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-xs text-rose-400">{errors.gender.message}</p>}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>College / University</span>
          <input type="text" {...register("college")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]" />
          {errors.college && <p className="text-xs text-rose-400">{errors.college.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>Branch</span>
          <input type="text" {...register("branch")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]" />
          {errors.branch && <p className="text-xs text-rose-400">{errors.branch.message}</p>}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>Year of Study</span>
          <select {...register("year")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]">
            <option value="">Select year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="5th Year">5th Year</option>
          </select>
          {errors.year && <p className="text-xs text-rose-400">{errors.year.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-[#6D4C41]">
          <span>LinkedIn URL</span>
          <input type="url" {...register("linkedin")} className="w-full rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-4 py-3 text-[#2D2926] outline-none transition focus:border-[#D4AF37]" placeholder="https://linkedin.com/in/yourname" />
          {errors.linkedin && <p className="text-xs text-rose-400">{errors.linkedin.message}</p>}
        </label>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
