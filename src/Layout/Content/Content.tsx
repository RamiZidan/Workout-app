import { Layout ,theme} from 'antd'
import { Outlet } from 'react-router-dom';
const Content = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout.Content style={{ margin: '24px 16px 0'}}>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    height: '100%',
                    overflow:'auto'
                }}
            >
                <Outlet/>
            </div>
        </Layout.Content>
    )
}

export default Content