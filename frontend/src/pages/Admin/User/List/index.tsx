import { AxiosRequestConfig } from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { requestBackend } from "util/requests";
import UserCrudCard from "../UserCrudCard";
import { SpringPage, User } from "types";
import UserFilter, { UserFilterData } from "components/UserFilter";
import Pagination from "components/Pagination";
import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: UserFilterData;
}

const List = () => {

     // pagination and filter
     const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({activePage:0, filterData: { name: '' },});

     const handlePageChange = (pageNumber : number) => {
       setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData});
     }

    const [page, setPage] = useState<SpringPage<User>>();

    const getUsers = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: "/users",
          params: {
            page: controlComponentsData.activePage,
            size: 10,
    
            name: controlComponentsData.filterData.name
          },
        }
      
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
            window.scrollTo(0, 0);
          })
      }, [controlComponentsData])

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleSubmitFilter = (data : UserFilterData) => {
      setControlComponentsData({activePage: 0, filterData: data});
    }

    return(
        <div className='users-crud-container'>
          <div className="users-crud-content">
            <div className="users-crud-bar-container">
              <button className="btn btn-primary btn-crud-add" style={{color:"white", marginBottom:"20px"}}>
                <Link to="/admin/users/create"> ADD NEW USER</Link>
              </button>
            </div>
              <div className='users-search-bar-container'>
                <UserFilter onSubmitFilter={handleSubmitFilter} />
              </div>
              <table className="user-crud-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th style={{paddingRight:"5px"}}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {page?.content
                      .sort( (a,b) => a.name > b.name ? 1 : -1)
                      .map((item) => (
                        <UserCrudCard user={item} onDelete={() => getUsers()} />
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