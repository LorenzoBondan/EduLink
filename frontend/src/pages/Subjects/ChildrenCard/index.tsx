import { User } from 'types';
import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Link } from 'react-router-dom';
import SubjectCard from '../SubjectCard';

type Props = {
    childrenId: number;
}

const ChildrenCard = ({childrenId} : Props) => {
    
    const [children, setChildren] = useState<User>();

    const getChildren = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${childrenId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setChildren(response.data);
          })
    }, [childrenId])

    useEffect(() => {
        getChildren();
    }, [getChildren]);

    return(
        <div className='children-card-container'>
            <h4>{children?.name}</h4>
            <div className='row'>
                <div className='col-lg-6'>
                    {children?.subjectsSubscribedId.slice(0, Math.ceil(children.subjectsSubscribedId.length / 2)).map(subjectId => (
                        <Link to={`/subjects/${subjectId}`}>
                            <SubjectCard subjectId={subjectId} key={subjectId} />
                        </Link>
                    ))}
                </div>
                <div className='col-lg-6'>
                    {children?.subjectsSubscribedId.slice(Math.ceil(children.subjectsSubscribedId.length / 2)).map(subjectId => (
                        <Link to={`/subjects/${subjectId}`}>
                            <SubjectCard subjectId={subjectId} key={subjectId} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChildrenCard;