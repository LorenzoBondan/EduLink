import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    userId: number;
}

const ChatCard = ({userId} : Props) => {

    const [user, setUser] = useState<User>(); 

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${userId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUser(response.data);
          })
    }, [userId])

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [unreadMessages, setUnreadMessages] = useState<number>();

    const getUnreadMessages = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/messages/${userId}/unread`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUnreadMessages(response.data);
          })
    }, [userId])

    useEffect(() => {
        getUnreadMessages();
    }, [getUnreadMessages]);

    return(
        <div className='chat-card-container'>
            <div className='chat-card-first-container'>
                <img src={user?.imgUrl} alt="" />
                <h3>{user?.name}</h3>
            </div>
            <div className='chat-card-second-container'>
                <p className='unread-messages-badge'>{unreadMessages}</p>
            </div>
        </div>
    );
}

export default ChatCard;