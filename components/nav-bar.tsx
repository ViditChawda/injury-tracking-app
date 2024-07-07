'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { MenuProps } from 'antd';
import Image from 'next/image';
import { Button, Dropdown, Space } from 'antd';
import logo from '../public/liefcare_logo 1.png'


export default function NavBar() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
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
        <div className='flex flex-row container h-16 justify-between items-center bg-[#A5D8CC]'>
            <Image width={100} height={100} src={logo} alt="logo" />

            {!user &&
                <div>
                    <Button>
                        <a href="/api/auth/login">Login</a>
                    </Button>
                </div>
            }
            {user && (
                <div className='flex flex-row'>
                    <Dropdown menu={{ items }} placement="bottomLeft">
                        <Image width={40} height={40} className='rounded-full cursor-pointer' src={user.picture} alt={user.name} />
                    </Dropdown>

                </div>
            )}
        </div>

    );
}