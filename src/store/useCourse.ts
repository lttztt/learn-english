import { create } from 'zustand'

interface Statement {
  english: string
  chinese: string
  soundMark: string
}

interface Course {
  id: number
  statements: Statement[]
}

interface State {
  statementIndex: number
  currentCourse?: Course
  fetchCourse: () => void
  toNextStatement: () => void
  getCurrentStatement: () => Statement | undefined
  checkCorrect: (input: string) => boolean
}

const useCourse = create<State>((set, get) => ({
  statementIndex: 0,
  currentCourse: undefined,
  async fetchCourse() {
    const response = await fetch('/api/main')
    const { data } = await response.json()

    set({ currentCourse: data })
  },
  toNextStatement() {
    set((state) => ({ statementIndex: state.statementIndex + 1 }))
  },
  getCurrentStatement() {
    const { currentCourse, statementIndex } = get()

    return currentCourse?.statements[statementIndex]
  },
  checkCorrect(input: string) {
    const { getCurrentStatement } = get()
    return input === getCurrentStatement()?.english
  },
}))
const failCountTotal = 3

interface FailedCountState {
  count: number
  increaseFailedCount: (callback: () => void) => void
  resetFailedCount: () => void
}
const useFailedCount = create<FailedCountState>((set) => {
  return {
    count: 0,
    increaseFailedCount(callback) {
      set((state) => {
        const nextCount = state.count + 1
        if (nextCount >= failCountTotal) {
          callback()
          return { count: 0 }
        }

        return {
          count: nextCount,
        }
      })
    },
    resetFailedCount() {
      set({ count: 0 })
    },
  }
})

export { useCourse, useFailedCount }
