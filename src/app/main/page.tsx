'use client'
import Answer from '@/components/Answer'
import Question from '@/components/Question'
import { useEffect, useRef, useState } from 'react'

const failCountTotal = 3
export default function Main() {
  const [currentMode, setCurrentMode] = useState<'question' | 'answer'>('question')
  const [questionWord, setQuestionWord] = useState('')
  const [answerWord, setAnswerWord] = useState('')
  const [answerSoundMark, setAnswerSoundMark] = useState('')

  const statementIndex = useRef(0)
  const failCount = useRef(0)
  const courseData = useRef<any>({})

  function updateWord() {
    const { english, soundMark, chinese } = courseData.current[statementIndex.current]
    setQuestionWord(chinese)
    setAnswerWord(english)
    setAnswerSoundMark(soundMark)
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/main')
      const { data } = await response.json()
      courseData.current = data.statements
      updateWord()
    }
    fetchData()
  }, [])

  function checkValidity(input: string) {
    return input === answerWord
  }
  function handleCheckAnswer(userInput: string) {
    if (!checkValidity(userInput)) {
      failCount.current++
      if (failCount.current >= failCountTotal) {
        failCount.current = 0
        setCurrentMode('answer')
      }
    } else {
      setCurrentMode('answer')
    }
  }
  function onToNextStatement() {
    statementIndex.current++
    setCurrentMode('question')
    failCount.current = 0
    updateWord()
  }
  return (
    <div>
      {currentMode === 'question' ? (
        <Question word={questionWord} onCheckAnswer={handleCheckAnswer} />
      ) : (
        <Answer word={answerWord} soundMark={answerSoundMark} onToNextStatement={onToNextStatement} />
      )}
    </div>
  )
}
