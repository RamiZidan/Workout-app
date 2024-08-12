import { message } from "antd";
export const showErrors = (error:any)=>{
    Object.keys(error?.data?.msg)?.map((key)=>{
        message.error(error?.data?.msg[key]) ;
    })
};
