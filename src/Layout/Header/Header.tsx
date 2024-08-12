import { Layout, theme, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentPermission } from '../../features/auth/authSlice';
import { selectCurrentUserName } from '../../features/auth/authSlice';
import { Permissions } from '../../features/auth/authSlice';
import { logOut } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './style.scss'
const Header = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const permission: Permissions | null = useSelector(selectCurrentPermission)
    const username = useSelector(selectCurrentUserName)
    const title: string = permission === 'admin' ? 'Admin Panel' : permission === "governmentOfficer" ? `${'government dashboard'}` : `${username} user`
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleLogout = () => {
        dispatch(logOut())
        navigate('/login')
    }
    return (
        <Layout.Header style={{
            padding: 0,
            background: colorBgContainer
        }} >
            <div className='header-componenet'>
                <p className='header-title'>{title}</p>
                <Tooltip title='Logout'>
                    <LogoutOutlined onClick={handleLogout} />
                </Tooltip>
            </div>
        </Layout.Header>
    )
}

export default Header