'use client'

import Link from 'next/link'

import { useAuth } from '@/context/AuthContext'

import {
    usePathname,
    useRouter,
} from 'next/navigation'

import { useState } from 'react'

import {
    BarChart3,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    Menu,
    Shield,
    Users,
    X,
} from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading, signOut } =
        useAuth()

    const router = useRouter()

    const pathname = usePathname()

    const [mobileOpen, setMobileOpen] =
        useState(false)

    if (loading) {
        return (
            <div
                className="
          flex
          items-center
          justify-center
          min-h-screen
          bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3]
        "
            >
                <div className="text-center">
                    <div
                        className="
              w-14
              h-14
              border-4
              border-[#D4AF37]
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
                    />

                    <p className="text-[#5d4037] mt-5 font-medium">
                        Loading Manager Panel...
                    </p>
                </div>
            </div>
        )
    }

    // if (!user) {
    //   if (typeof window !== 'undefined') {
    //     router.push('/')
    //   }

    //   return null
    // }

    const handleSignOut = async () => {
        await signOut()

        router.push('/')
    }

    const navItems = [
        {
            href: '/manager',
            label: 'Dashboard',
            icon: LayoutDashboard,
        },

        {
            href: '/manager/users',
            label: 'Users',
            icon: Users,
        },

        {
            href: '/manager/tasks',
            label: 'Tasks',
            icon: ClipboardList,
        },

        // {
        //   href: '/admin/analytics',
        //   label: 'Analytics',
        //   icon: BarChart3,
        // },
    ]

    return (
                <div
                        className="
                flex
                h-screen
                bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3]
                overflow-hidden
                text-[#2F2A28]
            "
                >
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    onClick={() =>
                        setMobileOpen(false)
                    }
                    className="
            fixed
            inset-0
            bg-[#2F2A28]/10
            backdrop-blur-sm
            z-40
            md:hidden
          "
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed
          md:static
          top-0
          left-0
          z-50
          h-full
          w-72
          bg-gradient-to-b from-white/90 to-[#FAF4D3]/90 backdrop-blur-md
          border-r
          border-[#D4AF37]/30
          flex
          flex-col
          transition-transform
          duration-300
          ${mobileOpen
                        ? 'translate-x-0'
                        : '-translate-x-full md:translate-x-0'
                    }
        `}
            >
                {/* Header */}
                <div
                    className="
            px-7
            py-6
            border-b
            border-slate-800
          "
                >
                    <div className="flex items-center justify-between">
                        <div>
                                    <h1
                                        className="
                          text-2xl md:text-3xl
                          font-black
                          bg-gradient-to-r
                          from-[#D4AF37]
                          via-[#B8860B]
                          to-[#8B6F47]
                          bg-clip-text
                          text-transparent
                        "
                                    >
                                        Trendy
                                    </h1>

                            <p className="text-slate-500 text-sm mt-1">
                                Admin Control Panel
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setMobileOpen(false)
                            }
                                                className="
                                md:hidden
                                w-10
                                h-10
                                rounded-xl
                                bg-[#F5EFCF]
                                flex
                                items-center
                                justify-center
                                border
                                border-[#E6D28A]
                            "
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* User */}
                                <div
                                        className="
                        p-6
                        border-b
                        border-[#D4AF37]/20
                    "
                >
                    <div className="flex items-center gap-4">
                                <div
                                                        className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-gradient-to-br
                                from-[#D4AF37]
                                to-[#B8860B]
                                flex
                                items-center
                                justify-center
                                text-base md:text-xl
                                font-bold
                                shadow-lg
                                shadow-[#B8860B]/20
                            "
                        >
                            {user?.email?.[0].toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <p
                                className="
                  font-semibold
                  truncate
                "
                            >
                                {user?.email?.split('@')[0]}
                            </p>

                            <p
                                className="
                  text-slate-500
                  text-sm
                  truncate
                "
                            >
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                            onClick={handleSignOut}
                            className="
                  mt-5
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  hover:bg-red-500/20
                  transition-all
                "
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-2">
                        {navItems.map((item) => {
                            const active =
                                pathname === item.href

                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                        className={`
                                        flex
                                        items-center
                                        gap-4
                                        px-5
                                        py-4
                                        rounded-2xl
                                        transition-all
                                        group
                                        ${active
                                                                                        ? `
                                                    bg-gradient-to-r
                                                    from-[#D4AF37]/20
                                                    to-[#B8860B]/10
                                                    border
                                                    border-[#D4AF37]/30
                                                    text-[#2D2926]
                                                    shadow-lg
                                                    shadow-[#D4AF37]/10
                                                `
                                                                                        : `
                                                    text-slate-400
                                                    hover:bg-[#F5EFCF]
                                                    hover:text-[#2D2926]
                                                `
                                                                                }
                                    `}
                                >
                                    <div
                                        className={`
                          ${active
                                                    ? 'text-[#D4A514]'
                                                    : 'text-[#8B6F47] group-hover:text-[#D4A514]'
                                                }
                        `}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div
                    className="
            p-5
            border-t
            border-[#E6D28A]
          "
                >
                    <div
                        className="
              rounded-2xl
              bg-[#F5EFCF]
              border
              border-[#E6D28A]
              p-4
            "
                    >
                        <p className="text-sm text-[#5d4037]">
                            Trendy Manager System
                        </p>

                        <p className="text-xs text-[#6D4C41] mt-1">
                            © 2026 All rights reserved
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main
                className="
          flex-1
          flex
          flex-col
          overflow-hidden
        "
            >
                {/* Mobile Header */}
                                <header
                                        className="
                        md:hidden
                        sticky
                        top-0
                        z-30
                        bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3]
                        backdrop-blur-xl
                        border-b
                        border-[#E6D28A]
                        px-5
                        py-4
                        flex
                        items-center
                        justify-between
                    "
                                >
                    <button
                        onClick={() =>
                            setMobileOpen(true)
                        }
                                                className="
                            w-11
                            h-11
                            rounded-xl
                            bg-[#F5EFCF]
                            border
                            border-[#E6D28A]
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Menu size={20} />
                    </button>

                    <h1 className="font-bold text-lg">
                        Admin Panel
                    </h1>

                    <div className="w-11" />
                </header>

                {/* Content */}
                                <div
                                        className="
                        flex-1
                        overflow-auto
                        bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3]
                        p-6
                        md:p-6
                    "
                                >
                    {children}
                </div>
            </main>
        </div>
    )
}
