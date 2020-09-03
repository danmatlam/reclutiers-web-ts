import React, { FC, useState, useReducer } from 'react';
import InputSelectMultiple from './InputSelectMultiple';
import { useDispatch, useSelector } from "react-redux";


import data from './candidates.json';

import InputLikert from './InputLikert';

// interfaces

import { Questionresponse } from './InputLikert';
import JSONTreeComponent from 'react-json-tree';
export interface Candidate {
    name: string,
    photoUrl: string
};
interface Action {
    type: string,
    payload: Questionresponse
}



// MOCK DATA
const likertAnswers: Array<String> = [
    'strongly disagree',
    'disagree',
    'neutral',
    'agree',
    'strongly agree'
];

const likertQuestions: Array<String> = [
    'The applicant masters javascript?',
    'The applicant seems to be motivated by company vision?',
    'The applicant has experience using frameworks as agile?'
];



///LOCAL REDUCER
const init: Questionresponse[] = [];

const reducer = (state: Questionresponse[] = init, action: Action) => {
    
    switch (action.type) {
        case 'add': return reviewAndUpdate(state, action.payload);
        case 'remove': return removeByName(state, action.payload);
        default: throw new Error('Unexpected action');
    }
};

const reviewAndUpdate = (state: Questionresponse[], payload: Questionresponse) => {
    const found = state.findIndex(item => ((item.name === payload.name) && (item.question === payload.question)));
    if (found > -1) {
        const items = [...state];
        items.splice(found, 1);
        return [...items, payload]
    } else {
        return [...state, payload]
    }
}

const removeByName=(state: Questionresponse[], payload: Questionresponse) => {
   const items =[...state];
   return items.filter(item => item.name !== payload.name);;
}



/// MAIN COMPONENT



const CandidateForm: FC = () => {


    const candidates: Array<Candidate> = data.candidates;
    const [selected, setSelected] = useState<Array<Candidate>>([]);
    const [state, dispatch] = useReducer(reducer, init);


    //Applicant choosing
    const onFilterApplicant = (values: Array<string>) => {
        const payload: Array<Candidate> = values.map((item) => {
            const found = candidates.findIndex(candidate => candidate.name === item);
            return candidates[found];
        });

        setSelected(payload);


    };




    const onDeselect = (value: string) => {
        const payload =  { question: '', name: value, answer: '' }
        dispatch({ type: 'remove', payload});

    }




    const onLikertChange = (value: Questionresponse) => {
        dispatch({ type: 'add', payload: value });
    }




    return (
        <>
            <h1>Candidates Form</h1>

            <InputSelectMultiple
                onChange={onFilterApplicant}
                onDeselect={onDeselect}
                candidates={candidates}
            />
            <InputLikert
                candidates={selected}
                questions={likertQuestions}
                answers={likertAnswers}
                onLikertChange={onLikertChange}
            />

            <JSONTreeComponent data={state} />

        </>
    )
};






export default CandidateForm;