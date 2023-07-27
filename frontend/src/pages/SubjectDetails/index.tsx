import { useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { SpringPage, Subject, Test, User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentText, HiOutlineEnvelope } from 'react-icons/hi2';
import TeacherCard from './TeacherCard';
import { Nav, Tab } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import { getTokenData, hasAnyRoles } from 'util/auth';
import TestRow from './TestRow';
import NoteCard from './NoteCard';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from 'react-modal';
import AddNote from 'components/AddNote';

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
        if (hasAnyRoles(['ROLE_PARENT'])) {
            const params = {
                method: "GET",
                url: `/tests/subject/${subjectId}/children`,
                withCredentials: true
            };
            requestBackend(params)
                .then(response => {
                    setTests(response.data);
                });
        }
    
        if (hasAnyRoles(['ROLE_STUDENT'])) {
            const params = {
                method: "GET",
                url: `/tests/subject/${subjectId}`,
                withCredentials: true
            };
            requestBackend(params)
                .then(response => {
                    setTests(response.data);
                });
        }
    }, [subjectId]);
    
    useEffect(() => {
        getTests();
    }, [getTests]);

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

    const amITheTeacher = () => {
        if(user?.id === subject?.teacherId){
            return true;
        }
        else{
            return false;
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
        getSubject();
    }

    return(
        <div className="subject-details-container">
            <div className='subject-details-first-container base-card'>
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
                        <p>{subject?.notes.length}</p>
                    </div>
                </div>
                <h3>Teacher</h3>
                {subject && <TeacherCard teacherId={subject?.teacherId} key={subjectId}/>}
            </div>
            <div className='subject-details-second-container base-card'>
                <Tab.Container id="subjects-tabs" defaultActiveKey="notes">
                    <Nav variant="pills" className="nav-pills mb-2 mt-2" id="pills-tab">
                        <Nav.Item>
                            <Nav.Link eventKey="notes"><BiCommentDetail/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tests"><HiOutlineDocumentText/></Nav.Link>
                        </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className='heigth-100'>
                    <Tab.Pane eventKey="notes" className='heigth-100'>
                      <div className='subject-posts-row'>
                        {(amITheTeacher() || hasAnyRoles(['ROLE_ADMIN'])) && (
                            <div className='subject-posts-button-container'>
                                <button className='btn btn-primary' onClick={openModal}><AiOutlinePlus/> Add Note</button>
                                <Modal 
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Example Modal"
                                    overlayClassName="modal-overlay"
                                    className="modal-content"
                                >
                                {user && <AddNote onCancel={closeModal} subjectId={parseInt(subjectId)} userId={user?.id}/>}
                                </Modal>
                            </div>
                        )}
                        {user && subject?.notes.map(note => (
                            <NoteCard note={note} userLogged={user} onDeleteOrEdit={getSubject} key={note.id}/>
                        ))}
                      </div>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="tests" className='heigth-100'>
                        <div className='subject-posts-row'>
                            <table className='tests-table'>
                                <thead>
                                    <tr>
                                        {hasAnyRoles(['ROLE_PARENT', 'ROLE_STUDENT']) && (
                                            <>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th style={{textAlign:"center"}}>Score</th>
                                            <th style={{textAlign:"center"}}>Points</th>
                                            <th style={{textAlign:"center"}}>Class Max Score</th>
                                            <th style={{textAlign:"center"}}>Class Min Score</th>
                                            <th style={{textAlign:"center"}}>Class Average Score</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* STUDENT */}
                                    {hasAnyRoles(['ROLE_STUDENT']) && (
                                        subject && tests?.content.map(test => (
                                            <TestRow test={test} subjectId={parseInt(subjectId)}/>
                                        ))
                                    )}
                                    {/* PARENT */}
                                    {hasAnyRoles(['ROLE_PARENT']) && (
                                        subject && tests?.content.map(test => (
                                            <TestRow test={test} subjectId={parseInt(subjectId)}/>
                                        ))
                                    )}
                                    {/* PARENT */}
                                    {hasAnyRoles(['ROLE_TEACHER']) && (
                                        subject?.tests.map(test => (
                                            <div>
                                                <h1>{test.name}</h1>
                                                <h5>{test.score}</h5>
                                                {test.studentsId.map(studentId => (
                                                    <p>{studentId}</p>
                                                ))}
                                            </div>
                                            
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                    
                   </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default SubjectDetails;