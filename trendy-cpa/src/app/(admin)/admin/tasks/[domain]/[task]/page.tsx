'use client'

import { useEffect, useState } from 'react'

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

import { useParams, useRouter } from 'next/navigation'

import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'

import {
  Check,
  ExternalLink,
  Trash2,
  X,
} from 'lucide-react'

export default function TaskDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const { user } = useAuth()

  const taskId = params.task as string

  const [task, setTask] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])

  const [rejecting, setRejecting] =
    useState<string | null>(null)

  const [reason, setReason] = useState('')

  const fetchData = async () => {
    const taskSnap = await getDoc(
      doc(db, 'tasks', taskId)
    )

    setTask({
      id: taskSnap.id,
      ...taskSnap.data(),
    })

    const submissionsSnap = await getDocs(
      query(
        collection(db, 'submissions'),
        where('taskId', '==', taskId)
      )
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

  const approveSubmission = async (
    submission: any
  ) => {
    try {
      await runTransaction(
        db,
        async (transaction) => {
          const submissionRef = doc(
            db,
            'submissions',
            submission.id
          )

          const userQuery = await getDocs(
            query(
              collection(db, 'users'),
              where(
                'email',
                '==',
                submission.userEmail
              )
            )
          )

          if (userQuery.empty) return

          const userDoc = userQuery.docs[0]

          transaction.update(submissionRef, {
            status: 'approved',

            reviewedByEmail: user?.email,

            reviewedAt: serverTimestamp(),
          })

          transaction.update(userDoc.ref, {
            points: increment(task.points),
            tasksDone: increment(1),
          })
        }
      )

      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const rejectSubmission = async (
    submission: any
  ) => {
    await updateDoc(
      doc(db, 'submissions', submission.id),
      {
        status: 'rejected',

        rejectionReason: reason,

        reviewedByEmail: user?.email,

        reviewedAt: serverTimestamp(),
      }
    )

    setRejecting(null)
    setReason('')

    fetchData()
  }

  const deleteTask = async () => {
    if (!confirm('Delete task?')) return

    await deleteDoc(doc(db, 'tasks', taskId))

    router.back()
  }

  if (!task) return null

  return (
    <div className="space-y-6 text-white p-10">
      {/* Header */}
      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-7
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {task.title}
            </h1>

            <p className="text-slate-400 mt-4">
              {task.description}
            </p>

            <div className="flex gap-3 mt-6">
              <Badge text={task.difficulty} />

              <Badge
                text={`${task.points} Points`}
              />

              <Badge
                text={`Deadline: ${task.deadline}`}
              />
            </div>
          </div>

          <button
            onClick={deleteTask}
            className="
              w-12
              h-12
              rounded-xl
              bg-red-500/10
              text-red-400
              flex
              items-center
              justify-center
            "
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-5">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-6
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base md:text-xl font-semibold">
                  {submission.userEmail}
                </h2>

                <a
                  href={submission.submissionUrl}
                  target="_blank"
                  className="
                    flex
                    items-center
                    gap-2
                    text-cyan-400
                    mt-3
                  "
                >
                  Open Submission
                  <ExternalLink size={16} />
                </a>

                <div className="mt-4">
                  <Badge
                    text={submission.status}
                  />
                </div>

                {submission.reviewedByEmail && (
                  <p className="text-slate-500 mt-4">
                    Reviewed By:{' '}
                    {
                      submission.reviewedByEmail
                    }
                  </p>
                )}
              </div>

              {submission.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      approveSubmission(
                        submission
                      )
                    }
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-green-500/10
                      text-green-400
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Check size={20} />
                  </button>

                  <button
                    onClick={() =>
                      setRejecting(
                        submission.id
                      )
                    }
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-red-500/10
                      text-red-400
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Reject */}
            {rejecting === submission.id && (
              <div className="mt-6">
                <textarea
                  placeholder="Reason for rejection..."
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  className="
  w-full
  min-h-[120px]
  rounded-2xl
  border
  border-slate-700
  bg-slate-950
  px-5
  py-4
  text-white
  placeholder:text-slate-500
  outline-none
  transition-all
  resize-none

  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/10
"
                />

                <button
                  onClick={() =>
                    rejectSubmission(
                      submission
                    )
                  }
                  className="
                    mt-4
                    px-5
                    py-3
                    rounded-xl
                    bg-red-500
                  "
                >
                  Reject Submission
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Badge({
  text,
}: {
  text: string
}) {
  return (
    <div
      className="
        px-4
        py-2
        rounded-xl
        bg-slate-800
        border
        border-slate-700
        text-slate-200
        text-sm
      "
    >
      {text}
    </div>
  )
}
