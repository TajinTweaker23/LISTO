import React from 'react'
import Head from 'next/head'
import ListoMainHubPro from '../components/ListoMainHubPro'

export default function ProfessionalDemo() {
  // Mock user data
  const mockUser = {
    name: 'Alex',
    email: 'alex@example.com',
    avatar: null
  }

  return (
    <>
      <Head>
        <title>LISTO Professional - Life Intelligence & Support Through Optimization</title>
        <meta name="description" content="Professional-grade wellness and productivity platform with sophisticated design and enterprise-level user experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListoMainHubPro user={mockUser} />
    </>
  )
}
