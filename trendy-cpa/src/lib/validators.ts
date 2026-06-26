import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  gender: z.enum(["Male", "Female", "Other"]),
  college: z.string().min(2, "College / University is required"),
  branch: z.string().min(2, "Branch is required"),
  year: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]),
  linkedin: z.string().url("Enter a valid LinkedIn URL").optional().or(z.literal(""))
});

export const locationInfoSchema = z.object({
  pincode: z.string().min(5, "Pincode is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  referralCode: z.string().optional().or(z.literal(""))
});

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters")
});
