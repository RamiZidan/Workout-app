import { Modal } from 'antd'
import React from 'react'
type Params = {
    action: string 
    open : any 
    setOpen : any ;
    newData : any ;
    setNewData: any ;
    ModalForm: any ;
    entity: string ;
}
function MusclesModal({action , open , setOpen ,newData, setNewData , ModalForm, entity  }:Params ) {
  
  const handleOk = ()=>{

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

export default MusclesModal