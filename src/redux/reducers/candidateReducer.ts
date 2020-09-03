///interfaces
export interface Candidate {
    name: string,
    questions: string[],
    answers: string[],
    geo: string
}
export interface Candidates {
    candidates: Candidate[]
}

/// types

export type saveCandidateType = { type: "ADD_CANDIDATE", payload: Candidate }


const init: Candidates = {
    candidates: []
}
/// REDUCER
export default  (state: Candidates = init, action: saveCandidateType) => {

    switch (action.type) {
        case "ADD_CANDIDATE": {
            return {
                ...state,
                candidates: [...state.candidates, action.payload]
            }
        }
        default: return state

    }

}

