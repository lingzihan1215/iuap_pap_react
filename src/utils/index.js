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