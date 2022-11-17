import { DataType } from "./DataType";

export interface UpdateJobModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    job: DataType;
}