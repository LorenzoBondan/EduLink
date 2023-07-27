import { SpringPage, Test, User } from 'types';
import { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { FaTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
    student: User;
    subjectId: number;
    onDeleteOrEdit:Function;
}

const TestCard = ({student, subjectId, onDeleteOrEdit}: Props) => {

    const [tests, setTests] = useState<SpringPage<Test>>();

    const getTests = useCallback(() => {

        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/subject/${subjectId}/teacher/${student.id}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setTests(response.data);
          })
    }, [student, subjectId])

    useEffect(() => {
        getTests();
    }, [getTests]);

    const deleteTest = (testId : number) => {
    
        if(!window.confirm("Are you sure that you want to delete the test?")){
          return;
        }
    
        const params : AxiosRequestConfig = {
          method:"DELETE",
          url: `/tests/${testId}`,
          withCredentials: true
        }
    
        requestBackend(params).then(() => {
            onDeleteOrEdit();
        })
    }

    return(
        <div className='test-card-container'>
            <div className='test-card-user-container'>
                <img src={student.imgUrl} alt="" />
                <h4>{student.name}</h4>
            </div>
            <div className='test-card-tests-container'>
                {tests?.content.map(test => (
                    <div className='test-container'>
                        <h5>{test.name}</h5>
                        <h5>{test.score}</h5>
                        <div className='test-container-buttons'>
                            <BiEdit/>
                            <FaTrashAlt onClick={() => deleteTest(test.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TestCard;