"use client"
import { GET_REPORTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

function ViewReports() {
    const { data, loading } = useQuery(GET_REPORTS)
    return (
        <div>{JSON.stringify(data, null, 2)}</div>
    )
}

export default ViewReports