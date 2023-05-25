import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizeQuestion, Diffculty, QuestionState } from "./API";
import bgImg from "./images/bgImg.jpg"
import styles from  './styles/App.module.css'

export type answerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnwers, setUserAnwers] = useState<answerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizeQuestion(TOTAL_QUESTION, Diffculty.EASY));

  const startQueiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizeQuestion(
      TOTAL_QUESTION,
      Diffculty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnwers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAns = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
    
      const correct = questions[number].correct_answer === answer;
      console.log("============>",correct)
      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnwers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuetion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion == TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>

      <div className={styles.App}  >
        <h1 className={styles.h1}>React Typescript Quiz App</h1>
        {gameOver || userAnwers.length == TOTAL_QUESTION ? (
          <button className={styles.start} onClick={startQueiz}>
            start
          </button>
        ) : null}

        {!gameOver ? <p className={styles.score}>Score:{score}</p> : null}
        {loading ? <p>Loading Question...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestion={TOTAL_QUESTION}
            question={questions[number].question}
            answer={questions[number].answers}
            userAns={userAnwers ? userAnwers[number] : undefined}
            callback={checkAns}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnwers.length === number + 1 &&
        number !== TOTAL_QUESTION - 1 ? (
          <button className={styles.start} onClick={nextQuetion}>
            Next Question
          </button>
        ) : null}
      </div>
    </>
  );
}

export default App;
