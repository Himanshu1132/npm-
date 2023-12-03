"use client"
import React, { useMemo, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DataTable from 'react-data-table-component';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};
const UserData = ({ users }: { users: User[] }) => {
    const [records, setRecords] = useState<User[]>([]);

    const [selectedRows, setSelectedRows] = useState<User[]>([]);;
    const [toggledClearRows, setToggleClearRows] = useState(false);
    useMemo(() => {
        setRecords(users)
    }, [users])
    const data = useMemo(() => records, [records]);
    const columns = useMemo(() => [
        {
            name: 'Name',
            selector: (row: User) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: User) => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row: User) => row.role,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: any) => (
                <div className='space-x-2'>
                    <button className='text-red-500 text-xl'
                        title='Delete'
                        onClick={() => {
                            const newData = records.filter((user: User) => user.id !== row.id);
                            setRecords(newData);
                        }
                        }
                    ><MdDelete /></button>
                    <button className='text-gray-500 text-xl'
                        onClick={() => {

                        }
                        }
                    ><FaEdit /></button>
                </div>
            ),
        },
    ], []); // eslint-disable-line react-hooks/exhaustive-deps
    const handleFilter = (e: any) => {
        const searchTerm = e.target.value.toLowerCase();
        const newData = users.filter((user: User) => {
            return Object.values(user).some(value =>
                value.toString().toLowerCase().includes(searchTerm)
            );
        });
        setRecords(newData)
    }

    const handleChange = ({ selectedRows }: { selectedRows: User[] }) => {
        setSelectedRows(selectedRows);
    };

    // Toggle the state so React Data Table changes to clearSelectedRows are triggered
    const handleClearRows = () => {
        const newData = data.filter((row: User) => !selectedRows.includes(row));
        setRecords(newData);
        setToggleClearRows(!toggledClearRows);
    }
    return (
        <div className='container mt-5'>
            <div className='flex justify-between flex-col md:flex-row'>
                <input type="text"
                    onChange={
                        handleFilter
                    }
                    title='Search'
                    placeholder='Enter Value to Search '
                    className='border border-gray-400 rounded-md p-2 '
                />
                <button onClick={handleClearRows} className='text-red-400 flex items-center gap-2 text-xl md:text-2xl hover:text-red-700 font-bold'>
                    <MdDelete />Delete Selected Rows
                </button>
            </div>
            <DataTable
                title="Users Data"
                columns={columns}
                data={records}
                fixedHeader
                highlightOnHover
                pagination
                selectableRows
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggledClearRows}
            />

        </div>
    )
}
export default UserData;