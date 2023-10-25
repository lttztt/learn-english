export default function Answer({
  word,
  soundMark,
  onToNextStatement,
}: {
  word: string
  soundMark: string
  onToNextStatement: () => void
}) {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`
  return (
    <div>
      <div>{word}</div>
      <div>{soundMark}</div>

      <audio autoPlay controls className="w-0 h-0">
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button className="border-solid border-1 bg-green-700  rounded-xl px-8 py-2 mt-3" onClick={onToNextStatement}>
        next
      </button>
    </div>
  )
}
