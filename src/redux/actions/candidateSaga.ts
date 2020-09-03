import { call, put } from "redux-saga/effects";
import axios from "axios";


import { Candidate, Candidates, saveCandidateType } from '../reducers/candidateReducer'

const saveCandidate = (payload: Candidate) => {
    return axios.post('/api', payload);
};


export function* saveCandidateSaga(action:saveCandidateType) {
    try {
        // const fetch = yield call(saveCandidate, action.payload);
        yield put({type: "ADD_CANDIDATE_SUCCESS", candidate:fetch});
    }
    catch {
        yield put({type: "ADD_CANDIDATE_ERROR"});
    }
}

