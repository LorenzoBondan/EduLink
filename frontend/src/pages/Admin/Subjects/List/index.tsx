import { AxiosRequestConfig } from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { requestBackend } from "util/requests";
import UserCrudCard from "../SubjectCrudCard";
import { SpringPage, Subject } from "types";
import Pagination from "components/Pagination";
import './styles.css';

type ControlComponentsData = {
  activePage: number;
}

const List = () => {

     // pagination and filter
     const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({activePage:0});

     const handlePageChange = (pageNumber : number) => {
       setControlComponentsData({activePage: pageNumber});
     }

    const [page, setPage] = useState<SpringPage<Subject>>();

    const getSubjects = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: "/subjects",
          params: {
            page: controlComponentsData.activePage,
            size: 10,
          },
        }
      
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
            window.scrollTo(0, 0);
          })
      }, [controlComponentsData])

    useEffect(() => {
      getSubjects();
    }, [getSubjects]);

    return(
        <div className='users-crud-container'>
          <div className="users-crud-content">
            <div className="users-crud-bar-container">
              <button className="btn btn-primary btn-crud-add" style={{color:"white", marginBottom:"20px"}}>
                <Link to="/admin/subjects/create"> ADD NEW SUBJECT</Link>
              </button>
            </div>
              <table className="user-crud-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {page?.content
                      .sort( (a,b) => a.name > b.name ? 1 : -1)
                      .map((item) => (
                        <p></p>
                      ))
                  }
                </tbody>
              </table>
          </div>
          <div className='pagination-container'>
            <Pagination 
              pageCount={(page) ? page.totalPages : 0} 
              range={2}
              onChange={handlePageChange}
              forcePage={page?.number}
            />
          </div>
        </div>
    );
}

export default List;