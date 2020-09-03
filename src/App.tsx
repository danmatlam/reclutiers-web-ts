import React, { FC } from 'react';
import CandidateForm from './components/candidates/CandidateForm';
import ReduxProvider from './redux/ReduxProvider';

const App: FC = () => (
    <ReduxProvider>
        <CandidateForm />
    </ReduxProvider>
);

export default App;