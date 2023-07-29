import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { requestBackend } from 'util/requests';
import { Subject, User } from 'types';
import { toast } from 'react-toastify';

type UrlParams = {
    subjectId: string;
}

const Form = () => {

    const {subjectId} = useParams<UrlParams>();

    const isEditing = subjectId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue, control } = useForm<Subject>();

    useEffect(() => {
        if(isEditing){
            requestBackend({url:`/subjects/${subjectId}`, withCredentials:true})
                .then((response) => {
                    const subject = response.data as Subject;

                    setValue('name', subject.name);
                    setValue('imgUrl', subject.imgUrl);
                    setValue('notes', subject.notes);
                    setValue('students', subject.students);
                    setValue('teacherId', subject.teacherId);
                    setValue('team', subject.team);
                    setValue('tests', subject.tests);
                })
        }
        
    }, [isEditing, subjectId, setValue]);

    const history = useHistory();

    const [selectStudents, setSelectStudents] = useState<User[]>();

    useEffect(() => {
        requestBackend({url: '/users', withCredentials: true})
            .then(response => {
                setSelectStudents(response.data.content)
        })
    }, []);

    const [selectTeacher, setSelectTeacher] = useState<User[]>();

    useEffect(() => {
        requestBackend({url: '/users', withCredentials: true})
            .then(response => {
                setSelectTeacher(response.data.content)
        })
    }, []);

    const selectTeacherNames = selectTeacher?.map(teacher => teacher.name);
    const selectTeacherIds = selectTeacher?.map(teacher => teacher.id);

    const onSubmit = (formData : Subject) => {

        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url : isEditing? `/subjects/${subjectId}` : "/subjects",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                toast.success("Success!");
                history.push("/admin/subjects");
            })
            .catch(() => {
                toast.error('Error');
            })
    };

    const handleCancel = () => {
        history.push("/admin/subjects")
    }

    return(
        <div className="edit-profile-form-container">
            <div className="base-card post-card-form-card">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>
                        <div className='margin-bottom-30'>
                            <label htmlFor="">Name</label>
                            <input 
                                {...register("name", {
                                    required: 'Required field',
                                })}
                                type="text"
                                className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Name"
                                name="name"
                            />
                            <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="">Team</label>
                            <input 
                                {...register("team", {
                                    required: 'Required field',
                                })}
                                type="text"
                                className={`form-control base-input ${errors.team ? 'is-invalid' : ''}`}
                                placeholder="Team"
                                name="team"
                            />
                            <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="">Img Url</label>  
                                <input 
                                    {...register("imgUrl", {
                                        required: 'Required field',
                                    pattern: { 
                                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                        message: 'Insira uma URL válida'
                                    }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                    placeholder="URL of course's image"
                                    name="imgUrl"
                                />
                                <div className='invalid-feedback d-block'>{errors.imgUrl?.message}</div>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="">Teacher Id</label>  
                            <select
                                {...register("teacherId", {
                                    required: 'Required field',
                                })}
                                className={`form-control base-input ${errors.teacherId ? 'is-invalid' : ''}`}
                                placeholder='Teacher' 
                                name="teacherId"
                                >
                                {selectTeacherIds?.map(id => <option key={id} value={id} label={selectTeacherNames && selectTeacherNames[id-1]}></option>)}
                            </select>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="">Students</label> 
                                <Controller 
                                    name = 'students'
                                    rules = {{required: true}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectStudents}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Roles"
                                            isMulti
                                            getOptionLabel={(student: User) => student.name}
                                            getOptionValue={(student: User) => student.id.toString()}
                                        />    
                                    )}
                                />
                                {errors.students && (
                                    <div className='invalid-feedback d-block'>Required field</div>
                                )}
                        </div>
                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>
                            <button className='btn btn-primary text-white post-crud-buttons'>SAVE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;