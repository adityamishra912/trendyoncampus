"use client";

import { useState } from "react";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
    Bell,
    Send,
} from "lucide-react";

export default function NotificationsPage() {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("general");
    const [loading, setLoading] = useState(false);

    const sendNotification = async () => {

        if (!title || !message) {
            alert("Fill all fields");
            return;
        }

        try {

            setLoading(true);

            await addDoc(
                collection(db, "notifications"),
                {
                    title,
                    message,
                    type,
                    createdAt: serverTimestamp(),
                    createdBy: "admin",
                }
            );

            setTitle("");
            setMessage("");
            setType("general");

            alert("Notification sent");

        } catch (error) {

            console.error(error);
            alert("Failed");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="p-6">

            <div
                className="
                    mx-auto
                    max-w-3xl
                    rounded-3xl
                    border border-[#E6D28A]
                    bg-white/80
                    p-6
                    shadow-xl
                "
            >

                <div className="mb-8 flex items-center gap-4">

                    <div
                        className="
                            flex h-14 w-14
                            items-center justify-center
                            rounded-2xl
                            bg-[#F7E8B2]
                        "
                    >
                        <Bell
                            className="text-[#B8860B]"
                        />
                    </div>

                    <div>
                        <h1
                            className="
                                text-2xl md:text-3xl
                                font-bold
                                text-[#2F2A28]
                            "
                        >
                            Send Notification
                        </h1>

                        <p
                            className="
                                text-sm
                                text-[#8B6B2D]
                            "
                        >
                            Broadcast updates to all ambassadors
                        </p>
                    </div>

                </div>

                <div className="space-y-6">

                    <div>

                        <label
                            className="
                                mb-2 block
                                font-medium
                            "
                        >
                            Title
                        </label>

                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-[#E6D28A]
                                px-4 py-3
                                outline-none
                            "
                            placeholder="Notification title"
                        />

                    </div>

                    <div>

                        <label
                            className="
                                mb-2 block
                                font-medium
                            "
                        >
                            Type
                        </label>

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-[#E6D28A]
                                px-4 py-3
                            "
                        >
                            <option value="general">
                                General
                            </option>

                            <option value="task">
                                Task
                            </option>

                            <option value="reward">
                                Reward
                            </option>

                            <option value="announcement">
                                Announcement
                            </option>

                        </select>

                    </div>

                    <div>

                        <label
                            className="
                                mb-2 block
                                font-medium
                            "
                        >
                            Message
                        </label>

                        <textarea
                            rows={6}
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-[#E6D28A]
                                px-4 py-3
                                outline-none
                                resize-none
                            "
                            placeholder="Notification message"
                        />

                    </div>

                    <button
                        onClick={sendNotification}
                        disabled={loading}
                        className="
                            flex items-center gap-2
                            rounded-2xl
                            bg-gradient-to-r
                            from-[#D9A520]
                            to-[#B8860B]
                            px-6 py-3
                            font-semibold
                            text-white
                        "
                    >
                        <Send size={18} />

                        {loading
                            ? "Sending..."
                            : "Send Notification"}
                    </button>

                </div>

            </div>

        </div>

    );
}