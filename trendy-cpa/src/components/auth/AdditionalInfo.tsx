"use client";

import SectionCard from "./SectionCard";

export default function AdditionalInfo({ form }: { form: any }) {

  const { register } = form;

  return (
    <SectionCard title="Additional Information">

      <div className="space-y-6">

        <div>
          <label className="cyber-label">
            LinkedIn URL (optional)
          </label>

          <input
            {...register("linkedin")}
            className="cyber-input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="cyber-label">
            Why do you want to become a Campus Ambassador?
          </label>

          <textarea
            rows={6}
            {...register("motivation", {
              required: "This field is required",
            })}
            className="cyber-input min-h-[180px] py-4"
          />
        </div>

        <div>
          <label className="cyber-label">
            Referral Code (optional)
          </label>

          <input
            {...register("referral")}
            className="cyber-input"
          />
        </div>

      </div>

    </SectionCard>
  );
}