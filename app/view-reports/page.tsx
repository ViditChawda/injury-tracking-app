"use client"
import NavBar from '@/components/nav-bar'
import { GET_REPORTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Table } from 'antd'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'

function ViewReports() {
    const { data, loading } = useQuery(GET_REPORTS)

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const columns = [
        {
            title: 'Seq.',
            dataIndex: 'id',
            key: 'id',
            render: (id: any) => <a>{id}</a>,
        },
        {
            title: 'Reporter Email',
            dataIndex: 'reporter',
            key: 'reporter',
        },
        {
            title: 'Report Date',
            dataIndex: 'date',
            key: 'date',
            render: (date: any) => format(new Date(date), 'MM/dd/yyyy'),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <div className='text-blue-500'><a>Delete</a> <a className='ml-6'>View</a></div>,
        },
    ];

    if (!isClient) {
        return null;
    }

    return (
        <div className='bg-[#f4fefe] min-h-[100vh]'>
            <NavBar />
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-4xl flex items-center justify-center font-bold leading-tight mt-10 text-[#054145]">
                    Reports
                </h2>
                {data && <Table className='mt-5' dataSource={data?.allReports} columns={columns} pagination={false} />}
            </div>
        </div>
    )
}

export default ViewReports
