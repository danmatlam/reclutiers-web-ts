import React, { FC, useState } from 'react'
import { Radio } from 'antd';
import styled from 'styled-components';
import { Candidate } from './CandidateForm';


export interface OwnProps {
    questions: Array<String>;
    answers: Array<String>;
    candidates: Array<Candidate>;
    onLikertChange: (value: questionResponse) => void;
}
interface Props extends OwnProps {

}


// MAIN COMPONENT
const InputLikert: FC<Props> = ({ questions, answers, candidates, onLikertChange }) => {
    return (
        <View>

            {
                candidates.map(candidate =>

                    <ListItem key={candidate.name}>
                        <p> {candidate.name} </p>
                        {
                            questions.map((question) =>
                                <Question
                                    key={`${candidate.name}${question}`}
                                    person={candidate.name}
                                    question={question}
                                    answers={answers}
                                    onLikertChange={onLikertChange}
                                />)

                        }
                    </ListItem>



                )
            }


        </View>
    )
};


// Sub child helper


export interface QuestionProps {
    question: String,
    person: String
    answers: Array<String>
    onLikertChange: (value: questionResponse) => void;
};



export interface questionResponse {
    question: String,
    person: String,
    answer: String
};




const Question: FC<QuestionProps> = ({ question, person, answers, onLikertChange }) => {

    const [selected, setSelected] = useState<String>('');

    const onChange = (payload: questionResponse) => {
        setSelected(payload.answer);
        onLikertChange(payload)
    }


    return (
        <QuestionView>
            <p>{question}</p>
            <Radio.Group
                onChange={event => onChange({question,person, answer: event.target.value})}
                value={selected}
            >
                {
                    answers.map((answer, i) =>
                        <Radio key={`${person}${question}${answer}`} value={answer}>{answer}</Radio>
                    )
                }
            </Radio.Group>
        </QuestionView>
    )
};




export default InputLikert;



// helper components 

const View = styled.div`
    display:flex;
    flex-direction:column;
`
const ListItem = styled.div`

      box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.123);
      border-radius:9pt;
      margin:.9em;
      padding:.9em;
    background-color:#ffffff;

`

const QuestionView = styled.div`

    padding:1.2em;

`



