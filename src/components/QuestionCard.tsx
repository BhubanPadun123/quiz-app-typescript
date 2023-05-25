import React from "react";
import { answerObj } from "../App";
import styles from "../styles/Card.module.css"

type Props ={
    question:string;
    answer:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userAns:answerObj | undefined;
    questionNumber:number;
    totalQuestion:number

}

const QuestionCard:React.FC<Props> =({
    question,
     answer,
    callback,
    userAns,
    questionNumber,
    totalQuestion

})=>(
    <div className={styles.cardContainer}>
        <p className={styles.number}>
            Question: {questionNumber} / {totalQuestion}
        </p>
        <p className={styles.question}  dangerouslySetInnerHTML={{__html:question}} />
        <div className={styles.option} >
            {
                answer.map(a=>(
                    <div key={a} className={styles.element}  >
                        <button className={styles.button}  disabled={userAns ? true : false} value={a} onClick={callback} >
                            <span  dangerouslySetInnerHTML={{__html: a}} />
                        </button>
                    </div>
                ))
            }
        </div>
    </div>
)

export default QuestionCard