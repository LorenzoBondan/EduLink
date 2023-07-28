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

    return(
        <div className='chat-card-container base-card'>
            <img src={user?.imgUrl} alt="" />
            <h3>{user?.name}</h3>
        </div>
    );
}

export default ChatCard;