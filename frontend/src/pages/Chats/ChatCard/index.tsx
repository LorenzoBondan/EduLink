import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { Message, User } from 'types';
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

    const [lastMessage, setLastMessage] = useState<Message[]>();

    const getLastMessage = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/messages/${userId}/lastMessage`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setLastMessage(response.data);
            console.log(response.data);
          })
    }, [userId])

    useEffect(() => {
      getLastMessage();
    }, [getLastMessage]);

    return(
        <div className='chat-card-container'>
            <div className='chat-card-first-container'>
                <img src={user?.imgUrl} alt="" />
                <h3>{user?.name}</h3>
                {user?.roles.map(role => (
                  <p className='user-role-badge' key={role.id}>{role.authority.substring(5)}</p>
                ))}
                {lastMessage && lastMessage?.map(message => (
                  <h4>{message.text}</h4>
                ))}
            </div>
            {unreadMessages && unreadMessages > 0 && 
                <div className='chat-card-second-container'>
                    <p className='unread-messages-badge'>{unreadMessages}</p>
                </div>
            }
        </div>
    );
}

export default ChatCard;