import { message } from "antd";
import { isString } from "antd/es/button";
export const showErrors = (error:any)=>{
  if(error?.data?.msg?.map){
    Object.keys(error?.data?.msg)?.map((key)=>{
      message.error(error?.data?.msg[key]) ;
    })
  }
  else if((error?.data?.msg) ){
    message.error(error.data.msg);
  }
    
};



export const convertToFormData = (details:any)=>{
    let formBody : any = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;    
}

export const getTimeString = (now:any, startTime:any) => {
    let secondPassed = 0;
    let minutePassed = 0;
    let hourPassed = 0;
    const basedHour = 1000 * 60 * 60;
    const basedMinutes = 1000 * 60;
    let result = "00:00:00";
    if (startTime != null && now != null) {
      result = "";
      const timePassed = now - startTime;
      hourPassed = Math.floor(timePassed / basedHour);
      result += hourPassed < 10 ? `0${hourPassed}:` : `${hourPassed}:`;
  
      let remainning = timePassed - hourPassed * basedHour;
      minutePassed = Math.floor(remainning / basedMinutes);
      result += minutePassed < 10 ? `0${minutePassed}:` : `${minutePassed}:`;
  
      remainning = remainning - minutePassed * basedMinutes;
      secondPassed = remainning / 1000;
      result += secondPassed < 10 ? `0${secondPassed}` : secondPassed;
    }
    return result;
};


