'use client'
import './globals.css'
import Answer from '@/components/Answer'
import Question from '@/components/Question'
import { useEffect, useRef, useState } from 'react'
import { useCourse, useFailedCount } from '@/store/useCourse'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const [currentMode, setCurrentMode] = useState<'question' | 'answer'>('question')
  const { fetchCourse, getCurrentStatement, toNextStatement, checkCorrect } = useCourse()
  const { increaseFailedCount, resetFailedCount } = useFailedCount()

  useEffect(() => {
    fetchCourse()
  }, [])

  // 答题模式输入框 enter 响应事件
  const handleCheckAnswer = (userInput: string) => {
    if (checkCorrect(userInput)) {
      setCurrentMode('answer')
      resetFailedCount()
    } else {
      increaseFailedCount(() => {
        setCurrentMode('answer')
      })
    }
  }
  // 点击next按钮
  const handleToNextStatement = () => {
    toNextStatement()
    setCurrentMode('question')
  }
  const { data: session } = useSession()
  if (!session) {
    return (
      <Link href="/api/auth/signin">
        <button className="bg-slate-600">sign in with github</button>
      </Link>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#121826]">
      <header className="flex justify-between items-center p-4">
        <div>logo</div>
        <div>menu</div>
      </header>
      <main className="flex-1 flex items-center justify-center p-8 text-2xl text-center">
        {currentMode === 'question' ? (
          <Question word={getCurrentStatement()?.chinese || ''} onCheckAnswer={handleCheckAnswer} />
        ) : (
          <Answer
            word={getCurrentStatement()?.english || ''}
            soundMark={getCurrentStatement()?.soundMark || ''}
            onToNextStatement={handleToNextStatement}
          />
        )}
      </main>
      <footer className="flex-shrink-0 flex items-center justify-center p-4">备案信息</footer>
    </div>
  )
}
