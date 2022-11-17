import { Button, Input } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { DataType } from "../entities/DataType";
import { PriorityType } from "../entities/Types";
import { add } from "../features/jobs/jobsSlice";
import JobNameInput from "./JobNameInput";
import JobPrioritySelect from "./JobPrioritySelect";

function CreateNewJob() {

    const [requiredFields, setRequiredFields] = useState<{ name: boolean, priority: boolean }>({ name: false, priority: false });
    const [job, setJob] = useState<DataType>({ key: new Date().getTime().toString(), name: "", priority: PriorityType.Regular });
    const dispatch = useAppDispatch();

    const handleOk = () => {

        if (job.name?.length > 0 && job.priority) {
            dispatch(add(job));
            setJob({
                key: new Date().getTime().toString(),
                name: "",
                priority: PriorityType.Regular
            });
            setRequiredFields({
                name: false,
                priority: false
            });
        } else {
            setRequiredFields({
                name: job.name?.length < 1 ? true : false,
                priority: !job.priority ? true : false
            })
        }


    };

    const handleNameChanged = (value: string) => {
        setJob(prevState => ({
            ...prevState,
            name: value
        }));
    };

    const handlePriorityChanged = (value: string) => {
        setJob(prevState => ({
            ...prevState,
            priority: PriorityType[value as PriorityType]
        }));
    };

    return (
        <div className="createNewJob">
            <h3 className="title">Create New Job</h3>
            <Input.Group>
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <p className="label">Job Name</p>
                        <JobNameInput
                            onChange={handleNameChanged}
                            name={job.name}
                            required={requiredFields.name}
                        />
                    </div>
                    <div className="col-md-2 col-sm-12">
                        <p className="label">Job Priority</p>
                        <JobPrioritySelect
                            onSelect={handlePriorityChanged}
                            priority={job.priority}
                            required={requiredFields.priority}
                        />
                    </div>
                    <div className="col-md-2 col-sm-12">
                        <p className="label">&nbsp;</p>
                        <Button className="createBtn" type="primary" onClick={handleOk}>Create</Button>
                    </div>
                </div>
            </Input.Group>
        </div>
    );
}

export default CreateNewJob;