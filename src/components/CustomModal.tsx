import { Modal } from 'antd'
import React from 'react'

import { showErrors } from '../functions/helpers'
type Params = {
    action: string 
    open : any 
    setOpen : any ;
    newData?: any ;
    setNewData?: any ;
    ModalForm: any ;
    entity: string ;
    mutations? : any ;
    form: any ;
}
function CustomModal({action , open , setOpen ,newData, setNewData , ModalForm, entity  , form  }:Params ) {
  
  const handleOk = async ()=>{
    
    form?.submit();
    setOpen(0);
  }
  const handleCancel = ()=>{
    setOpen(0);
  }
  
  return (
    <Modal
        title={`${action} ${entity}`} open={open} onOk={handleOk} onCancel={handleCancel}
    >
        {
            ModalForm
        }

    </Modal>  
  )
}

export default CustomModal