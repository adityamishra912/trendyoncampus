'use client'

import { useEffect, useState } from 'react'
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

import {
    Shield,
    UserPlus,
    X,
    Mail,
    User,
    Briefcase,
    Users,
} from 'lucide-react'

type TeamMember = {
    id: string
    name: string
    email: string
    role: 'admin' | 'manager'
    domain?: string
    createdAt?: any
}

const domains = [
    'Creativity',
    'Web Development',
    'Event Management',
    'Marketing',
    'Social Outreach',
    'Media & Publicity',
]

export default function RBACPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState<'admin' | 'manager'>('manager')
    const [domain, setDomain] = useState(domains[0])

    const [submitting, setSubmitting] = useState(false)

    // =========================
    // FETCH TEAM MEMBERS
    // =========================
    const fetchMembers = async () => {
        try {
            setLoading(true)

            const q = query(
                collection(db, 'team'),
                orderBy('createdAt', 'desc')
            )

            const snapshot = await getDocs(q)

            const data = snapshot.docs.map((doc) => {
                const memberData = doc.data() as TeamMember

                return {
                    ...memberData,
                    id: doc.id,
                }
            })

            setMembers(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    // =========================
    // ADD MEMBER
    // =========================
    const handleAddMember = async () => {
        try {
            if (!name || !email || !role) {
                return alert('Please fill all fields')
            }

            setSubmitting(true)

            await addDoc(collection(db, 'team'), {
                name,
                email,
                role,
                domain: role === 'manager' ? domain : null,
                createdAt: serverTimestamp(),
            })

            setName('')
            setEmail('')
            setRole('manager')
            setDomain(domains[0])

            setOpen(false)

            fetchMembers()
        } catch (err) {
            console.error(err)
            alert('Failed to add member')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6 text-white p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold">
                        RBAC Management
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage admins and managers
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
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
            font-medium
          "
                >
                    <UserPlus size={18} />
                    Add Member
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-3 gap-5">
                <StatCard
                    title="Total Members"
                    value={members.length}
                    icon={<Users size={24} />}
                />

                <StatCard
                    title="Admins"
                    value={
                        members.filter((m) => m.role === 'admin').length
                    }
                    icon={<Shield size={24} />}
                />

                <StatCard
                    title="Managers"
                    value={
                        members.filter((m) => m.role === 'manager').length
                    }
                    icon={<Briefcase size={24} />}
                />
            </div>

            {/* Members Table */}
            <div
                className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          overflow-hidden
        "
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950">
                            <tr>
                                <th className="px-6 py-5 text-left text-slate-300 text-sm">
                                    Name
                                </th>

                                <th className="px-6 py-5 text-left text-slate-300 text-sm">
                                    Email
                                </th>

                                <th className="px-6 py-5 text-left text-slate-300 text-sm">
                                    Role
                                </th>

                                <th className="px-6 py-5 text-left text-slate-300 text-sm">
                                    Domain
                                </th>

                                <th className="px-6 py-5 text-left text-slate-300 text-sm">
                                    Joined
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-slate-400"
                                    >
                                        Loading members...
                                    </td>
                                </tr>
                            ) : members.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-slate-500"
                                    >
                                        No team members found
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="
                      border-t
                      border-slate-800
                      hover:bg-slate-800/40
                      transition-colors
                    "
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="
                            w-11
                            h-11
                            rounded-full
                            bg-gradient-to-br
                            from-cyan-500
                            to-indigo-600
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                          "
                                                >
                                                    {member.name?.[0]}
                                                </div>

                                                <div>
                                                    <p className="font-medium text-white">
                                                        {member.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-slate-400">
                                            {member.email}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span
                                                className={`
                          px-3
                          py-1.5
                          rounded-lg
                          text-sm
                          font-medium
                          ${member.role === 'admin'
                                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                                    }
                        `}
                                            >
                                                {member.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 text-slate-300">
                                            {member.domain || '-'}
                                        </td>

                                        <td className="px-6 py-5 text-slate-500">
                                            {member.createdAt?.toDate
                                                ? member.createdAt
                                                    .toDate()
                                                    .toLocaleDateString()
                                                : '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div
                    className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-4
          "
                >
                    <div
                        className="
              w-full
              max-w-lg
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-7
              shadow-2xl
            "
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-7">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Add Team Member
                                </h2>

                                <p className="text-slate-400 mt-1">
                                    Create new admin or manager
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-slate-800
                  hover:bg-slate-700
                  flex
                  items-center
                  justify-center
                  transition-colors
                "
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">
                            {/* Name */}
                            <InputWrapper icon={<User size={18} />}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-slate-500
                  "
                                />
                            </InputWrapper>

                            {/* Email */}
                            <InputWrapper icon={<Mail size={18} />}>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-slate-500
                  "
                                />
                            </InputWrapper>

                            {/* Role */}
                            <InputWrapper icon={<Shield size={18} />}>
                                <select
                                    value={role}
                                    onChange={(e) =>
                                        setRole(
                                            e.target.value as
                                            | 'admin'
                                            | 'manager'
                                        )
                                    }
                                    className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                  "
                                >
                                    <option
                                        value="admin"
                                        className="bg-slate-900"
                                    >
                                        Admin
                                    </option>

                                    <option
                                        value="manager"
                                        className="bg-slate-900"
                                    >
                                        Manager
                                    </option>
                                </select>
                            </InputWrapper>

                            {/* Domain */}
                            {role === 'manager' && (
                                <InputWrapper
                                    icon={<Briefcase size={18} />}
                                >
                                    <select
                                        value={domain}
                                        onChange={(e) =>
                                            setDomain(e.target.value)
                                        }
                                        className="
                      w-full
                      bg-transparent
                      outline-none
                      text-white
                    "
                                    >
                                        {domains.map((d) => (
                                            <option
                                                key={d}
                                                value={d}
                                                className="bg-slate-900"
                                            >
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </InputWrapper>
                            )}

                            {/* Submit */}
                            <button
                                onClick={handleAddMember}
                                disabled={submitting}
                                className="
                  w-full
                  mt-2
                  py-3.5
                  rounded-xl
                  bg-cyan-600
                  hover:bg-cyan-500
                  transition-colors
                  font-semibold
                  disabled:opacity-50
                "
                            >
                                {submitting
                                    ? 'Adding Member...'
                                    : 'Add Member'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function StatCard({
    title,
    value,
    icon,
}: {
    title: string
    value: number
    icon: React.ReactNode
}) {
    return (
        <div
            className="
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-6
      "
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {value}
                    </h2>
                </div>

                <div
                    className="
            w-14
            h-14
            rounded-2xl
            bg-cyan-500/10
            text-cyan-400
            flex
            items-center
            justify-center
          "
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

function InputWrapper({
    children,
    icon,
}: {
    children: React.ReactNode
    icon: React.ReactNode
}) {
    return (
        <div
            className="
        flex
        items-center
        gap-3
        px-4
        py-3.5
        rounded-2xl
        border
        border-slate-800
        bg-slate-950
      "
        >
            <div className="text-slate-500">
                {icon}
            </div>

            {children}
        </div>
    )
}