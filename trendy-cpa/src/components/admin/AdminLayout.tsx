import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    )
  }

  if (!user) {
    if (typeof window !== 'undefined') router.push('/auth/login')
    return null
  }

  const handleSignOut = () => {
    signOut()
    router.push('/auth/login')
  }

  return (
    <div className="site-root min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#2F2A28]/10 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-gradient-to-b from-white/90 to-[#FAF4D3]/90 text-[#2D2926] shadow transform transition-transform duration-300 z-40 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
            Trendy
          </h2>
          <p className="text-xs text-[#6D4C41] mt-1">Admin Dashboard</p>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
              <span className="text-[#2D2926] font-bold">
                {user.email?.[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2D2926]">{user.email?.split('@')[0]}</p>
              <p className="text-xs text-[#6D4C41]">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-3 py-2 text-sm rounded-lg bg-[#FBE4E4] text-[#B54747] hover:bg-[#F5D1D1] transition-colors border border-[#E7A7A7]"
          >
            Sign Out
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {[
              { href: '/admin', label: 'Dashboard', icon: '📊' },
              { href: '/admin/users', label: 'Users', icon: '👥' },
              { href: '/admin/rbac', label: 'RBAC', icon: '🔐' },
              { href: '/admin/tasks', label: 'Tasks & Rewards', icon: '🎯' },
              { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
              { href: '/admin/audit', label: 'Audit Log', icon: '📋' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    router.pathname === item.href
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/10 text-[#2D2926] shadow-lg'
                      : 'text-[#6D4C41] hover:bg-[#F5EFCF] hover:text-[#D4A514]'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <p className="text-xs text-gray-500 text-center">© 2024 Trendy Admin</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          <div className="w-6" />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 md:p-6 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
