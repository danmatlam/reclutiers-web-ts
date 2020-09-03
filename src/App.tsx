import React, { FC, useState } from 'react';
import CandidateForm from './components/candidates/CandidateForm';
import ReduxProvider from './redux/ReduxProvider';

import Pusher from 'pusher-js';
import JSONTreeComponent from 'react-json-tree';



const App: FC = () => {

    const pusher = new Pusher('3b49318cc8a294ab90cd', { cluster: 'us2' });
    const channel = pusher.subscribe('my-channel');

    const [message, setMessage] = useState({})
    channel.bind('my-event', function (data: string) {
        const payload = data
        debugger
        setMessage(payload)
    });


    return (
        <ReduxProvider>
            <CandidateForm />
        </ReduxProvider>
    )
};

export default App;