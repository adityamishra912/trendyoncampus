"use client";

import SectionCard from "./SectionCard";

interface Props {
    avatars: string[];
    selectedAvatar: string;
    setSelectedAvatar: (avatar: string) => void;
}

export default function AvatarSelection({
    avatars,
    selectedAvatar,
    setSelectedAvatar,
}: Props) {
    return (
        <SectionCard title="Choose Your Avatar">

            <div className="m-10 grid md:grid-cols-1 sm:grid-cols-3 gap-5 grid-cols-2">

                {avatars.map((avatar) => (

                    <button
                        key={avatar}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`
              group
              relative
              overflow-hidden

              rounded-full

              border-2

              bg-gradient-to-br
              from-white
              to-[#FFF8EC]


              transition-all
              duration-300

              ${selectedAvatar === avatar
                                ? `
                    border-[#D4AF37]
                    shadow-[0_0_30px_rgba(212,175,55,0.25)]
                    scale-105
                  `
                                : `
                    border-[#D4AF37]/10
                    hover:border-[#D4AF37]/40
                    hover:scale-[1.03]
                  `
                            }
            `}
                    >
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="
                w-full
                rounded-xl
                object-cover
              "
                        />

                    </button>

                ))}

            </div>

        </SectionCard>
    );
}