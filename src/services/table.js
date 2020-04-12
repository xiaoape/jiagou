import fetch from 'dva/fetch'

const root = 'https://alpha-dayu.aidigger.com/api/v2'

export const getTables = params => fetch(`${root}/tables`,{
    method: 'GET',                            //请求方式    (可以自己添加header的参数)    
    mode: 'cors',// 避免cors攻击
    credentials: 'include'  
})

