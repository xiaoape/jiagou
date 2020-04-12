import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import { ConfigProvider } from 'antd'
import cn from 'antd/lib/locale-provider/zh_CN'
import PropTypes from 'prop-types'

import {
    TablePage, // 数据表列表
} from './routes'

function RouterConfig({ history }) {
    return (
            <ConfigProvider locale={cn}>
                <Router history={history}>
                    <Switch>
                            <Route path='/' exact component={TablePage} />
                    </Switch>
                </Router>
            </ConfigProvider>
    )
}

RouterConfig.propTypes = {
    history: PropTypes.object
}

export default RouterConfig
