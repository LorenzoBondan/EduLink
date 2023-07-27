import { SpringPage, Test, User } from 'types';
import { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import TestCardTest from './TestCardTest';

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

    return(
        <div className='test-card-container'>
            <div className='test-card-user-container'>
                <img src={student.imgUrl} alt="" />
                <h4>{student.name}</h4>
            </div>
            <div className='test-card-tests-container'>
                {tests?.content.map(test => (
                    <TestCardTest test={test} onDeleteOrEdit={onDeleteOrEdit} key={test.id}/>
                ))}
            </div>
        </div>
    );
}

export default TestCard;