'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page({ params }: any) {
    const { id } = params
    return (
        <div>page {id}</div>
    )
}

export default Page