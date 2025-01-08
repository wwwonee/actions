import axios from "axios";

const baseURL = "http://172.20.10.2:3000";

export const http = (method: string, url: string, data = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${baseURL}${url}`,
            data: method === 'POST' || method === 'PUT' ? data : null,
            params: method === 'GET' || method === 'DELETE' ? data : null, // GET 和 DELETE 请求参数
        })
            .then((response: any) => {
                if (response.data.code >= 200 && response.data.code < 300) {
                    resolve(response.data); // 返回响应数据
                } else {
                    reject(response.data); // 返回错误
                }
            })
            .catch((error: any) => {
                reject(error); // 返回错误
            });
    });
};
