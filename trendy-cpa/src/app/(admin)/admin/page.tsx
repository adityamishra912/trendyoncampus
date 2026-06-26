'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

import {
  Activity,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Sparkles,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  XCircle,
} from 'lucide-react'

const domains = [
  {
    slug: 'web-development',
    name: 'Web Development',
  },
  {
    slug: 'creativity',
    name: 'Creativity',
  },
  {
    slug: 'event-management',
    name: 'Event Management',
  },
  {
    slug: 'marketing',
    name: 'Marketing',
  },
  {
    slug: 'social-outreach',
    name: 'Social Outreach',
  },
  {
    slug: 'media-publicity',
    name: 'Media & Publicity',
  },
]

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [submissions, setSubmissions] =
    useState<any[]>([])

  const [team, setTeam] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [
          usersSnap,
          tasksSnap,
          submissionsSnap,
          teamSnap,
        ] = await Promise.all([
          getDocs(collection(db, 'users')),

          getDocs(collection(db, 'tasks')),

          getDocs(
            query(
              collection(
                db,
                'submissions'
              ),
              orderBy(
                'submittedAt',
                'desc'
              )
            )
          ),

          getDocs(collection(db, 'team')),
        ])

        setUsers(
          usersSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )

        setTasks(
          tasksSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )

        setSubmissions(
          submissionsSnap.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          )
        )

        setTeam(
          teamSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const pendingReviews =
    submissions.filter(
      (s) => s.status === 'pending'
    )

  const approved =
    submissions.filter(
      (s) => s.status === 'approved'
    )

  const rejected =
    submissions.filter(
      (s) => s.status === 'rejected'
    )

  const topUsers = [...users]
    .sort(
      (a, b) =>
        (b.points || 0) -
        (a.points || 0)
    )
    .slice(0, 5)

  const recentUsers = [...users]
    .sort((a, b) => {
      const first =
        a.createdAt?.seconds || 0

      const second =
        b.createdAt?.seconds || 0

      return second - first
    })
    .slice(0, 5)

  if (loading) {
    return (
      <div
        className="
          h-[80vh]
          flex
          items-center
          justify-center
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
            Loading Dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7 text-white">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-500/10
              text-cyan-400
              flex
              items-center
              justify-center
            "
          >
            <LayoutDashboard size={24} />
          </div>

          <div>
            <h1 className="text-4xl font-black">
              Dashboard
            </h1>

            <p className="text-slate-400 mt-1">
              Trendy Admin Overview
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<Users size={24} />}
          color="cyan"
        />

        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={
            <FolderKanban size={24} />
          }
          color="purple"
        />

        <StatCard
          title="Submissions"
          value={submissions.length}
          icon={
            <ClipboardCheck size={24} />
          }
          color="green"
        />

        <StatCard
          title="Pending Reviews"
          value={pendingReviews.length}
          icon={<Clock3 size={24} />}
          color="orange"
        />
      </div>

      {/* Pending + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Pending Reviews */}
        <div
          className="
            xl:col-span-2
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Pending Reviews
              </h2>

              <p className="text-slate-400 mt-1">
                Latest submissions awaiting
                approval
              </p>
            </div>

            <Clock3
              className="text-orange-400"
              size={24}
            />
          </div>

          <div className="space-y-4">
            {pendingReviews
              .slice(0, 5)
              .map((submission) => (
                <div
                  key={submission.id}
                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950
                  "
                >
                  <div>
                    <p className="font-semibold">
                      {
                        submission.userEmail
                      }
                    </p>

                    <p className="text-slate-400 text-sm mt-1">
                      {
                        submission.taskDomain
                      }
                    </p>
                  </div>

                  <Link
                    href={`/admin/tasks/${submission.taskDomain}/${submission.taskId}` as any}
                    className="
                      flex
                      items-center
                      gap-2
                      text-cyan-400
                    "
                  >
                    Review
                    <ArrowRight
                      size={16}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Actions */}
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
              <h2 className="text-2xl font-bold">
                Quick Actions
              </h2>

              <p className="text-slate-400 mt-1">
                Fast access shortcuts
              </p>
            </div>

            <Sparkles
              className="text-cyan-400"
              size={24}
            />
          </div>

          <div className="space-y-4 mt-6">
            <QuickAction
              href="/admin/tasks"
              label="Create Task"
              icon={<Plus size={18} />}
            />

            <QuickAction
              href="/admin/rbac"
              label="Add Team Member"
              icon={
                <UserPlus size={18} />
              }
            />

            <QuickAction
              href="/admin/tasks"
              label="Review Tasks"
              icon={
                <ClipboardCheck
                  size={18}
                />
              }
            />

            <QuickAction
              href="/admin/users"
              label="Manage Users"
              icon={<Users size={18} />}
            />
          </div>
        </div>
      </div>

      {/* Domain Analytics */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp
            className="text-cyan-400"
            size={24}
          />

          <h2 className="text-2xl md:text-3xl font-bold">
            Domain Analytics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 sm:grid-cols-3 gap-5">
          {domains.map((domain) => {
            const domainTasks =
              tasks.filter(
                (t) =>
                  t.domain ===
                  domain.slug
              )

            const domainSubs =
              submissions.filter(
                (s) =>
                  s.taskDomain ===
                  domain.slug
              )

            const pending =
              domainSubs.filter(
                (s) =>
                  s.status ===
                  'pending'
              )

            const approvalRate =
              domainSubs.length > 0
                ? Math.round(
                    (domainSubs.filter(
                      (s) =>
                        s.status ===
                        'approved'
                    ).length /
                      domainSubs.length) *
                      100
                  )
                : 0

            return (
              <div
                key={domain.slug}
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-6
                  hover:border-cyan-500/40
                  transition-all
                "
              >
                <div className="flex items-center justify-between">
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
                    <Briefcase
                      size={24}
                    />
                  </div>

                  <div
                    className="
                      px-3
                      py-1.5
                      rounded-xl
                      bg-slate-800
                      text-slate-300
                      text-sm
                    "
                  >
                    {approvalRate}%
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-5">
                  {domain.name}
                </h2>

                <div className="space-y-3 mt-6">
                  <AnalyticsRow
                    label="Tasks"
                    value={
                      domainTasks.length
                    }
                  />

                  <AnalyticsRow
                    label="Submissions"
                    value={
                      domainSubs.length
                    }
                  />

                  <AnalyticsRow
                    label="Pending"
                    value={
                      pending.length
                    }
                  />

                  <AnalyticsRow
                    label="Approval Rate"
                    value={`${approvalRate}%`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity + Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Activity */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity
              className="text-cyan-400"
              size={22}
            />

            <h2 className="text-2xl font-bold">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-4">
            {submissions
              .slice(0, 6)
              .map((submission) => (
                <div
                  key={submission.id}
                  className="
                    flex
                    items-start
                    gap-4
                    p-4
                    rounded-2xl
                    bg-slate-950
                    border
                    border-slate-800
                  "
                >
                  <div>
                    {submission.status ===
                    'approved' ? (
                      <CheckCircle2
                        className="text-green-400"
                        size={20}
                      />
                    ) : submission.status ===
                      'rejected' ? (
                      <XCircle
                        className="text-red-400"
                        size={20}
                      />
                    ) : (
                      <Clock3
                        className="text-orange-400"
                        size={20}
                      />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {
                        submission.userEmail
                      }
                    </p>

                    <p className="text-slate-400 text-sm mt-1">
                      {
                        submission.status
                      }{' '}
                      submission in{' '}
                      {
                        submission.taskDomain
                      }
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Top Performers */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy
              className="text-yellow-400"
              size={22}
            />

            <h2 className="text-2xl font-bold">
              Top Performers
            </h2>
          </div>

          <div className="space-y-4">
            {topUsers.map(
              (user, index) => (
                <div
                  key={user.id}
                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-2xl
                    bg-slate-950
                    border
                    border-slate-800
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-gradient-to-br
                        from-cyan-500
                        to-indigo-600
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {
                          user.fullName
                        }
                      </p>

                      <p className="text-slate-400 text-sm">
                        {
                          user.email
                        }
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-cyan-400">
                      {user.points ||
                        0}
                    </p>

                    <p className="text-xs text-slate-500">
                      points
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Charts + Recent Users */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Submission Trends */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp
              className="text-cyan-400"
              size={22}
            />

            <h2 className="text-2xl font-bold">
              Submission Overview
            </h2>
          </div>

          <div className="space-y-5">
            <ProgressBar
              label="Approved"
              value={
                approved.length
              }
              total={
                submissions.length
              }
              color="green"
            />

            <ProgressBar
              label="Rejected"
              value={
                rejected.length
              }
              total={
                submissions.length
              }
              color="red"
            />

            <ProgressBar
              label="Pending"
              value={
                pendingReviews.length
              }
              total={
                submissions.length
              }
              color="orange"
            />
          </div>
        </div>

        {/* Recent Users */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Users
              className="text-cyan-400"
              size={22}
            />

            <h2 className="text-2xl font-bold">
              Recent Users
            </h2>
          </div>

          <div className="space-y-4">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-2xl
                  bg-slate-950
                  border
                  border-slate-800
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-indigo-600
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                  >
                    {u.fullName?.[0]}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {u.fullName}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="text-slate-500 text-sm">
                  {u.createdAt
                    ?.toDate?.()
                    ?.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickAction({
  href,
  label,
  icon,
}: any) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        justify-between
        px-5
        py-4
        rounded-2xl
        bg-slate-950
        border
        border-slate-800
        hover:border-cyan-500/40
        transition-all
      "
    >
      <div className="flex items-center gap-3">
        <div className="text-cyan-400">
          {icon}
        </div>

        <span>{label}</span>
      </div>

      <ArrowRight
        size={18}
        className="text-slate-500"
      />
    </Link>
  )
}

function AnalyticsRow({
  label,
  value,
}: any) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-slate-400">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>
    </div>
  )
}

function ProgressBar({
  label,
  value,
  total,
  color,
}: any) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0

  const colors: any = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-300">
          {label}
        </p>

        <p className="text-slate-400 text-sm">
          {percentage}%
        </p>
      </div>

      <div
        className="
          h-3
          rounded-full
          bg-slate-800
          overflow-hidden
        "
      >
        <div
          className={`h-full ${colors[color]}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: any) {
  const styles: any = {
    cyan: `
      bg-cyan-500/10
      text-cyan-400
      border-cyan-500/20
    `,

    purple: `
      bg-purple-500/10
      text-purple-400
      border-purple-500/20
    `,

    green: `
      bg-green-500/10
      text-green-400
      border-green-500/20
    `,

    orange: `
      bg-orange-500/10
      text-orange-400
      border-orange-500/20
    `,
  }

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

          <h2 className="text-4xl font-black mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            border
            flex
            items-center
            justify-center
            ${styles[color]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}