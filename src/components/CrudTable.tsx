/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
interface params {
    dataSource: any[]
    columns: any[]
    actions?: any[]
    endpoint: string
    route: string
}


function CrudTable({ dataSource, columns, endpoint, route, actions  }: params) {
    const navigate = useNavigate() ;
    if(!actions)
        actions = [
            {
                title: <FolderViewOutlined></FolderViewOutlined> ,
                handler(record:any) {
                    navigate(`${route}/${record.id}`)
                },
            },
            {
                title:  <DeleteOutlined></DeleteOutlined> ,
                handler (record:any)  {        
                    console.log(record) ;    
                    const url = `${endpoint}/${record.id}` ;    
                    

                },
                render(record:any){
                    
                    return <Popconfirm
                            title="Delete"
                            description="Are you sure to delete this task?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={()=>this.handler(record)}
                        >
                            <a>
                                <DeleteOutlined></DeleteOutlined>
                            </a>
                        </Popconfirm>

                }
            },
            {
                title: <EditOutlined></EditOutlined> ,
                handler(record:any) {
                    navigate(`${route}/${record.id}/edit`)
                },
            },
        ]    


    const actionsColumn: any[] = [

        {
            title: 'Actions',
            fixed: 'right',
            width: 200,
            key: 'action',
            render: ( _: any, record : any ) => {

                return <>
                    {
                        actions?.map((action: any) => {                            
                            if (action?.render) {
                                return action.render(record);
                            }
                            else {
                                
                                return <a onClick={() => action.handler(record)} > {action.title} </a>
                            }
                        })
                    }


                </>
            }
        }

    ]












    columns = [...columns, ...actionsColumn]


















    return <>
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
            >

            </Table>
        </div>
    </>
}


export default CrudTable;