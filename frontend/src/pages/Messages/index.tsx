import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Message, SpringPage, User } from 'types';
import { getTokenData } from 'util/auth';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';

type UrlParams = {
    receiverUserId: string;
}

const Messages = () => {

    const { receiverUserId } = useParams<UrlParams>();

    const [receiverUser, setReceiverUser] = useState<User>();

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const getCurrentUser = useCallback(async () => {
      try {
        const email = getTokenData()?.user_name;
  
        if (email) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/email/${email}`,
            withCredentials: true,
          };
  
          const response = await requestBackend(params);
          setCurrentUser(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }, []);

    const getReceiverUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${receiverUserId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setReceiverUser(response.data);
            console.log(response.data);
          })
    }, [receiverUserId])

    const [messages, setMessages] = useState<SpringPage<Message>>();

    const getMessages = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/messages/${receiverUserId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setMessages(response.data);
            console.log(response.data);
          })
    }, [receiverUserId])

    useEffect(() => {
        getCurrentUser();
        getReceiverUser();
        getMessages();
    }, [getCurrentUser, getReceiverUser, getMessages]);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Message>();

    const onSubmit = async (formData: Message) => {
      if (currentUser) {
        formData.senderId = currentUser.id;
        formData.receiverId = parseInt(receiverUserId);

        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() - 3);
        formData.moment = dateNow.toISOString();
  
        try {
          const params: AxiosRequestConfig = {
            method: "POST",
            url: "/messages",
            data: formData,
            withCredentials: true,
          };
          await requestBackend(params);
        } catch (error) {
          console.log("Error: " + error);
        } 
        finally{
          getMessages();
          setValue('text', '');
        }
      }
    };

    return(
        <div className="messages-container">
            <div className='messages-card'>
                <div className='message-card-top-container'>
                    <img src={receiverUser?.imgUrl} alt="" />
                    <h5>{receiverUser?.name}</h5>
                    {receiverUser?.roles.map(role => (
                        <p className='user-role-badge'>{role.authority.substring(5)}</p>
                    ))}
                </div>
                <div className='message-card-content-container'>
                    <div className='message-card-messages-container'>
                        
                    </div>
                    <div className='message-card-input-container'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                              {...register("text", {
                                required: "Required field",
                              })}
                              type="text"
                              className={`form-control base-input ${
                                errors.text ? "is-invalid" : ""
                              }`}
                              placeholder="Message"
                              name="text"
                            />
                            <AiOutlineSend onClick={handleSubmit(onSubmit)}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;