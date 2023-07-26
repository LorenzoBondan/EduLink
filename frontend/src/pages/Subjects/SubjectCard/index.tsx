import { Subject } from 'types';
import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentText, HiOutlineEnvelope } from 'react-icons/hi2';

type Props = {
    subjectId: number;
}

const SubjectCard = ({subjectId} : Props) => {

    const [subject, setSubject] = useState<Subject>();

    const getSubject = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/subjects/${subjectId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setSubject(response.data);
          })
    }, [subjectId])

    useEffect(() => {
        getSubject();
    }, [getSubject]);


    return(
        <div className='subject-card-container'>
            <div className='subject-card-top-container'>
                <img src={subject?.imgUrl} alt="" />
            </div>
            <div className='subject-card-bottom-container'>
                <h5>{subject?.name}</h5>
                <p>{subject?.team} - {subject?.name}</p>
            </div>
            <div className='subject-card-buttons-container'>
                <div className='subject-card-button'>
                    <FaUsers/>
                    <p>{subject?.students.length}</p>
                </div>
                <div className='subject-card-button'>
                    <HiOutlineDocumentText/>
                    <p>{subject?.tests.length}</p>
                </div>
                <div className='subject-card-button'>
                    <HiOutlineEnvelope/>
                    <p>0</p>
                </div>
            </div>
        </div>
    );
}

export default SubjectCard;