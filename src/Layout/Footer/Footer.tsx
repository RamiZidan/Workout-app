import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
          Projcet2 ©{new Date().getFullYear()} Digital Signature App
    </Layout.Footer>
  )
}

export default Footer