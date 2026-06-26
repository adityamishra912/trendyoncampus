'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  collection,
  getDocs,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

import {
  Briefcase,
  ClipboardCheck,
  Clock3,
  FolderKanban,
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

export default function TasksPage() {
  const router = useRouter()

  const [tasks, setTasks] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const tasksSnap = await getDocs(
          collection(db, 'tasks')
        )

        const submissionsSnap = await getDocs(
          collection(db, 'submissions')
        )

        const tasksData = tasksSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        const submissionsData =
          submissionsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

        setTasks(tasksData)
        setSubmissions(submissionsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6 text-white p-10">
      <div>
        <h1 className="text-4xl font-bold">
          Tasks Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all domain tasks and reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={<FolderKanban size={24} />}
        />

        <StatCard
          title="Total Submissions"
          value={submissions.length}
          icon={<ClipboardCheck size={24} />}
        />

        <StatCard
          title="Pending Reviews"
          value={
            submissions.filter(
              (s) => s.status === 'pending'
            ).length
          }
          icon={<Clock3 size={24} />}
        />
      </div>

      {/* Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 sm:grid-cols-3 gap-5">
        {domains.map((domain) => {
          const domainTasks = tasks.filter(
            (t) => t.domain === domain.slug
          )

          const domainSubs = submissions.filter(
            (s) => s.taskDomain === domain.slug
          )

          const pending = domainSubs.filter(
            (s) => s.status === 'pending'
          )

          return (
            <div
              key={domain.slug}
              onClick={() =>
                router.push(
                  `/admin/tasks/${domain.slug}`
                )
              }
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                cursor-pointer
                hover:border-cyan-500/50
                hover:bg-slate-800/50
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
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                  "
                >
                  <Briefcase size={24} />
                </div>

                <span
                  className="
                    px-3
                    py-1
                    rounded-lg
                    bg-slate-800
                    text-slate-300
                    text-sm
                  "
                >
                  {domainTasks.length} Tasks
                </span>
              </div>

              <h2 className="text-2xl font-bold mt-5">
                {domain.name}
              </h2>

              <div className="space-y-3 mt-6">
                <Info
                  label="Submissions"
                  value={domainSubs.length}
                />

                <Info
                  label="Pending Review"
                  value={pending.length}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Info({
  label,
  value,
}: {
  label: string
  value: number
}) {
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