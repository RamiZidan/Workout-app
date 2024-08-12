import { Layout } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content';
const LayoutContainer = () => {

    return (
        <>
            <Layout style={{minHeight:'100vh',maxWidth:'100vw',maxHeight:'100vh'}}>
                <Sidebar />
                <Layout>
                    <Header />
                    <Content />
                    <Footer />
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutContainer
