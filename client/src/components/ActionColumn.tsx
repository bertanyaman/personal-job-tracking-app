import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { DataType } from "../entities/DataType";
import { remove } from "../features/jobs/jobsSlice";
import UpdateJobModal from "./UpdateJobModal";

export function ActionColumn({ job }: { job: DataType }) {

    const [openModal, setOpenModal] = useState(false);
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        setOpenModal(true);
    };

    const [open, setOpen] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        dispatch(remove(job.key));
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Space size="middle">
            <Button type="ghost" onClick={handleEdit}>
                <EditOutlined />
            </Button>
            <Popconfirm
                title="Are you sure you want to delete it?"
                open={open}
                onConfirm={handleOk}
                onCancel={handleCancel}
                okText={"Approve"}
            >
                <Button type="ghost" onClick={showPopconfirm}>
                    <DeleteOutlined />
                </Button>
            </Popconfirm>
            <UpdateJobModal
                open={openModal}
                setOpen={setOpenModal}
                job={job}
            />
        </Space>
    )
}