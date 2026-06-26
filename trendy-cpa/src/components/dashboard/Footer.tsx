import Link from "next/link";
import { Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-r from-[#D4AF37] to-[#B8860B] border-t border-[#D6C8A4]">
            {/* Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C99A14]/70 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl md:text-3xl md:text-5xl font-black text-black mb-4">
                            TRENDY
                        </h2>

                        <p className="max-w-md text-[#4B4B4B] leading-relaxed">
                            Empowering students to become leaders, creators, and
                            changemakers through the TRENDY Campus Ambassador Program.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#C99A14] hover:text-white transition-all"
                            >
                                <Instagram size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#C99A14] hover:text-white transition-all"
                            >
                                <Linkedin size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#C99A14] hover:text-white transition-all"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-5 text-black">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/"
                                className="text-[#555] hover:text-black transition-colors"
                            >
                                Home
                            </Link>

                            <Link
                                href="/about"
                                className="text-[#555] hover:text-black transition-colors"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/trendyfest"
                                className="text-[#555] hover:text-black transition-colors"
                            >
                                TrendyFest
                            </Link>

                            <Link
                                href="/faq"
                                className="text-[#555] hover:text-black transition-colors"
                            >
                                FAQ
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-5 text-black">
                            Contact
                        </h3>

                        <div className="space-y-4 text-[#555]">
                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                <span>hello@trendy.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} />
                                <span>+91 XXXXX XXXXX</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-[#D6C8A4] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[#666]">
                        © 2026 TRENDY. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm">
                        <Link
                            href="/privacy"
                            className="text-[#666] hover:text-[#C99A14]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-[#666] hover:text-[#C99A14]"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}