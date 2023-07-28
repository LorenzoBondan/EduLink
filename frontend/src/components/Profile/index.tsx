import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
    onCloseOrSubmit: Function;
}

const Profile = ({onCloseOrSubmit} : Props) => {

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

    const [userFormIsOpen, setUserFormIsOpen] = useState(false);

    function openUserForm(){
        if(userFormIsOpen){
            setUserFormIsOpen(false);
        }
        else{
            setUserFormIsOpen(true);
        }
    }
  
    const { register: registerUser, handleSubmit: handleSubmitUser, setValue } = useForm<User>();
  
    useEffect(() => {
      if(user){
        requestBackend({url:`/users/${user?.id}`, withCredentials:true})
          .then((response) => {
              const user = response.data as User;
  
              setValue('name', user.name);
              setValue('imgUrl', user.imgUrl);
              setValue('password', user.password);
              setValue('email', user.email);
              setValue('childrenId', user.childrenId);
              setValue('messagesReceived', user.messagesReceived);
              setValue('messagesSent', user.messagesSent);
              setValue('notes', user.notes);
              setValue('parentsId', user.parentsId);
              setValue('subjectsSubscribedId', user.subjectsSubscribedId);
              setValue('subjectsTaughtId', user.subjectsTaughtId);
              setValue('userTests', user.userTests);
              setValue('notifications', user.notifications);
              setValue('roles', user.roles);
        })  
      }
    }, [user, setValue]);
  
    const onSubmitUser = (formData : User) => {
      const params : AxiosRequestConfig = {
          method:"PUT",
          url : `/users/${user?.id}`,
          data: formData,
          withCredentials: true
      };
  
      requestBackend(params)
          .then(response => {
              toast.info("Image updated!");
              getUser();
              onCloseOrSubmit();
          })
    };

    return(
            <div className='profile-card'>
                <div className='profile-card-first-container'>
                    <div className='profile-card-image-container'>
                        <img src={user?.imgUrl} alt="" />
                    </div>
                    <div className='profile-card-user-info'>
                        <h3>{user?.name}</h3>
                        {user?.roles.map(role => (
                            <p>{role.authority.substring(5)}</p>
                        ))}
                    </div>
                </div>
                <div className='profile-card-second-container'>
                    <div className='edit-profile-container'>
                        <button onClick={openUserForm} className='btn btn-primary text-white'>Edit Profile</button>
                    </div>
                    {userFormIsOpen && 
                        <form onSubmit={handleSubmitUser(onSubmitUser)} className="edit-profile-form">
                            <label htmlFor="">Img Url</label>
                            <input 
                                {...registerUser("imgUrl", {
                                    required: 'Required field',
                                    pattern: { 
                                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                    message: 'Insira uma URL válida'
                                    }
                                })}
                                type="text"
                                className={`form-control text-dark base-input`}
                                placeholder="URL of user's image"
                                name="imgUrl"
                            />
                            <button className="btn btn-primary text-white">Submit</button>
                        </form>
                    }
                </div>
            </div>
    );
}

export default Profile;