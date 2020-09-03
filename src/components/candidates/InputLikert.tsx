import React, { FC, useState } from 'react'
import { Radio } from 'antd';
import styled from 'styled-components';


export interface OwnProps {
    questions: Array<String>;
    answers: Array<String>;
    candidates: Array<string>;
    onLikertChange: (value: Questionresponse) => void;
}




// MAIN COMPONENT
const InputLikert: FC<OwnProps> = ({ questions, answers, candidates, onLikertChange }) => {
    return (
        <View>
            {
                candidates.map(candidate =>
                    <ListItem key={candidate}>
                        <p> {candidate} </p>
                        {
                            questions.map((question) =>
                                <Question
                                    key={`${candidate}${question}`}
                                    name={candidate}
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
    name: String
    answers: Array<String>
    onLikertChange: (value: Questionresponse) => void;
};



export interface Questionresponse {
    question: String,
    name: String,
    answer: String
};




const Question: FC<QuestionProps> = ({ question, name, answers, onLikertChange }) => {

    const [selected, setSelected] = useState<String>('');

    const onChange = (payload: Questionresponse) => {
        setSelected(payload.answer);
        onLikertChange(payload);
    }


    return (
        <QuestionView>
            <p>{question}</p>
            <Radio.Group
                onChange={event => onChange({question,name, answer: event.target.value})}
                value={selected}
            >
                {
                    answers.map((answer, i) =>
                        <Radio key={`${name}${question}${answer}`} value={i}>{answer}</Radio>
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



