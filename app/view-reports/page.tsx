'use client'
import NavBar from '../../components/nav-bar'
import { GET_REPORTS } from '../../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Card, Input, DatePicker, Table, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { DELETE_REPORT } from '@/graphql/mutations'

const { RangePicker } = DatePicker;

function ViewReports() {
    const { data, loading } = useQuery(GET_REPORTS, { fetchPolicy: "no-cache" });
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredReports, setFilteredReports] = useState([]);

    const [deleteReport, { error: mutationError }] = useMutation(DELETE_REPORT, { refetchQueries: [GET_REPORTS] });

    const handleDelete = async (id: any) => {
        try {
            console.log(id)
            const { data } = await deleteReport({ variables: { id } });
            console.log("Deleted Report -", data.deleteReport);
        } catch (error) {
            console.error("Error deleting reprot ", error);
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (data) {
            setFilteredReports(data.allReports);
        }
    }, [data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filtered = data.allReports.filter((report: any) =>
            report.report_name.toLowerCase().includes(value)
        );
        setSearchText(value);
        setFilteredReports(filtered);
    };

    const handleDateFilter = (dates: any, dateStrings: [string, string]) => {
        if (dates) {
            const [start, end] = dates;
            const filtered = data.allReports.filter((report: any) => {
                const reportDate = new Date(report.date);
                return reportDate >= start && reportDate <= end;
            });
            setFilteredReports(filtered);
        } else {
            setFilteredReports(data.allReports);
        }
    };

    const columns = [
        {
            title: 'Seq.',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
            render: (id: any) => <a>{id}</a>,
        },
        {
            title: 'Report Name',
            dataIndex: 'report_name',
            key: 'report_name',
            sorter: (a: any, b: any) => (a.report_name || '').localeCompare(b.report_name || ''),
        },
        {
            title: 'Reporter Name',
            dataIndex: 'reporter_name',
            key: 'reporter_name',
            sorter: (a: any, b: any) => (a.reporter_name || '').localeCompare(b.reporter_name || ''),
        },
        {
            title: 'Report Date',
            dataIndex: 'date',
            key: 'date',
            render: (date: any) => format(new Date(date), 'MM/dd/yyyy'),
        },
        {
            title: 'Report Date',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_: any, record: any) => (
                <div className='text-blue-500'>
                    <Popconfirm
                        placement="topLeft"
                        title={'Are you sure to delete this report?'}
                        description={'Delete the report'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <a >Delete</a></Popconfirm>
                    <a onClick={() => { router.push(`/view-reports/${record.id}`) }} className='ml-6'>View/Edit</a>
                </div>
            ),
        },
    ];

    if (!isClient) {
        return null;
    }

    const renderTableOrCards = () => {
        if (window.innerWidth < 445) { // Adjust breakpoint as needed
            return (
                <div className="grid grid-cols-1 gap-4 container">
                    {filteredReports.map((report: any) => (
                        <Card key={report.id} title={`ID: ${report.id}`}>
                            <p><strong>Reporter Name:</strong> {report.report_name}</p>
                            <p><strong>Reporter Name:</strong> {report.reporter_name}</p>
                            <p><strong>Report Date:</strong> {format(new Date(report.date), 'MM/dd/yyyy')}</p>
                            <div className='text-blue-500 mt-2'>
                                <a onClick={() => handleDelete(report.id)}>Delete</a>
                                <a onClick={() => { router.push(`/view-reports/${report.id}`) }} className='ml-6'>View/Edit</a>
                            </div>
                        </Card>
                    ))}
                </div>
            );
        } else {
            return (
                <Table
                    className='mt-5'
                    dataSource={filteredReports}
                    columns={columns}
                    pagination={false}
                />
            );
        }
    };

    return (
        <div className='bg-[#f4fefe] min-h-[100vh]'>
            <NavBar />
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-4xl flex items-center justify-center font-bold leading-tight mt-10 text-[#054145]">
                    Reports
                </h2>
                <div className="flex md:flex-row flex-col justify-center container md:px-0 md:mt-20 md:justify-between my-4 w-full gap-6">
                    <div className='md:w-1/2'>
                        <Input
                            placeholder="Search by name"
                            value={searchText}
                            onChange={handleSearch}
                            prefix={<SearchOutlined />}
                        />
                    </div>
                    <div className=''>
                        <RangePicker onChange={handleDateFilter} />
                    </div>
                </div>
                {data ? (
                    renderTableOrCards()
                ) : (
                    <div className='flex flex-row gap-6 w-full items-center justify-center text-2xl mt-40 text-[#054145] font-semibold'>
                        <LoaderCircle className='animate-spin' /> Loading...
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewReports;
