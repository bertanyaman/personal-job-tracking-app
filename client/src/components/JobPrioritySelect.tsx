import { Select } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PriorityType } from "../entities/Types";
import { loadPriorities } from "../features/jobs/jobsSlice";

function JobPrioritySelect(args: { priority: PriorityType, required?: boolean, onSelect: (value: string) => void }) {

    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const priorities = useAppSelector((state) => state.jobs.priorities);

    useEffect(() => {
        if (!priorities?.length) {
            fetch("http://localhost:9000/priorities")
                .then(res => res.text())
                .then(res => {
                    const parsedData = JSON.parse(res);
                    const priorities: Array<{ value: PriorityType, label: PriorityType }> = parsedData.result;

                    setLoading(false);
                    dispatch(loadPriorities(priorities));
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <Select
            className={"prioritySelect"}
            placeholder="Choose"
            options={priorities}
            onSelect={args.onSelect}
            value={args.priority}
            status={args.required ? "error" : undefined}
            loading={loading}
            disabled={loading}
        />
    );
}

export default JobPrioritySelect;