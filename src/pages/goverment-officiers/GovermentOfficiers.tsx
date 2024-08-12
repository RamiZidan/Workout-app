import React from 'react'
import CrudTable from '../../components/CrudTable'
import { adminsColumns } from '../../constants/columns'
import { fakeAdminsDataSource } from '../../constants/fake'

function GovermentOfficiers() {
  return (
    <CrudTable
        columns={adminsColumns}
        dataSource={fakeAdminsDataSource}
        endpoint='/api/goverment-offiicer'
        route='/goverment-officiers'
    />
  )
}

export default GovermentOfficiers