"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { PropsWithChildren } from 'react'

const Provider = ({ children }: PropsWithChildren) => {
    const client = new ApolloClient({
        uri: `/api`,
        cache: new InMemoryCache(),

    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default Provider