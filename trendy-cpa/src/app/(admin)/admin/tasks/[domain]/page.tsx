'use client'

import { useEffect, useState } from 'react'

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'

import { useParams, useRouter } from 'next/navigation'

import { db } from '@/lib/firebase'

import {
  ClipboardCheck,
  Clock3,
  Plus,
  Trash2,
} from 'lucide-react'

export default function DomainTasksPage() {
  const params = useParams()
  const router = useRouter()

  const domain = params.domain as string

  const [tasks, setTasks] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])

  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] =
    useState('')
  const [difficulty, setDifficulty] =
    useState('Easy')
  const [deadline, setDeadline] =
    useState('')
  const [points, setPoints] = useState(100)

  // Input class style
  const inputClass = `
  w-full
  rounded-2xl
  border
  border-slate-700
  bg-slate-800/80
  px-5
  py-4
  text-white
  placeholder:text-slate-500
  outline-none
  transition-all
  duration-300
  focus:border-cyan-400
  focus:ring-2
  focus:ring-cyan-500/20
`
  // Fetch tasks and submission details
  const fetchData = async () => {
    const tasksSnap = await getDocs(
      query(
        collection(db, 'tasks'),
        where('domain', '==', domain)
      )
    )

    const submissionsSnap = await getDocs(
      collection(db, 'submissions')
    )

    setTasks(
      tasksSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    )

    setSubmissions(
      submissionsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Add tasks
  const handleAddTask = async () => {
    await addDoc(collection(db, 'tasks'), {
      title,
      description,
      difficulty,
      deadline,
      points,

      image: '/tasks/default.png',

      domain,

      createdAt: serverTimestamp(),

      isActive: true,
    })

    setOpen(false)

    fetchData()
  }

  // Delete tasks
  const handleDeleteTask = async (
    taskId: string
  ) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'tasks', taskId))

      setTasks((prev) =>
        prev.filter((task) => task.id !== taskId)
      )
    } catch (error) {
      console.error(
        'Error deleting task:',
        error
      )
    }
  }

  return (
    <div className="space-y-6 text-white p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold capitalize">
            {domain.replace(/-/g, ' ')}
          </h1>

          <p className="text-slate-400 mt-2">
            Domain Tasks Management
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
          "
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {tasks.map((task) => {
          const taskSubs = submissions.filter(
            (s) => s.taskId === task.id
          )

          const pending = taskSubs.filter(
            (s) => s.status === 'pending'
          )

          return (
            <div
              key={task.id}
              onClick={() =>
                router.push(
                  `/admin/tasks/${domain}/${task.id}` as any
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
                transition-all
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <p className="text-slate-400 mt-3">
                    {task.description}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()

                    handleDeleteTask(task.id)
                  }}
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-red-500/10
                    text-red-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <SmallStat
                  title="Submissions"
                  value={taskSubs.length}
                  icon={<ClipboardCheck size={18} />}
                />

                <SmallStat
                  title="Pending"
                  value={pending.length}
                  icon={<Clock3 size={18} />}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Popup */}
      {/* Popup */}
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
        max-w-xl
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-6
        relative
        max-h-[90vh]
        overflow-y-auto
      "
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="
          absolute
          top-4
          right-4
          w-9
          h-9
          rounded-xl
          bg-slate-800
          hover:bg-red-500/20
          text-slate-400
          hover:text-red-400
          transition-all
          flex
          items-center
          justify-center
        "
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-5">
              Add Task
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm text-slate-300 font-medium">
                  Task Title
                </label>

                <input
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm text-slate-300 font-medium">
                  Task Description
                </label>

                <textarea
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className={`${inputClass} min-h-[90px]`}
                />
              </div>

              {/* Deadline + Points */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm text-slate-300 font-medium">
                    Deadline
                  </label>

                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) =>
                      setDeadline(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-slate-300 font-medium">
                    Reward Points
                  </label>

                  <input
                    type="number"
                    value={points}
                    onChange={(e) =>
                      setPoints(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block mb-2 text-sm text-slate-300 font-medium">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value)
                  }
                  className={inputClass}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              {/* Button */}
              <button
                onClick={handleAddTask}
                className="
            w-full
            py-3
            rounded-2xl
            bg-cyan-600
            hover:bg-cyan-500
            font-semibold
            transition-all
            duration-300
          "
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function SmallStat({
  title,
  value,
  icon,
}: any) {
  return (
    <div
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-4
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-cyan-400">
          {icon}
        </div>
      </div>
    </div>
  )
}