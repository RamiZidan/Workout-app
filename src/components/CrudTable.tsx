/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
interface params {
    dataSource: any[]
    columns: any[]
    actions?: any[]
    endpoint?: string
    route?: string
    mutations?: any
    defaultActions?: any[]
}

/*
    mutations 
    ['delete' , 'view' , 'update'  ]

*/



function CrudTable({ 
    dataSource, 
    columns, 
    endpoint, 
    route, 
    mutations , 
    defaultActions = [], 
    actions = []  }: params) {


    const navigate = useNavigate() ;
    [
        {
            title:'view',
            icon: <FolderViewOutlined></FolderViewOutlined> ,
            handler(record:any) {
                navigate(`${route}/${record.id}`)
            },
        },
        {
            title:'delete',
            icon :  <DeleteOutlined></DeleteOutlined> ,
            handler (record:any)  {        
                console.log('rec',record);
                mutations.delete(record.id);
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
            title:'update',
            icon: <EditOutlined></EditOutlined> ,
            handler(record:any) {
                
                // navigate(`${route}/${record.id}/edit`)
            },
        },
    ].map((action:any)=>{
        defaultActions?.map((defaultAction:any)=>{
            if(action.title == defaultAction){
                let ovverride = 0;
                actions.map((overrideAction:any)=>{
                    if(overrideAction.title == action.title ){
                        ovverride = 1 ;
                    }
                })
                if(ovverride) return ;

                actions = [...actions , action ] ;
            }
        })
    }) 


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
                                
                                return <a onClick={() => action.handler(record)} > {action.icon} </a>
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