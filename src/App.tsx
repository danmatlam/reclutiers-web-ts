import React, { FC } from 'react';
import CandidateForm from './components/candidates/CandidateForm';
import ReduxWrap from './redux/ReduxWrap';

const App: FC = () => (
    <ReduxWrap>
        <CandidateForm />
    </ReduxWrap>
);

export default App;