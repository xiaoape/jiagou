import dva from 'dva'
import { message } from 'antd'



const app = dva({
    history: require('history').createBrowserHistory(),
    onError: e => message.error(e.message)
})

// app.model(table)
app.router(require('./router').default)
app.start('#root')