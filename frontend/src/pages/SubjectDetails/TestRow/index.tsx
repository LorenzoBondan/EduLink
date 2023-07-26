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

    const [minScore, setMinScore] = useState<number>();

    const getMinScore = useCallback(() => {
        const formattedName = removeSpacesFromString(test.name);

        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/minScore/${subjectId}/${encodeURIComponent(formattedName)}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setMinScore(response.data);
          })
    }, [subjectId, test.name])

    const [maxScore, setMaxScore] = useState<number>();

    const getMaxScore = useCallback(() => {
        const formattedName = removeSpacesFromString(test.name);

        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/maxScore/${subjectId}/${encodeURIComponent(formattedName)}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setMaxScore(response.data);
          })
    }, [subjectId, test.name])

    const [avgScore, setAvgScore] = useState<number>();

    const getAvgScore = useCallback(() => {
        const formattedName = removeSpacesFromString(test.name);

        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tests/avgScore/${subjectId}/${encodeURIComponent(formattedName)}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setAvgScore(response.data);
          })
    }, [subjectId, test.name])

    useEffect(() => {
        getMinScore();
        getMaxScore();
        getAvgScore();
    }, [getMinScore, getMaxScore, getAvgScore]);

    return(
        <tr>
            <td>{test.name}</td>
            <td>{convertDateTime(test.date)}</td>
            <td style={{textAlign:"center"}}>{test.score}</td>
            <td style={{textAlign:"center"}}>{test.points}</td>
            <td style={{textAlign:"center"}}>{maxScore}</td>
            <td style={{textAlign:"center"}}>{minScore}</td>
            <td style={{textAlign:"center"}}>{avgScore}</td>
        </tr>
    );
}

export default TestRow;