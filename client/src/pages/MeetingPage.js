import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WeeklyBook from '../components/WeeklyBook'; 
import MonthlyBook from '../components/MonthlyBook';
import SingleBook from '../components/SingleBook'; 

function MeetingPage() {
    const { meetingId } = useParams(); 
    const [meetingData, setMeetingData] = useState(null);
    const [error, setError] = useState(null);
    const [hostInfo, setHostInfo] = useState({
        firstName: '',
        lastName: ''
    });

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/meetings/${meetingId}`);
                const meeting = response.data;
                setMeetingData(meeting);
                const hostResponse = await axios.get(`http://localhost:5001/api/user-info/${meeting.hostId}`);
                setHostInfo(hostResponse.data);
            } catch (error) {
                console.error('Error fetching meeting data or host info:', error);
                setError('Unable to load meeting or host details.');
            }
        };

        fetchMeetingData();
    }, [meetingId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!meetingData) {
        return <div>Loading...</div>;
    }

    if (meetingData.type === 'weekly') {
        return <WeeklyBook meetingData={meetingData} hostInfo={hostInfo} />;
    } else if (meetingData.type === 'monthly') {
        return <MonthlyBook meetingData={meetingData} hostInfo={hostInfo} />;
    } else {
        return <SingleBook meetingData={meetingData} hostInfo={hostInfo} />;
    }
}

export default MeetingPage;
