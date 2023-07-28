import { Subject, Test } from 'types';
import './styles.css';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';
import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_orange.css";
import { useState } from 'react';
import Select from 'react-select';

type Props = {
    onCancel: Function;
    subject: Subject;
}

const AddTest = ({onCancel, subject} : Props) => {

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Test>();
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const onSubmit = (formData : Test) => {

        formData.subjectId = subject.id;
        formData.date = dateTimeDay;

        formData.studentsId = selectedStudents.map(id => parseInt(id, 10));

        const params : AxiosRequestConfig = {
            method: "POST",
            url : "/tests",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                console.log('Success', response.data);
                toast.success('Success!');
                onCancel();

                setValue('score', 0);
            })
            .catch(() => {
                toast.error('Error');
            })
    };

    const studentsIds = subject.students.map(student => student.id);
    const studentsNames = subject.students.map(student => student.name);

    const formatStudentsOptions = (): { value: string, label: string }[] => {
        return subject.students.map(student => ({ value: student.id.toString(), label: student.name }));
      };
    
      const handleStudentsSelectChange = (selectedOptions: { value: string, label: string }[]) => {
        setSelectedStudents(selectedOptions.map(option => option.value));
      };

    const [dateTimeDay, setDateTimeDay] = useState('');

    const handleDateTimeChangeDay = (selectedDateTime: string | Date[]) => {
        if (Array.isArray(selectedDateTime)) {
          if (selectedDateTime.length > 0) {
            const selectedDate = selectedDateTime[0];
            setDateTimeDay(selectedDate.toISOString());
          } else {
            setDateTimeDay('');
          }
        } else {
          setDateTimeDay(selectedDateTime);
        }
    };

    return(
        <div className='add-note-container'>
            <form onSubmit={handleSubmit(onSubmit)} className='add-note-form'>
                <h1><AiOutlinePlus/> Add Test</h1>
                <div className='row add-note-inputs-container'>
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
                        <label htmlFor="">Date</label>
                        <FlatPicker
                            value={dateTimeDay}
                            onChange={(selectedDateTime: Date[]) => handleDateTimeChangeDay(selectedDateTime)}
                            options={{
                                enableTime: true,
                                dateFormat: 'Y-m-d h:i',
                            }}
                            className="base-input time-input"
                        />
                        <div className='invalid-feedback d-block'>{errors.date?.message}</div>
                    </div>
                    <div className='margin-bottom-30'>
                        <label htmlFor="">Points</label>
                        <input 
                            {...register("points", {
                            required: 'Required field',
                            })}
                            type="text"
                            className={`form-control base-input ${errors.points ? 'is-invalid' : ''}`}
                            placeholder="Points"
                            name="points"
                        />
                        <div className='invalid-feedback d-block'>{errors.points?.message}</div>
                    </div>
                    <div className='margin-bottom-30'>
                        <label htmlFor="">Score</label>
                        <input 
                            {...register("score", {
                            required: 'Required field',
                            })}
                            type="text"
                            className={`form-control base-input ${errors.score ? 'is-invalid' : ''}`}
                            placeholder="Score"
                            name="score"
                        />
                        <div className='invalid-feedback d-block'>{errors.score?.message}</div>
                    </div>
                    <div className='margin-bottom-30'>
                        <label htmlFor="">Students</label> 
                        <Select
                            options={formatStudentsOptions()}
                            value={selectedStudents.map(id => ({ value: id, label: studentsNames[parseInt(id, 10) - 1] }))}
                            isMulti
                            onChange={(newValue, actionMeta) => handleStudentsSelectChange(newValue as any)}
                            classNamePrefix="users-crud-select"
                            placeholder="Select Students"
                            />
                            {errors.studentsId && (
                                <div className='invalid-feedback d-block'>Required field</div>
                            )}
                    </div>
                </div>     
                <div className='add-note-buttons-container'>
                    <button 
                        className='btn btn-outline-danger add-note-button'
                        onClick={() => onCancel()}
                        >
                        CANCEL
                    </button>
                    <button className='btn btn-primary text-white add-note-button'>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default AddTest;