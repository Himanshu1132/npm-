"use client";
import { useEffect, useState } from "react";
import UserData from './UserData';

const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const TableData = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async (url: string) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                setUsers(data);
            }
            console.log(data);
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        fetchUsers(API);
    }, [])
    return (
        <>
            <UserData users={users} />
        </>
    )
}

export default TableData
