import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import ChatCard from './ChatCard';
import { Link } from 'react-router-dom';

const Chats = () => {

    const [user, setUser] = useState<User | null>(null);

    const getUser = useCallback(async () => {
      try {
        const email = getTokenData()?.user_name;
  
        if (email) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/email/${email}`,
            withCredentials: true,
          };
  
          const response = await requestBackend(params);
          setUser(response.data);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }, []);
  
    useEffect(() => {
      getUser();
    }, [getUser]);

    const allMessages = user && [...user?.messagesSent, ...user?.messagesReceived];

    const uniqueAuthorsSet = new Set<number>();

    allMessages && allMessages.forEach((message) => {
        if (message.senderId !== user.id) {
            uniqueAuthorsSet.add(message.senderId);
        }
    });

    const uniqueAuthorsIds: number[] = Array.from(uniqueAuthorsSet);

    return(
        <div className="chats-container">
            <div className='my-chats-container base-card'>
                <h1>Messages</h1>
                {uniqueAuthorsIds.map(id => (
                    <Link to={`/messages/${id}`} key={id}>
                        <ChatCard userId={id} key={id}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Chats;