import { SpringPage, Test, User } from "types";
import { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

type Props = {
    subjectId: number;
    user: User;
}

const TeacherTestRow = ({user, subjectId}: Props) => {

    const [tests, setTests] = useState<SpringPage<Test>>();

    const getTests = useCallback(() => {

        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/subject/${subjectId}/teacher/${user.id}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setTests(response.data);
          })
    }, [subjectId, user])

    useEffect(() => {
        getTests();
    }, [getTests]);

    return(
        <tr>
            <td>{user.name}</td>
            {tests?.content.map(test => (
                <td>{test.score}</td>
            ))}
        </tr>
    );
}

export default TeacherTestRow;