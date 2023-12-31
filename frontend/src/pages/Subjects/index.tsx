import { User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData, hasAnyRoles } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import SubjectCard from './SubjectCard';
import { Link } from 'react-router-dom';
import ChildrenCard from './ChildrenCard';

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
                    <div className='col-lg-4'>
                        <div className='subject-card base-card'>
                            <h4>Your Subjects</h4>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    {user?.subjectsSubscribedId.slice(0, Math.ceil(user.subjectsSubscribedId.length / 2)).map(subjectId => (
                                        <Link to={`/subjects/${subjectId}`}>
                                            <SubjectCard subjectId={subjectId} key={subjectId} />
                                        </Link>
                                    ))}
                                </div>
                                <div className='col-lg-6'>
                                    {user?.subjectsSubscribedId.slice(Math.ceil(user.subjectsSubscribedId.length / 2)).map(subjectId => (
                                        <Link to={`/subjects/${subjectId}`}>
                                            <SubjectCard subjectId={subjectId} key={subjectId} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* PARENT */}
                {hasAnyRoles(['ROLE_PARENT']) && (
                    <div className='col-lg-4'>
                        <div className='subject-card base-card' style={{margin:"0 15px"}}>
                            <h4>Your Children's Subjects</h4>
                            <div className='row'>
                                {user?.childrenId.map(childrenId => (
                                    <ChildrenCard childrenId={childrenId} key={childrenId} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* TEACHER */}
                {hasAnyRoles(['ROLE_TEACHER']) && (
                    <div className='col-lg-4'>
                        <div className='subject-card base-card'>
                            <h4>Your Taught Subjects</h4>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    {user?.subjectsTaughtId.slice(0, Math.ceil(user.subjectsTaughtId.length / 2)).map(subjectId => (
                                        <Link to={`/subjects/${subjectId}`}>
                                            <SubjectCard subjectId={subjectId} key={subjectId} />
                                        </Link>
                                    ))}
                                </div>
                                <div className='col-lg-6'>
                                    {user?.subjectsTaughtId.slice(Math.ceil(user.subjectsTaughtId.length / 2)).map(subjectId => (
                                        <Link to={`/subjects/${subjectId}`}>
                                            <SubjectCard subjectId={subjectId} key={subjectId} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Subjects;