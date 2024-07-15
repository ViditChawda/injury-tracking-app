'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { MenuProps } from 'antd';
import Image from 'next/image';
import { Button, Dropdown, Space } from 'antd';
import logo from '../public/liefcare_logo 1.png'
import { useRouter } from 'next/navigation';


export default function NavBar() {
    const { user, error, isLoading } = useUser();
    const router = useRouter()
    if (error) return <div>{error.message}</div>;

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href="/api/auth/logout">Logout</a>
            ),
        },
    ];

    return (
        <div className='flex flex-row container h-16 justify-between border-b-[1px] border-[#054145] items-center bg-[#A5D8CC]'>
            <div className='flex flex-row md:gap-16 gap-4'>
                <Image className='cursor-pointer' onClick={() => router.push('/')} width={100} height={100} src={logo} alt="logo" />
                {(user) && <ul className='items-center flex flex-row justify-start md:gap-12 gap-2'>
                    <li className='hover:text-white text-[#054145] cursor-pointer'><a onClick={() => { router.push('/view-reports') }}>Reports</a></li>
                    <li className='hover:text-white text-[#054145] cursor-pointer'><a onClick={() => { router.push('/create-injury') }}>Create Report</a></li>
                </ul>}
            </div>
            {(!user) &&
                <div>
                    <button className="bg-[#E0fefe] text-[#054145] py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                        <a href="/api/auth/login">Login / Sign Up</a>
                    </button>
                </div>
            }
            {user && (
                <div className='flex flex-row'>
                    <Dropdown menu={{ items }} placement="bottomLeft">
                        <Image width={40} height={40} className='rounded-full cursor-pointer' src={`${user.picture}`} alt={`${user.name}`} />
                    </Dropdown>

                </div>
            )}
        </div>

    );
}