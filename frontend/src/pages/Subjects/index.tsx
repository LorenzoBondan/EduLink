import { User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData, hasAnyRoles } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

const Subjects = () => {

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

    return(
        <div className='subjects-container'>
            <div className='subjects-canva-container'>
                {/* STUDENT */}
                {hasAnyRoles(['ROLE_STUDENT']) && (
                    <div className='subject-card'>
                        <div className='row'>
                            {user?.subjectsSubscribedId.map(subjectId => (
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3 recipes-column">
                                    <p>{subjectId}</p>
                                </div> 
                            ))}
                        </div>
                    </div>
                )}
                {/* PARENT */}
                {hasAnyRoles(['ROLE_PARENT']) && (
                    <div className='subject-card'>
                        <div className='row'>
                            {user?.childrenId.map(childrenId => (
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3 recipes-column">
                                    <p>{childrenId}</p>
                                </div> 
                            ))}
                        </div>
                    </div>
                )}
                {/* TEACHER */}
                {hasAnyRoles(['ROLE_TEACHER']) && (
                    <div className='subject-card'>
                        <div className='row'>
                            {user?.subjectsTaughtId.map(subjectId => (
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3 recipes-column">
                                    <p>{subjectId}</p>
                                </div> 
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Subjects;