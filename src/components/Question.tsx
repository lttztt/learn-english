import { ChangeEvent, useState } from "react";

export default function Question({
  word,
  onCheckAnswer,
}: {
  word: string;
  onCheckAnswer: (userInput: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  // 处理输入框的变化
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("enter");
      onCheckAnswer(inputValue);
      setInputValue("");
    }
  };
  return (
    <div>
      <div>{word}</div>
      <input
        autoFocus
        className="bg-red-600"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
}
