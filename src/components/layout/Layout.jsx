// components/layout.js
import React from 'react'
import Head from 'next/head';

import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title = "Nextjs Fullstack Room Booking Application" }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="A Next.js full-stack room booking application allows users to book rooms and manage bookings through a user-friendly interface." />
                <meta property="og:title" content="Nextjs Fullstack Room Booking Application" />
                <meta property="og:description" content="This Next.js full-stack room booking application enables users to easily book rooms and manage their bookings with a user-friendly interface, making it a convenient and efficient tool for any business or individual looking to manage their room bookings." />
                <meta property="og:type" content="website" />
            </Head>

            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}