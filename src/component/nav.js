import { QrCode, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'

export default function Nav() {
    return (
        <nav style={{
            background: '#000355',
        }} className='d-flex flex-wrap px-5 py-3 container-fluid align-items-center justify-content-between align-items-center'>

            <div className='text-center'>
                <img src='/logoSolana.png' alt='logo' />
            </div>
            <div className='d-flex align-items-center justify-lg-content-center g-2'>
                <span>
                    <Search sx={{ height: 24, marginRight: 5, }} />
                </span>
                <span>
                    <QrCode sx={{ height: 24, marginRight: 5, }} />
                </span>
                <Avatar sx={{ height: 40, width: 40, border: '1px solid white' }} src='/logo.png' alt="Profile Picture" />
            </div>
        </nav>
    )
}
