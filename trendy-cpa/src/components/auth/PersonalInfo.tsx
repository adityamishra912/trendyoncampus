"use client";

import SectionCard from "./SectionCard";

export default function PersonalInfo({ form }: { form: any }) {
    const { register } = form;

    return (
        <SectionCard title="Personal Information">

            <div className="grid gap-6 md:grid-cols-2">

                <div>
                    <label className="cyber-label">Full Name</label>
                    <input
                        {...form.register("name", {
                            required: "Full name is required",
                        })}
                        className="cyber-input"
                        placeholder="John Doe"
                    />
                    {form.formState.errors.fullName && (
                        <p className="mt-2 text-sm text-red-400">
                            {String(form.formState.errors.fullName.message)}
                        </p>
                    )}
                </div>

                <div>
                    <label className="cyber-label">Email</label>
                    <input
                        disabled
                        {...form.register("email")}
                        className="
    cyber-input
    cyber-disabled
  "
                    />
                </div>

                <div>
                    <label className="cyber-label">Phone</label>
                    <input
                        {...register("phone", {
                            required: "This field is required",
                        })}
                        className="cyber-input"
                        placeholder="9292XXXX"
                    />
                </div>

                <div>
                    <label className="cyber-label">Gender</label>

                    <select
                        {...register("gender", {
                            required: "This field is required",
                        })}
                        className="cyber-select-native"
                    >
                        <option disabled value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

            </div>

        </SectionCard>
    );
}