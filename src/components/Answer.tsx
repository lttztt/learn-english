export default function Answer({
  word,
  soundMark,
  onToNextStatement,
}: {
  word: string;
  soundMark: string;
  onToNextStatement: () => void;
}) {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;
  return (
    <div>
      <div>{word}</div>
      <div>{soundMark}</div>

      <audio autoPlay controls>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={onToNextStatement}>next</button>
    </div>
  );
}
