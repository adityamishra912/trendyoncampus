"use client";

import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    getDoc,
    query,
    updateDoc,
    where,
    doc,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { auth, db } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    User2,
    Linkedin,
    BookOpen,
    Camera,
} from "lucide-react";

const EditProfilePage = () => {

    const [loading, setLoading] = useState(true);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [saving, setSaving] = useState(false);

    const [docId, setDocId] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        profilePicture: "",

        college: "",
        degree: "",
        branch: "",
        year: "",

        pincode: "",
        state: "",
        district: "",

        linkedin: "",
    });

    // Fetch details
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(
            async (user: User | null) => {

                try {

                    if (!user) {
                        setLoading(false);
                        return;
                    }

                    const q = query(
                        collection(db, "users"),
                        where("uid", "==", user.uid)
                    );

                    const snapshot = await getDocs(q);

                    if (!snapshot.empty) {

                        const userDoc = snapshot.docs[0];

                        setDocId(userDoc.id);

                        const data = userDoc.data();

                        setFormData({
                            fullName: data.fullName || "",
                            email: data.email || "",
                            phone: data.phone || "",
                            gender: data.gender || "",
                            profilePicture: data.profilePicture || "",

                            college: data.college || "",
                            degree: data.degree || "",
                            branch: data.branch || "",

                            year: data.yearOfStudy?.toString() || "",

                            pincode: data.pincode || "",
                            state: data.state || "",

                            district: data.city || "",

                            linkedin: data.linkedinUrl || "",
                        });

                    }

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }

            }
        );

        return () => unsubscribe();

    }, []);

    // Handle change
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // Save changes
    const handleSave = async () => {

        try {

            setSaving(true);

            await updateDoc(
                doc(db, "users", docId),
                {
                    ...formData,
                }
            );

            toast.success("Changes saved");

        } catch (error) {

            console.error(error);

        } finally {

            setSaving(false);

        }

    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        try {

            const file = e.target.files?.[0];

            if (!file) return;

            setUploadingImage(true);

            const formData = new FormData();

            formData.append("file", file);

            formData.append(
                "upload_preset",
                process.env
                    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env
                    .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                }/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            const imageUrl = data.secure_url;

            setFormData((prev) => ({
                ...prev,
                profilePicture: imageUrl,
            }));

            await updateDoc(
                doc(db, "users", docId),
                {
                    profilePicture: imageUrl,
                }
            );

            toast.success("Profile picture updated");

        } catch (error) {

            console.error(error);

            toast.error("Failed to upload image");

        } finally {

            setUploadingImage(false);

        }

    };

    const inputClass = `
    mt-3
    w-full
    rounded-2xl
    border
    border-[#E6D28A]
    bg-[#FFFBEF]
    px-5
    py-4
    
    outline-none
    transition-all
    duration-300
    text-[#2F2A28]

    placeholder:text-[#A8946B]

    focus:border-[#D4A514]
    focus:ring-4
    focus:ring-[#F7E8B2]
`;

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-[#F8F4E8] text-[#2D2926]">
                Loading...
            </div>

        );

    }

    return (

        <main
            className="
                min-h-screen
                bg-[#F8F4E8]
                px-4
                py-8
                lg:px-10
            "
        >

            <div className="mx-auto max-w-5xl">

                {/* HEADING */}
                <div className="mb-10">

                    <p className="text-[#D4A514] tracking-[0.4em] uppercase text-sm font-semibold"
                    >
                        Control Center
                    </p>

                    <h1 className="text-[#2F2A28] text-7xl font-bold mt-4">
                        Edit Profile
                    </h1>

                    <p className="text-[#7A6A50] text-lg mt-4">
                        Update your ambassador profile information,
                        academic details, and social presence.
                    </p>

                </div>

                {/* FORM CARD */}
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[2.5rem]
                        bg-[#F5EFCF]
                        border border-[#E6D28A]
                        shadow-[0_8px_24px_rgba(180,150,70,0.08)]
                        p-6
                    "
                >

                    {/* GLOW */}
                    {/* <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_40%)]
                        "
                    /> */}

                    <div className="relative z-10 space-y-12">

                        {/* PERSONAL INFO */}
                        <section>

                            <div className="flex items-center gap-3">

                                <User2 className="text-[#D4A514]" />

                                <h2 className="text-2xl font-semibold text-[#2F2A28]">
                                    Personal Information
                                </h2>

                            </div>

                            <div className="flex flex-col lg:flex-row justify-around">

                                {/* PROFILE PICTURE */}
                                <div className="mt-10 mb-4">
                                    <div className="flex justify-center">

                                        <div className="relative">

                                            {/* IMAGE */}
                                            <div
                                                className="
                relative
                flex
                h-36
                w-36
                items-center
                justify-center
                overflow-hidden
                rounded-full

                border
                border-cyan-400/20

                bg-cyan-400/10

                text-2xl md:text-3xl md:text-5xl
                font-semibold
                text-white

                shadow-[0_0_40px_rgba(34,211,238,0.12)]
            "
                                            >

                                                {formData.profilePicture ? (

                                                    <img
                                                        src={formData.profilePicture}
                                                        alt="Profile"
                                                        className="
                        h-full
                        w-full
                        object-cover
                    "
                                                    />

                                                ) : (

                                                    <span>
                                                        {formData.fullName?.charAt(0) || "A"}
                                                    </span>

                                                )}

                                            </div>

                                            {/* UPLOAD BUTTON */}
                                            <label
                                                className="
                absolute
                bottom-1
                right-1

                flex
                h-12
                w-12
                cursor-pointer
                items-center
                justify-center

                rounded-full

                border
                border-cyan-400/20

                bg-gradient-to-br
                from-[#D9A520]
                to-[#B8860B]

                text-white
                shadow-[0_0_25px_rgba(34,211,238,0.15)]

                transition-all
                duration-300

                hover:scale-105
                hover:bg-cyan-400/10
            "
                                            >

                                                <Camera size={20} />

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />

                                            </label>

                                        </div>

                                    </div>
                                </div>

                                {/* Details */}
                                <div className="mt-8 grid gap-6 md:grid-cols-2">

                                    <div>

                                        <label className="text-[#6D4C41]">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={inputClass}
                                        />

                                    </div>

                                    <div>

                                        <label className="text-[#6D4C41]">
                                            Email
                                        </label>

                                        <div className="relative">

                                            <Mail
                                                size={18}
                                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="example@gmail.com"
                                                className={`${inputClass} pl-14`}
                                            />

                                        </div>

                                    </div>

                                    <div>

                                        <label className="text-[#6D4C41]">
                                            Phone
                                        </label>

                                        <div className="relative">

                                            <Phone
                                                size={18}
                                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                                            />

                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                className={`${inputClass} pl-14`}
                                            />

                                        </div>

                                    </div>

                                    <div>

                                        <label className="text-[#6D4C41]">
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>

                                            <option value="male">
                                                Male
                                            </option>

                                            <option value="female">
                                                Female
                                            </option>

                                            <option value="other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>



                        </section>

                        {/* ACADEMIC */}
                        <section>

                            <div className="flex items-center gap-3">

                                <GraduationCap className="text-[#D4A514]" />

                                <h2 className="text-2xl font-semibold text-[#2F2A28]">
                                    Academic Information
                                </h2>

                            </div>

                            <div className="mt-8 grid gap-6 md:grid-cols-2">

                                <div>

                                    <label className="text-[#6D4C41]">
                                        College
                                    </label>

                                    <input
                                        type="text"
                                        name="college"
                                        value={formData.college}
                                        onChange={handleChange}
                                        placeholder="Select College"
                                        className={inputClass}
                                    />

                                </div>

                                {/* <div>

                                    <label className="text-slate-300">
                                        Degree
                                    </label>

                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        placeholder="Select Degree"
                                        className={inputClass}
                                    />

                                </div> */}

                                {/* <div>

<label className="text-[#6D4C41]">
                                        Branch
                                    </label>

                                    <input
                                        type="text"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        placeholder="Select Branch"
                                        className={inputClass}
                                    />

                                </div> */}

                                <div>

                                    <label className="text-slate-300">
                                        Year of Study
                                    </label>

                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option disabled value="">
                                            Select Year
                                        </option>

                                        <option value="1">
                                            1st Year
                                        </option>

                                        <option value="2">
                                            2nd Year
                                        </option>

                                        <option value="3">
                                            3rd Year
                                        </option>

                                        <option value="4">
                                            4th Year
                                        </option>

                                    </select>

                                </div>

                                <div>

                                    <label className="text-slate-300">
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Enter pincode"
                                        className={inputClass}
                                    />

                                </div>

                                <div>

                                    <label className="text-slate-300">
                                        State / UT
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Select State"
                                        className={inputClass}
                                    />

                                </div>

                                <div>

                                    <label className="text-slate-300">
                                        District / City
                                    </label>

                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        placeholder="Select District"
                                        className={inputClass}
                                    />

                                </div>

                            </div>

                        </section>

                        {/* ADDITIONAL */}
                        <section>

                            <div className="flex items-center gap-3">

                                <BookOpen className="text-[#D4A514]" />

                                <h2 className="text-2xl font-semibold text-[#2F2A28]">
                                    Additional Information
                                </h2>

                            </div>

                            <div className="mt-8">

                                <label className="text-slate-300">
                                    LinkedIn URL
                                </label>

                                <div className="relative">

                                    <Linkedin
                                        size={18}
                                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/username"
                                        className={`${inputClass} pl-14`}
                                    />

                                </div>

                            </div>

                        </section>

                        {/* ACTIONS */}
                        <div className="flex flex-col gap-4 pt-4 sm:flex-row">

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="
                                    rounded-2xl
                                    border
                                    border-cyan-300/20
                                    bg-gradient-to-r
                                    from-[#D9A520]
                                    to-[#B8860B]

                                    px-8
                                    py-4
                                    font-medium
                                    text-white
                                    transition-all
                                    duration-300

                                    hover:scale-[1.02]
                                    hover:shadow-[0_12px_24px_rgba(212,165,20,0.25)]    
                                "
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            {/* <button
                                className="
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    px-8
                                    py-4
                                    font-medium
                                    text-white
                                    transition-all
                                    duration-300

                                    hover:bg-white/[0.06]
                                "
                            >
                                Cancel
                            </button> */}

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

};

export default EditProfilePage;