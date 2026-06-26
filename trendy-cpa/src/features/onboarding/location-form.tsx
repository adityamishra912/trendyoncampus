"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationInfoSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function LocationForm({ onSubmit }: { onSubmit: () => void }) {
  const { profileDraft, updateDraft } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<z.infer<typeof locationInfoSchema>>({ resolver: zodResolver(locationInfoSchema), defaultValues: profileDraft });

  useEffect(() => {
    reset(profileDraft);
  }, [profileDraft, reset]);

  const pincode = watch("pincode");

  useEffect(() => {
    if (pincode && pincode.length === 6) {
      const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const postOffice = data?.[0]?.PostOffice?.[0];
          if (postOffice) {
            reset({ ...watch(), city: postOffice.District || "", state: postOffice.State || "", referralCode: watch("referralCode") });
          }
        })
        .catch(() => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pincode]);

  const handleForm = (values: z.infer<typeof locationInfoSchema>) => {
    updateDraft(values as Record<string, unknown>);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className="grid gap-4 rounded-3xl border border-slate-700/50 bg-cyber-950/80 p-6 shadow-panel">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Pincode</span>
          <input type="text" {...register("pincode")} className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
          {errors.pincode && <p className="text-xs text-rose-400">{errors.pincode.message ?? String(errors.pincode)}</p>} 
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span>City</span>
          <input type="text" {...register("city")} className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
          {errors.city && <p className="text-xs text-rose-400">{errors.city.message ?? String(errors.city)}</p>} 
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>State</span>
          <input type="text" {...register("state")} className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
          {errors.state && <p className="text-xs text-rose-400">{errors.state.message ?? String(errors.state)}</p>} 
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span>Referral Code (optional)</span>
          <input type="text" {...register("referralCode")} className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
        </label>
      </div>
      <div className="flex justify-between text-sm text-slate-400"> 
        <p>Referral code will be validated after submission.</p>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Complete registration</Button>
      </div>
    </form>
  );
}
