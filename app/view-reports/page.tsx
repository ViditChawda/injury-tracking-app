'use client'
import NavBar from '../../components/nav-bar'
import { GET_REPORTS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { Card, Input, DatePicker, Table } from 'antd'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker;

function ViewReports() {
    const { data, loading } = useQuery(GET_REPORTS);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredReports, setFilteredReports] = useState([]);

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
            report.reporter.toLowerCase().includes(value)
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
            key: 'reporter',
            sorter: (a: any, b: any) => a.reporter.localeCompare(b.reporter),
        },
        {
            title: 'Reporter Name',
            dataIndex: 'reporter_name',
            key: 'reporter',
            sorter: (a: any, b: any) => a.reporter.localeCompare(b.reporter),
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
            render: (_: any, record: any) => (
                <div className='text-blue-500'>
                    <a>Delete</a>
                    <a onClick={() => { router.push(`/view-reports/${record.id}`) }} className='ml-6'>View</a>
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
                            <p><strong>Reporter Email:</strong> {report.reporter}</p>
                            <p><strong>Report Date:</strong> {format(new Date(report.date), 'MM/dd/yyyy')}</p>
                            <div className='text-blue-500 mt-2'>
                                <a>Delete</a>
                                <a onClick={() => { router.push(`/view-reports/${report.id}`) }} className='ml-6'>View</a>
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
                <div className="flex justify-between my-4">
                    <Input
                        placeholder="Search by name"
                        value={searchText}
                        onChange={handleSearch}
                        prefix={<SearchOutlined />}
                    />
                    <RangePicker onChange={handleDateFilter} />
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
