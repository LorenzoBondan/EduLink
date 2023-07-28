import { User } from 'types';
import './styles.css';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { BsEnvelopePlus } from 'react-icons/bs';
import { hasAnyRoles } from 'util/auth';
import { Link } from 'react-router-dom';

type Props = {
    teacherId: number;
}

const TeacherCard = ({teacherId}: Props) => {

    const [teacher, setTeacher] = useState<User>();

    const getTeacher = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${teacherId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setTeacher(response.data);
          })
    }, [teacherId])

    useEffect(() => {
        getTeacher();
    }, [getTeacher]);

    return(
        <div className='teacher-card-container'>
            <div className='teacher-card-first-container'>
                <img src={teacher?.imgUrl} alt="" />
                <h4>{teacher?.name}</h4>
            </div>
            {hasAnyRoles(['ROLE_PARENT', 'ROLE_ADMIN']) && 
                <div className='teacher-card-second-container'>
                    <Link to={`/messages/${teacher?.id}`}>
                        <BsEnvelopePlus/>
                    </Link>
                </div>
            }
        </div>
    );
}

export default TeacherCard;