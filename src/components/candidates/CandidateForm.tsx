import React, { FC, useState } from 'react';
import InputSelectMultiple from './InputSelectMultiple';

import data from './candidates.json';

import InputLikert, { questionResponse } from './InputLikert';


// interfaces
export interface Candidate {
    name: string,
    photoUrl: string
}

// Mock helperr
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


const CandidateForm: FC = () => {


    const candidates: Array<Candidate> = data.candidates;
    const [selected, setSelected] = useState<Array<Candidate>>([]);

    const onApplicantSelect = (values: Array<string>) => {
        const payload: Array<Candidate> = values.map((item) => {
            const found = candidates.findIndex(candidate => candidate.name === item);
            return candidates[found];
        });
        setSelected(payload);
    };


    const onLikertChange = (value:questionResponse) => {
        console.log(value)

    }



    return (
        <>
            <h1>Candidates Form</h1>

            <InputSelectMultiple
                onChange={onApplicantSelect}
                candidates={candidates}
            />
            <InputLikert
                candidates={selected}
                questions={likertQuestions}
                answers={likertAnswers}
                onLikertChange={onLikertChange}
            />

        </>
    )
};






export default CandidateForm;