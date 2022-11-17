import { Modal } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { DataType } from '../entities/DataType';
import { PriorityType } from '../entities/Types';
import { UpdateJobModalProps } from '../entities/UpdateJobModalProps';
import { update } from '../features/jobs/jobsSlice';
import JobNameInput from './JobNameInput';
import JobPrioritySelect from './JobPrioritySelect';

const UpdateJobModal = ({ open, setOpen, job }: UpdateJobModalProps) => {
    const [modifiedJob, setModifiedJob] = useState<DataType>(job);
    const [requiredFields, setRequiredFields] = useState<{ name: boolean, priority: boolean }>({ name: false, priority: false });
    const dispatch = useAppDispatch();

    const handleOk = () => {
        if (modifiedJob.name?.length > 0 && modifiedJob.priority) {
            setOpen(false);
            dispatch(update(modifiedJob));
            setRequiredFields({
                name: false,
                priority: false
            })
        } else {
            setRequiredFields({
                name: modifiedJob.name?.length < 1 ? true : false,
                priority: !modifiedJob.priority ? true : false
            })
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setRequiredFields({
            name: false,
            priority: false
        });
    };

    const handleNameChanged = (value: string) => {
        setModifiedJob(prevState => ({
            ...prevState,
            name: value
        }));
    };

    const handlePriorityChanged = (value: string) => {
        setModifiedJob(prevState => ({
            ...prevState,
            priority: PriorityType[value as PriorityType]
        }));
    };

    return (
        <>
            <Modal
                title="Update Job"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                destroyOnClose
            >
                <div className='modalRow'>
                    <p>Job Name</p>
                    <JobNameInput
                        onChange={handleNameChanged}
                        name={modifiedJob.name}
                        required={requiredFields.name}
                        disabled
                    />
                </div>
                <div className='modalRow'>
                    <p>Job Priority</p>
                    <JobPrioritySelect
                        onSelect={handlePriorityChanged}
                        priority={modifiedJob.priority}
                        required={requiredFields.priority}
                    />
                </div>
            </Modal>
        </>
    );
};

export default UpdateJobModal;