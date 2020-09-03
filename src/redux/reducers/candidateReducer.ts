import { flush } from "redux-saga/effects"

///interfaces
export interface Candidate {
    answer: string;
    name: string;
    question: string
}
export interface Candidates {
    candidates: Candidate[],
    loading: boolean,
    error: boolean,
}

export type saveCandidateType = { type: string, payload: Candidate[] }


const init: Candidates = {
    candidates: [],
    loading: false,
    error: false,
}
/// REDUCER
export default (state: Candidates = init, action: saveCandidateType) => {

    switch (action.type) {
        case "SAVE_APPLICATION": {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case "SAVE_APPLICATION_SUCCESS": {
            return {
                ...state,
                loading: false,
                candidates: [...state.candidates, ...action.payload]
            }
        }
        case "SAVE_APPLICATION_ERROR": {
            return {
                ...state,
                loading: true,
                errror:true
            }
        }

        default: return state

    }

}

