import { Message, User } from 'types';
import './styles.css';
import { convertDateTime } from 'helpers';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useCallback, useEffect, useState } from 'react';
import { BsCheck2All, BsFillTrash3Fill } from 'react-icons/bs';

type Props = {
  message: Message;
  onDelete: Function;
}

const MessageCard = ({message, onDelete} : Props) => {

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

    const iAmTheAuthor = () => {
        if(message.senderId === user?.id){
            return true;
        }
        else{
            return false;
        }
    }

    const handleDeleteMessage = useCallback(() => {
        if(!window.confirm(`Are you sure that you want to delete this message?`)){
            return;
        }
        const params : AxiosRequestConfig = {
            method:"DELETE",
            url: `/messages/${message.id}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                onDelete();
        })
    }, [message.id ,onDelete]);

    const [senderUser, setSenderUser] = useState<User>();

    const getSenderUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${message.senderId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setSenderUser(response.data);
          })
    }, [message])

    useEffect(() => {
        getSenderUser();
      }, [getSenderUser]);
    
    return(
        <div className={iAmTheAuthor() ? "message-card-container" : "message-card-container-author"}>
            <div className='message-card-top-container'>
                <div className='message-card-image'>
                    <img src={senderUser?.imgUrl} alt="" /> 
                </div>
                <div className='message-card-author'>
                    <div className='message-card-author-content'>
                        <h6>{senderUser?.name}</h6>
                        <div className='message-card-author-bottom'>
                            <p>{convertDateTime(message.moment)}</p>
                        </div>
                    </div>
                    {iAmTheAuthor() && 
                        <div className='message-card-buttons'>
                            <BsFillTrash3Fill onClick={() => handleDeleteMessage()}/>
                        </div>
                    }
                </div>
            </div>
            <div className='message-card-content'>
                <p>{message.text}</p>
                {iAmTheAuthor() && (message.read ? <BsCheck2All style={{color:"green"}}/> : <BsCheck2All style={{color:"gray"}}/>)}
            </div>
        </div>
    );
}

export default MessageCard;