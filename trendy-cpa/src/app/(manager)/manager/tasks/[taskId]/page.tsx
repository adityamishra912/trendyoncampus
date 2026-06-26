'use client'

import { useEffect, useState } from 'react'

import {
  collection,
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
  X,
} from 'lucide-react'

export default function ManagerTaskDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const { user } = useAuth()

  const taskId = params.taskId as string

  const [task, setTask] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])

  const [rejecting, setRejecting] = useState<string | null>(null)

  const [reason, setReason] = useState('')

  const fetchData = async () => {
    const taskSnap = await getDoc(doc(db, 'tasks', taskId))

    setTask({
      id: taskSnap.id,
      ...taskSnap.data(),
    })

    const submissionsSnap = await getDocs(
      query(collection(db, 'submissions'), where('taskId', '==', taskId))
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

  const approveSubmission = async (submission: any) => {
    try {
      await runTransaction(db, async (transaction) => {
        const submissionRef = doc(db, 'submissions', submission.id)

        const userQuery = await getDocs(
          query(collection(db, 'users'), where('email', '==', submission.userEmail))
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
      })

      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const rejectSubmission = async (submission: any) => {
    await updateDoc(doc(db, 'submissions', submission.id), {
      status: 'rejected',
      rejectionReason: reason,
      reviewedByEmail: user?.email,
      reviewedAt: serverTimestamp(),
    })

    setRejecting(null)
    setReason('')

    fetchData()
  }

  if (!task) return null

  return (
    <div className="space-y-6 text-[#2D2926] p-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 border border-[#D4AF37]/20 rounded-3xl p-7">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold">{task.title}</h1>

            <p className="text-[#6D4C41] mt-4">{task.description}</p>

            <div className="flex gap-3 mt-6">
              <Badge text={task.difficulty} />

              <Badge text={`${task.points} Points`} />

              <Badge text={`Deadline: ${task.deadline}`} />
            </div>
          </div>

          <div></div>
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-5">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 border border-[#D4AF37]/20 rounded-3xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base md:text-xl font-semibold">{submission.userEmail}</h2>

                <a href={submission.submissionUrl} target="_blank" className="flex items-center gap-2 text-[#D4A514] mt-3">
                  Open Submission
                  <ExternalLink size={16} />
                </a>

                <div className="mt-4">
                  <Badge text={submission.status} />
                </div>

                {submission.reviewedByEmail && (
                  <p className="text-[#6D4C41] mt-4">Reviewed By: {submission.reviewedByEmail}</p>
                )}
              </div>

              {submission.status === 'pending' && (
                <div className="flex gap-3">
                  <button onClick={() => approveSubmission(submission)} className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                    <Check size={20} />
                  </button>

                  <button onClick={() => setRejecting(submission.id)} className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Reject */}
            {rejecting === submission.id && (
              <div className="mt-6">
                <textarea placeholder="Reason for rejection..." value={reason} onChange={(e) => setReason(e.target.value)} className="w-full min-h-[120px] rounded-2xl border border-[#E6D28A] bg-[#FFFBF0] px-5 py-4 text-[#2D2926] placeholder:text-[#8B6F47] outline-none transition-all resize-none" />

                <button onClick={() => rejectSubmission(submission)} className="mt-4 px-5 py-3 rounded-xl bg-red-500">Reject Submission</button>
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
    <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 border border-[#E6D28A] text-[#6D4C41] text-sm">
      {text}
    </div>
  )
}
