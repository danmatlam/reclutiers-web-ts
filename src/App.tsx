import React, { FC, useState } from 'react';
import CandidateForm from './components/candidates/CandidateForm';
import ReduxProvider from './redux/ReduxProvider';

import Pusher from 'pusher-js';



const App: FC = () => {

    const pusher = new Pusher('3b49318cc8a294ab90cd', { cluster: 'us2' });
    const channel = pusher.subscribe('my-channel');

    const [message, setMessage] = useState('')
    channel.bind('my-event', function (data: React.SetStateAction<string>) {
        setMessage(JSON.stringify(data))
    });


    return (
        <ReduxProvider>
            <CandidateForm />
            <p>{message}</p>
        </ReduxProvider>
    )
};

export default App;