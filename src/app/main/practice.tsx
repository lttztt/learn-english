"use client";
import { ChangeEvent, useState } from "react";

export default function Practice() {
  const chinese = "现在";
  const english = "now";
  // const answer = "now";
  const soundMark = "nau";
  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState(chinese);
  // 两种状态 回答 发音
  const [currentState, setCurrentState] = useState("question");
  const [displaySoundMark, setDisplaySoundMark] = useState("");
  // 处理输入框的变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // 错误次数
  const [count, setCount] = useState(0);
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (checkValidity(inputValue)) {
        toNext();
      } else {
        console.log("wrong");
        setInputValue("");
        setCount(count + 1);
        if (count >= 3) {
          toNext();
        }
      }
    }
  };
  function toNext() {
    setCount(0);
    console.log("right");
    setCurrentValue(english);
    setDisplaySoundMark(soundMark);
    setCurrentState("answer");
    console.log("sound");
  }
  function checkValidity(input: string) {
    return input === english;
  }
  return (
    <div className="m-20">
      {currentState === "question" ? (
        <div>{chinese}</div>
      ) : (
        <div>
          <div>{chinese}</div>
          <div>{soundMark}</div>
        </div>
      )}
      <input
        className="bg-red-600"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
}
