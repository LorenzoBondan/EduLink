import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { User } from 'types';

type UrlParams = {
    currentUserId: string;
    receiverUserId: string;
}

const Messages = () => {

    const { currentUserId } = useParams<UrlParams>();

    const { receiverUserId } = useParams<UrlParams>();

    const [currentUser, setCurrentUser] = useState<User>();

    const [receiverUser, setReceiverUser] = useState<User>();

    const getCurrentUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${currentUserId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setCurrentUser(response.data);
          })
    }, [currentUserId])

    const getReceiverUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${receiverUserId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setReceiverUser(response.data);
          })
    }, [receiverUserId])

    useEffect(() => {
        getCurrentUser();
        getReceiverUser();
    }, [getCurrentUser, getReceiverUser]);

    return(
        <div className="messages-container">

        </div>
    );
}

export default Messages;