import { convertDateTime } from "helpers";
import { Test } from "types";
import { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

type Props = {
    test: Test;
    subjectId: number;
    subjectName: string;
}

const TestRow = ({test, subjectId, subjectName}: Props) => {

    function removeSpacesFromString(inputString: string): string {
        return inputString.replace(/\s/g, '_');
    }

    const formattedName = removeSpacesFromString(test.name);

    const [minScore, setMinScore] = useState<number>();

    const getMinScore = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/minScore/${subjectId}/${encodeURIComponent(formattedName)}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setMinScore(response.data);
          })
    }, [subjectId, subjectName])

    const [maxScore, setMaxScore] = useState<number>();

    const getMaxScore = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/maxScore/${subjectId}/${encodeURIComponent(formattedName)}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setMaxScore(response.data);
          })
    }, [subjectId, subjectName])

    const [avgScore, setAvgScore] = useState<number>();

    const getAvgScore = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/avgScore/${subjectId}/${encodeURIComponent(formattedName)}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setAvgScore(response.data);
          })
    }, [subjectId, subjectName])

    useEffect(() => {
        getMinScore();
        getMaxScore();
        getAvgScore();
    }, [getMinScore, getMaxScore, getAvgScore]);



    

    return(
        <tr>
            <td>{test.name}</td>
            <td>{convertDateTime(test.date)}</td>
            <td>{test.score}</td>
            <td>{test.points}</td>
            <td>{minScore}</td>
            <td>{maxScore}</td>
            <td>{avgScore}</td>
        </tr>
    );
}

export default TestRow;