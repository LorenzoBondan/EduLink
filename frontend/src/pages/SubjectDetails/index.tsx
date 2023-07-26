import { useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { SpringPage, Subject, Test } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentText, HiOutlineEnvelope } from 'react-icons/hi2';
import TeacherCard from './TeacherCard';
import { Nav, Tab } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import { hasAnyRoles } from 'util/auth';
import TestRow from './TestRow';

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
                        <p>{tests?.totalElements}</p>
                    </div>
                    <div className='subject-info-item'>
                        <HiOutlineEnvelope/>
                        <p>0</p>
                    </div>
                </div>
                <h3>Teacher</h3>
                {subject && <TeacherCard teacherId={subject?.teacherId} key={subjectId}/>}
            </div>
            <div className='subject-details-second-container'>
                <Tab.Container id="subjects-tabs" defaultActiveKey="posts">
                    <Nav variant="pills" className="nav-pills mb-2 mt-2" id="pills-tab">
                        <Nav.Item>
                            <Nav.Link eventKey="posts"><BiCommentDetail/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tests"><HiOutlineDocumentText/></Nav.Link>
                        </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className='heigth-100'>
                    <Tab.Pane eventKey="posts" className='heigth-100'>
                      <div className='subject-posts-row'>
                        
                      </div>
                    </Tab.Pane>
                    {/* STUDENT */}
                    {hasAnyRoles(['ROLE_STUDENT']) && 
                        <Tab.Pane eventKey="tests" className='heigth-100'>
                            <div className='subject-posts-row'>
                                <table className='tests-table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th style={{textAlign:"center"}}>Score</th>
                                            <th style={{textAlign:"center"}}>Points</th>
                                            <th style={{textAlign:"center"}}>Class Max Score</th>
                                            <th style={{textAlign:"center"}}>Class Min Score</th>
                                            <th style={{textAlign:"center"}}>Class Average Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subject && tests?.content.map(test => (
                                            <TestRow test={test} subjectId={parseInt(subjectId)} subjectName={subject.name}/>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                    }
                   </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default SubjectDetails;