"use client";
import Answer from "@/components/Answer";
import Question from "@/components/Question";
import { useRef, useState } from "react";

const courseData = {
  name: "第一节课",
  statements: [
    {
      chinese: "现在",
      english: "now",
      soundMark: "/naʊ/",
    },
    {
      chinese: "喜欢",
      english: "like",
      soundMark: "/like/",
    },
    {
      chinese: "我爱你",
      english: "I love you",
      soundMark: "/ai/ /tu/ /bi/ /hiə/",
    },
    {
      chinese: "我想要在这里",
      english: "I want to be here",
      soundMark: "/ai/ /want/ /tu/ /bi/ /hiə/",
    },
  ],
};

const failCountTotal = 3;
export default function Main() {
  const [currentMode, setCurrentMode] = useState<"question" | "answer">(
    "question"
  );
  const statementIndex = useRef(0);
  const { english, soundMark, chinese } =
    courseData.statements[statementIndex.current];
  const failCount = useRef(0);

  function checkValidity(input: string) {
    return input === english;
  }
  function handleCheckAnswer(userInput: string) {
    if (!checkValidity(userInput)) {
      failCount.current++;
      if (failCount.current >= failCountTotal) {
        setCurrentMode("answer");
      }
    } else {
      setCurrentMode("answer");
    }
  }
  function onToNextStatement() {
    statementIndex.current++;
    setCurrentMode("question");
    failCount.current = 0;
  }
  return (
    <div>
      {currentMode === "question" ? (
        <Question word={chinese} onCheckAnswer={handleCheckAnswer} />
      ) : (
        <Answer
          word={english}
          soundMark={soundMark}
          onToNextStatement={onToNextStatement}
        />
      )}
    </div>
  );
}
