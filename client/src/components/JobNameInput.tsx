import { Input } from "antd";

function JobNameInput(args: { name: string, required?: boolean, disabled?: boolean, onChange: (e: string) => void }) {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        args.onChange?.(value);
    }

    return (
        <Input
            onChange={onChange}
            value={args.name}
            max={255}
            status={args.required ? "error" : undefined}
            disabled={args.disabled}
        />
    );
}

export default JobNameInput;