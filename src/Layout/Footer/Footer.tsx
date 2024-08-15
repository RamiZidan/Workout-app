import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
          Projcet 1 ©{new Date().getFullYear()} Jasur App
    </Layout.Footer>
  )
}

export default Footer