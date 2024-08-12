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
        icon: React.createElement(UserOutlined),
        label: `Manage Users`,
        url: '/manage-users'
    },
]

export const governmentOfficerPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Digital certificates Confirmation`,
        url: '/digital-certificates-confirmation'
    },
]

export const userPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Digital Certificate`,
        url: '/digital-certificate'
    },
]
