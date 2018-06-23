import ReactDOM from 'react-dom';
import { Message } from 'tinper-bee';


export const success = (msg) => {
    Message.create({ content: msg, color : 'success'  });
}

export const Error = (msg) => {
    Message.create({ content: msg, color : 'danger'  });
}

export const Warning = (msg) => {
    Message.create({ content: msg, color : 'warning' });
}

export const processData = (response,successMsg) => {
    if(response.status=='200'){
        let data=response.data;
        if(data.success=='success'){
            if(successMsg){
                success(successMsg);
            }
            return data.detailMsg.data;
        }else{
            Error(data.message||'数据返回出错');
            return;
        }
    }else{
        Error('请求错误');
        return;
    }
}

/**
 * param拼接到url地址上
 * @param {*} url 
 * @param {*} params
 * @param {*} prefix 
 */
export const paramToUrl = (url,params,prefix) =>{
    if(!prefix)prefix='';
    if(url.indexOf('?')==-1){
        url += '?1=1';
    }
    for(let attr in params){
        if((attr=='pageIndex')&&(attr=='pageSize')){
            url+='&'+attr+'='+params[attr];
        }else{
            url+='&'+prefix+attr+'='+params[attr];
        }
    }
    return url;
}