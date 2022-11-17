import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table, Tag } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { useRef, useState } from "react";
import { DataType } from "../entities/DataType";
import { PriorityType } from "../entities/Types";
import { ActionColumn } from "./ActionColumn";

import Highlighter from 'react-highlight-words';
import { useAppSelector } from "../app/hooks";

const getPriorityNumber = (priority: PriorityType) => {
    switch (priority) {
        case PriorityType.Trivial: {
            return 0;
        }
        case PriorityType.Regular: {
            return 1;
        }
        case PriorityType.Urgent: {
            return 2;
        }
    }
};

const getPriorityColor = (priority: PriorityType) => {
    switch (priority) {
        case PriorityType.Trivial: {
            return "blue";
        }
        case PriorityType.Regular: {
            return "orange";
        }
        case PriorityType.Urgent: {
            return "red";
        }
    }
};

type DataIndex = keyof DataType;

function JobList() {

    const jobs = useAppSelector((state) => state.jobs.items);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            onFilter: (value: string | number | boolean, record: DataType) => {
                return record.name === value
            },
            ...getColumnSearchProps('name')
        },
        {
            title: 'Priority',
            key: 'priority',
            dataIndex: 'priority',
            render: (_, { priority }) => (
                <Tag color={getPriorityColor(priority)} key={priority}>
                    {priority.toUpperCase()}
                </Tag>
            ),
            defaultSortOrder: 'descend',
            sorter: (a, b) => getPriorityNumber(a.priority) - getPriorityNumber(b.priority),
            filters: [
                {
                    text: PriorityType.Trivial,
                    value: PriorityType.Trivial
                },
                {
                    text: PriorityType.Regular,
                    value: PriorityType.Regular
                },
                {
                    text: PriorityType.Urgent,
                    value: PriorityType.Urgent
                }
            ],
            onFilter: (value: string | number | boolean, record: DataType) => {
                return record.priority === value
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, job) => (<ActionColumn job={job} />)
        },
    ];

    return (
        <div>
            <h3 className="title">Job List</h3>
            <Table
                columns={columns}
                dataSource={jobs}
            />
        </div>
    );
}

export default JobList;