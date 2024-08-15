import React from 'react'
import CrudTable from '../../../components/CrudTable'
import { MusclesDataSource } from '../../../constants/fake'
import { Image } from 'antd';
function Muscles() {

  const MusclesColumn : any[] = [
    {
      title:'Name',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'Image',
      render: item => {
        return <>
          <Image width={100} src={item.image} />
        </>;
      }
    }
  ];
  
  return (
    <>
      <CrudTable
        columns={MusclesColumn}
        dataSource={MusclesDataSource}
        route={'/dashboard/muscles'}
        endpoint='/'
        defaultActions={['delete','update']}
      />
    </>
  )
}

export default Muscles