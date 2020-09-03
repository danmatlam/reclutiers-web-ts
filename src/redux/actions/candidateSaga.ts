import { call, put } from "redux-saga/effects";
import axios from "axios";


import { Candidate, Candidates, saveCandidateType } from '../reducers/candidateReducer'

const saveCandidate = (payload: Candidate[]) => {

    const aux = {
        candidates:payload
    }

    return axios.post('http://localhost:3001/api/candidates/push', JSON.stringify(aux));
};


export function* saveCandidateSaga(action: saveCandidateType) {
    try {
        const fetch = yield call(saveCandidate, action.payload);

        if (fetch.status === 200) yield put({ type: "SAVE_APPLICATION_SUCCESS", payload: action.payload });
        else throw new Error(`Sorry! we couldn't finish the request, try again later`)
    }
    catch (error) {
        console.log(error)
        yield put({ type: "SAVE_APPLICATION_ERROR", error:error });
    }
}

