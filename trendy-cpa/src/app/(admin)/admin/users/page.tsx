'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    collection,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

type UserType = {
    id: string
    uid: string
    fullName: string
    email: string
    college: string
    points: number
    createdAt: any
    profilePicture?: string
    userId?: string
}

export default function AdminUsers() {
    const router = useRouter()

    const [users, setUsers] = useState<UserType[]>([])
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)

    const [totalUsers, setTotalUsers] = useState(0)

    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('date_desc')

    const [lastDoc, setLastDoc] = useState<any>(null)
    const [loadingMore, setLoadingMore] = useState(false)

    // =========================
    // FETCH TOTAL USERS COUNT
    // =========================
    const fetchCount = async () => {
        const coll = collection(db, 'users')
        const snapshot = await getCountFromServer(coll)
        setTotalUsers(snapshot.data().count)
    }

    // =========================
    // INITIAL FETCH
    // =========================
    const fetchUsers = async () => {
        try {
            setLoading(true)

            let q: any

            switch (sortBy) {
                case 'points_desc':
                    q = query(
                        collection(db, 'users'),
                        orderBy('points', 'desc'),
                        limit(10)
                    )
                    break

                case 'date_asc':
                    q = query(
                        collection(db, 'users'),
                        orderBy('createdAt', 'asc'),
                        limit(10)
                    )
                    break

                default:
                    q = query(
                        collection(db, 'users'),
                        orderBy('createdAt', 'desc'),
                        limit(10)
                    )
            }

            const snapshot = await getDocs(q)

            const data = snapshot.docs.map((doc) => {
                const userData = doc.data() as UserType

                return {
                    ...userData,
                    id: doc.id,
                }
            })

            setUsers(data)
            setFilteredUsers(data)

            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // =========================
    // LOAD MORE
    // =========================
    const loadMore = async () => {
        if (!lastDoc) return

        try {
            setLoadingMore(true)

            let q: any

            switch (sortBy) {
                case 'points_desc':
                    q = query(
                        collection(db, 'users'),
                        orderBy('points', 'desc'),
                        startAfter(lastDoc),
                        limit(10)
                    )
                    break

                case 'date_asc':
                    q = query(
                        collection(db, 'users'),
                        orderBy('createdAt', 'asc'),
                        startAfter(lastDoc),
                        limit(10)
                    )
                    break

                default:
                    q = query(
                        collection(db, 'users'),
                        orderBy('createdAt', 'desc'),
                        startAfter(lastDoc),
                        limit(10)
                    )
            }

            const snapshot = await getDocs(q)

            const newUsers = snapshot.docs.map((doc) => {
                const userData = doc.data() as UserType

                return {
                    ...userData,
                    id: doc.id,
                }
            })

            setUsers((prev) => [...prev, ...newUsers])

            setLastDoc(snapshot.docs[snapshot.docs.length - 1])
        } catch (err) {
            console.error(err)
        } finally {
            setLoadingMore(false)
        }
    }

    // =========================
    // SEARCH FILTER
    // =========================
    useEffect(() => {
        const value = search.toLowerCase()

        const filtered = users.filter((u) => {
            return (
                u.fullName?.toLowerCase().includes(value) ||
                u.email?.toLowerCase().includes(value) ||
                u.college?.toLowerCase().includes(value) ||
                u.uid?.toLowerCase().includes(value) ||
                u.userId?.toLowerCase().includes(value)
            )
        })

        setFilteredUsers(filtered)
    }, [search, users])

    // =========================
    // REFETCH WHEN SORT CHANGES
    // =========================
    useEffect(() => {
        fetchUsers()
    }, [sortBy])

    useEffect(() => {
        fetchCount()
    }, [])

    return (
        <div className="space-y-6 text-white m-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Users
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Total Registered Users: {totalUsers}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by name, email, college, UID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-950
            text-white
              px-4
              py-3
              outline-none
              focus:border-cyan-500
              placeholder:text-slate-500
            "
                    />

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-3
              outline-none
              focus:border-indigo-500
              bg-slate-950 text-white
            "
                    >
                        <option value="date_desc">
                            Date Joined (Newest First)
                        </option>

                        <option value="date_asc">
                            Date Joined (Oldest First)
                        </option>

                        <option value="points_desc">
                            Points (Highest First)
                        </option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    S.No
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    User
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    Email
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    College
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    Points
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    Date Joined
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-10 text-slate-500"
                                    >
                                        Loading users...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-10 text-slate-500"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u, index) => (
                                    <tr
                                        key={u.id}
                                        onClick={() => router.push(`/admin/users/${u.id}`)}
                                        className="
                      border-t
                      border-slate-800
                      hover:bg-slate-800/50
                      transition-colors
                      cursor-pointer
                    "
                                    >
                                        <td className="px-6 py-4 text-sm">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {u.profilePicture ? (
                                                    <img
                                                        src={u.profilePicture}
                                                        alt={u.fullName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                                                        {u.fullName?.[0]}
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="font-medium text-white">
                                                        {u.fullName}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {u.userId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-400">
                                            {u.email}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {u.college}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium">
                                            {u.points || 0}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {u.createdAt?.toDate
                                                ? u.createdAt
                                                    .toDate()
                                                    .toLocaleDateString()
                                                : '-'}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    router.push(`/admin/users/${u.id}`)
                                                }}
                                                className="
                          px-4
                          py-2
                          rounded-lg
                          bg-cyan-600
                          text-white
                          text-sm
                          hover:bg-cyan-500
                          transition-colors
                        "
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Load More */}
                {!loading && users.length < totalUsers && (
                    <div className="p-5 border-t border-slate-100 flex justify-center">
                        <button
                            onClick={loadMore}
                            disabled={loadingMore}
                            className="
                px-6
                py-3
                rounded-xl
                bg-cyan-600
                text-white
                hover:bg-cyan-500
                transition-colors
                disabled:opacity-50
              "
                        >
                            {loadingMore ? 'Loading...' : 'Show More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}