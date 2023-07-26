import { useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { SpringPage, Subject, Test, User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentText, HiOutlineEnvelope } from 'react-icons/hi2';

type UrlParams = {
    subjectId: string;
}

const SubjectDetails = () => {

    const { subjectId } = useParams<UrlParams>();

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

    const [tests, setTests] = useState<SpringPage<Test>>();

    const getTests = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/subject/${subjectId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setTests(response.data);
          })
    }, [subjectId])

    useEffect(() => {
        getTests();
    }, [getTests]);

    return(
        <div className="subject-details-container">
            <div className='subject-details-first-container'>
                <img src={subject?.imgUrl} alt="" />
                <h1>{subject?.name}</h1>
                <h5>{subject?.team}</h5>
                <div className='subject-info'>
                    <div className='subject-info-item'>
                        <FaUsers/>
                        <p>{subject?.students.length}</p>
                    </div>
                    <div className='subject-info-item'>
                        <HiOutlineDocumentText/>
                        <p>{subject?.tests.length}</p>
                    </div>
                    <div className='subject-info-item'>
                        <HiOutlineEnvelope/>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div className='subject-details-second-container'>

            </div>
        </div>
    );
}

export default SubjectDetails;