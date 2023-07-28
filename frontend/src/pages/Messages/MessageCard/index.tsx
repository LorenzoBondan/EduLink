import { Message, User } from 'types';
import './styles.css';
import { convertDateTime } from 'helpers';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useCallback, useEffect, useState } from 'react';
import { BsCheck2All, BsChevronDown, BsChevronUp } from 'react-icons/bs';

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

    const iAmTheAuthor = useCallback(() => {
        if(message.senderId === user?.id){
            return true;
        }
        else{
            return false;
        }
    }, [message.senderId, user])

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

    const updateReadStatus = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/messages/${message.id}/read`,
          withCredentials:true
        }
        try{
        requestBackend(params) 
          .then(response => {
            onDelete();
          })
        }
        catch(error){
            console.log(error);
        }
    }, [message.id, onDelete])

    // read the message
    useEffect(() => {
        if(user){
            if(!iAmTheAuthor() && !message.read){
                updateReadStatus();
            }
        }
    }, [user, iAmTheAuthor, message, updateReadStatus]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    return(
        <div className={iAmTheAuthor() ? "message-card-container" : "message-card-container-author"}>
            <div className='message-card-top-container'>
                {iAmTheAuthor() && 
                    <div className="options-menu">
                        <div className="menu-arrow" onClick={toggleMenu}>
                            <i>{isMenuOpen ? <BsChevronUp/> : <BsChevronDown/>}</i>
                        </div>
                        {isMenuOpen && (
                            <div className="menu-items">
                                <div className="menu-item" onClick={() => handleDeleteMessage()}>Delete</div>
                            </div>
                        )}
                  </div>
                }
            </div>
            <div className='message-card-content'>
                <p>{message.text}</p>
                <div className='message-card-author-bottom'>
                    <p>{convertDateTime(message.moment)}</p> 
                    {iAmTheAuthor() && (
                        message.read ? <BsCheck2All style={{ color: '#0D7DF0' }} /> : <BsCheck2All style={{ color: '#ACB5A0' }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessageCard;