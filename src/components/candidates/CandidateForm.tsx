import React, { FC, useState, useReducer } from 'react';
import InputSelectMultiple from './InputSelectMultiple';
import { useDispatch, useSelector } from "react-redux";
import data from './candidates.json';
import InputLikert from './InputLikert';
import JSONTreeComponent from 'react-json-tree';
import { PageHeader, Button } from 'antd';

// INTERFACES
import { Questionresponse } from './InputLikert';


interface Action {
    type: String,
    payload: Questionresponse
}


// MOCK DATA
const likertAnswers: Array<String> = [
    'Poor',
    'Bad',
    'neutral',
    'fine',
    'Excellent'
];

const likertQuestions: Array<String> = [
    'Frontend Skills',
    'Leadership',
    'Motivated with company visison',
  
];



/// MAIN COMPONENT

const CandidateForm: FC = () => {


    const candidates: Array<string> = data.candidates;
    const [selected, setSelected] = useState<Array<string>>([]);
    const [state, dispatch] = useReducer(reducer, init);
    const globalDispatch = useDispatch();


    //CHOSING APPLICANT
    const onFilterApplicant = (values: Array<string>) => {
        const payload: Array<string> = values.map((item) => {
            const found = candidates.findIndex(candidate => candidate === item);
            return candidates[found];
        });
        setSelected(payload);
    };
    //REMOVING APPLICANT
    const onDeselect = (value: string) => {
        const payload = { question: '', name: value, answer: '' }
        dispatch({ type: 'remove', payload });
    }
    //RATING APPLICANT
    const onLikertChange = (value: Questionresponse) => {
        dispatch({ type: 'add', payload: value });
    }


    const lock = (state.length >= 3)
        ? ((state.length % 3 === 0) ? false : true)
        : true

    // SUBMITTING
    const onFinish=()=>{


        const payload = [...state];

        globalDispatch({ type: "SAVE_APPLICATION", payload });

    }



    return (
        <>

            <PageHeader
                className="site-page-header"
                title="Reclutier App"
                extra={
                    <Button 
                    onClick={onFinish}
                    type="primary" disabled={lock} style={{ borderRadius: '6pt' }}>
                        Guardar
                    </Button>
                }
            />,

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




///LOCAL REDUCER FOR HANBLDING DINAMYC FORM
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
const removeByName = (state: Questionresponse[], payload: Questionresponse) => {
    const items = [...state];
    return items.filter(item => item.name !== payload.name);;
}

