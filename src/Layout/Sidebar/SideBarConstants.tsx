import { UserAddOutlined, FormOutlined, PicCenterOutlined, UserOutlined, TeamOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import React from 'react'

interface SideBarPage {
    key: any,
    icon: any,
    label: any,
    url: any
}

export const adminPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Home`,
        url: '/'
    },
    {
        key: '2',
        icon: React.createElement(UserOutlined),
        label: `Muscles`,
        url: '/dashboard/muscles'
    },
    {
        key: '3',
        icon: React.createElement(UserOutlined),
        label: `Exercises`,
        url: '/dashboard/exercises'
    },
    {
        key: '4',
        icon: React.createElement(UserOutlined),
        label: `Courses`,
        url: '/dashboard/courses'
    },
    // {
    //     key: '4',
    //     icon: React.createElement(UserOutlined),
    //     label: `Users Muscles`,
    //     url: '/dashboard/users/:id/muscles'
    // },
]


export const userPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Home`,
        url: '/'
    },
    {
        key: '2',
        icon: React.createElement(PicCenterOutlined),
        label: `Courses`,
        url: '/courses'
    },
    {
        key: '3',
        icon: React.createElement(PicCenterOutlined),
        label: `Profile`,
        url: '/profile'
    }
]
