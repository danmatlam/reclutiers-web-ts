import React, { FC, useState, useReducer } from 'react';
import InputSelectMultiple from './InputSelectMultiple';

import data from './candidates.json';

import JSONTree from 'react-json-tree';
import InputLikert from './InputLikert';

export interface Candidate {
    name: string,
    photoUrl: string
}


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



    return (
        <>
            <h1>Candidates Form</h1>

            <InputSelectMultiple
                onChange={onApplicantSelect}
                candidates={candidates}
            />
        <InputLikert/>


            <JSONTree data={selected}/>
        </>
    )
};






export default CandidateForm;