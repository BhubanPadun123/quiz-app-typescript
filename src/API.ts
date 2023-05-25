import { shuffleArray } from "./Utils";

export type Question = {
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string
}

export type QuestionState = Question & {answers:string[]}

export enum Diffculty {
    EASY="easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export const fetchQuizeQuestion = async(amount:number,diffculty:Diffculty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${diffculty}$type=multiple`
    const api = "https://opentdb.com/api.php?amount=10"

    const data = await(await fetch(api)).json()

    return data.results.map((question:Question) => (
        {
            ...question,
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
        }
    ))
}