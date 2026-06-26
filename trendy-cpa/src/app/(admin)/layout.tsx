'use client'

import Link from 'next/link'

import { useAuth } from '@/context/AuthContext'

import {
  usePathname,
  useRouter,
} from 'next/navigation'

import { useState } from 'react'

import {
  Bell,
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
          bg-black
        "
      >
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-cyan-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="text-slate-400 mt-5">
            Loading Admin Panel...
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
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },

    {
      href: '/admin/users',
      label: 'Users',
      icon: Users,
    },

    {
      href: '/admin/rbac',
      label: 'RBAC',
      icon: Shield,
    },

    {
      href: '/admin/tasks',
      label: 'Tasks',
      icon: ClipboardList,
    },

    {
      href: '/admin/notification',
      label: 'Notification',
      icon: Bell,
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
        bg-black
        overflow-hidden
        text-white
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
            bg-black/70
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
          bg-[#050816]
          border-r
          border-slate-800
          flex
          flex-col
          transition-transform
          duration-300
          ${
            mobileOpen
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
                  from-cyan-400
                  via-blue-400
                  to-indigo-500
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
                bg-slate-800
                flex
                items-center
                justify-center
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
            border-slate-800
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-cyan-500
                to-indigo-600
                flex
                items-center
                justify-center
                text-base md:text-xl
                font-bold
                shadow-lg
                shadow-cyan-500/20
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
                  href={item.href as any}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition-all
                    group
                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-cyan-500/20
                          to-indigo-500/20
                          border
                          border-cyan-500/30
                          text-white
                          shadow-lg
                          shadow-cyan-500/10
                        `
                        : `
                          text-slate-400
                          hover:bg-slate-900
                          hover:text-white
                        `
                    }
                  `}
                >
                  <div
                    className={`
                      ${
                        active
                          ? 'text-cyan-400'
                          : 'text-slate-500 group-hover:text-cyan-400'
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
            border-slate-800
          "
        >
          <div
            className="
              rounded-2xl
              bg-slate-900
              border
              border-slate-800
              p-4
            "
          >
            <p className="text-sm text-slate-400">
              Trendy Admin System
            </p>

            <p className="text-xs text-slate-600 mt-1">
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
            bg-[#050816]/95
            backdrop-blur-xl
            border-b
            border-slate-800
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
              bg-slate-900
              border
              border-slate-800
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
            bg-black
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
