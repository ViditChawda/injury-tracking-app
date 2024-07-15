'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { BodyMap } from '../../components/bodyMap/BodyMap'
import NavBar from '../../components/nav-bar'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

function BodyMAp1() {

    const { user, error, isLoading } = useUser();
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    })

    return (
        <div>
            <NavBar />
            <BodyMap />
        </div>
    )
}

export default BodyMAp1