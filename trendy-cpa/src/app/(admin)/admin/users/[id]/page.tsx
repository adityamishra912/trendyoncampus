'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import {
    ArrowLeft,
    Award,
    BookOpen,
    Building2,
    Calendar,
    Mail,
    MapPin,
    Phone,
    User,
    Users,
    Briefcase,
    Globe,
    Trophy,
} from 'lucide-react'

type UserType = {
    id: string
    uid: string
    fullName: string
    email: string
    phone: string
    gender: string
    college: string
    city: string
    district: string
    state: string
    pincode: string
    year: string
    yearOfStudy: number
    points: number
    referrals: number
    tasksDone: number
    referralCode: string
    referredBy?: string | null
    linkedin?: string
    linkedinUrl?: string
    motivation?: string
    profilePicture?: string
    createdAt?: any
    userId?: string
}

export default function UserDetailsPage() {
    const params = useParams()
    const router = useRouter()

    const [user, setUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState(true)

    const userId = params.id as string

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)

                const ref = doc(db, 'users', userId)

                const snapshot = await getDoc(ref)

                if (!snapshot.exists()) {
                    setUser(null)
                    return
                }

                const userData = snapshot.data() as UserType

                setUser({
                    ...userData,
                    id: snapshot.id,
                })
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchUser()
        }
    }, [userId])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">
                        Loading user...
                    </p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-5">
                <h1 className="text-4xl font-bold text-white">
                    User Not Found
                </h1>

                <button
                    onClick={() => router.back()}
                    className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-500
            transition-colors
            text-white
          "
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 text-white p-10 lg:p-20">
            {/* Header */}
            <div
                className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-6
          shadow-xl
        "
            >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Profile */}
                    <div className="relative">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.fullName}
                                className="
                  w-36
                  h-36
                  rounded-full
                  object-cover
                  border-4
                  border-cyan-500/30
                "
                            />
                        ) : (
                            <div
                                className="
                  w-36
                  h-36
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-500
                  to-indigo-600
                  flex
                  items-center
                  justify-center
                  text-2xl md:text-3xl md:text-5xl
                  font-bold
                "
                            >
                                {user.fullName?.[0]}
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">
                            {user.fullName}
                        </h1>

                        <div className="flex items-center gap-2 mt-3 text-slate-400">
                            <Mail size={16} />
                            {user.email}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <Badge
                                icon={<Trophy size={16} />}
                                text={`${user.points} Points`}
                            />

                            <Badge
                                icon={<Award size={16} />}
                                text={`${user.tasksDone} Tasks`}
                            />

                            <Badge
                                icon={<Users size={16} />}
                                text={`${user.referrals} Referrals`}
                            />

                            <Badge
                                icon={<User size={16} />}
                                text={user.userId || 'N/A'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card title="Personal Information">
                    <Info icon={<User size={16} />} label="Full Name" value={user.fullName} />
                    <Info icon={<Mail size={16} />} label="Email" value={user.email} />
                    <Info icon={<Phone size={16} />} label="Phone" value={user.phone} />
                    <Info icon={<User size={16} />} label="Gender" value={user.gender} />
                    <Info icon={<Award size={16} />} label="Referral Code" value={user.referralCode} />
                    <Info icon={<Users size={16} />} label="Referred By" value={user.referredBy || 'N/A'} />
                </Card>

                <Card title="Academic Information">
                    <Info icon={<Building2 size={16} />} label="College" value={user.college} />
                    <Info icon={<BookOpen size={16} />} label="Year" value={user.year} />
                    <Info icon={<BookOpen size={16} />} label="Year Of Study" value={String(user.yearOfStudy)} />
                    <Info icon={<MapPin size={16} />} label="City" value={user.city} />
                    <Info icon={<MapPin size={16} />} label="District" value={user.district} />
                    <Info icon={<MapPin size={16} />} label="State" value={user.state} />
                    <Info icon={<MapPin size={16} />} label="Pincode" value={user.pincode} />
                </Card>

                <Card title="Social & Activity">
                    <Info icon={<Briefcase size={16} />} label="LinkedIn Username" value={user.linkedin || 'N/A'} />
                    <Info icon={<Globe size={16} />} label="LinkedIn URL" value={user.linkedinUrl || 'N/A'} />
                    <Info icon={<Trophy size={16} />} label="Points" value={String(user.points)} />
                    <Info icon={<Users size={16} />} label="Referrals" value={String(user.referrals)} />
                    <Info icon={<Award size={16} />} label="Tasks Done" value={String(user.tasksDone)} />
                    <Info
                        icon={<Calendar size={16} />}
                        label="Joined On"
                        value={
                            user.createdAt?.toDate
                                ? user.createdAt.toDate().toLocaleString()
                                : 'N/A'
                        }
                    />
                </Card>

                <Card title="Motivation">
                    <p className="text-slate-300 leading-8 whitespace-pre-wrap">
                        {user.motivation || 'No motivation submitted'}
                    </p>
                </Card>
            </div>
        </div>
    )
}

function Card({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div
            className="
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-6
        shadow-xl
      "
        >
            <h2 className="text-2xl font-bold mb-6">
                {title}
            </h2>

            <div className="space-y-5">
                {children}
            </div>
        </div>
    )
}

function Info({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value?: string
}) {
    return (
        <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
                {icon}
                {label}
            </div>

            <p className="text-white font-medium mt-2 break-all">
                {value || 'N/A'}
            </p>
        </div>
    )
}

function Badge({
    icon,
    text,
}: {
    icon: React.ReactNode
    text: string
}) {
    return (
        <div
            className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        bg-slate-800
        border
        border-slate-700
        text-slate-200
      "
        >
            {icon}
            <span className="text-sm font-medium">
                {text}
            </span>
        </div>
    )
}