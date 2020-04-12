import React, { Component } from 'react'
import { Button, Modal, message } from 'antd'
import PropTypes from 'prop-types'
import { getTables } from '@/services/table.js'
import './style.less'
import './style.css'


class TablePage extends Component {
    state = {
        showClone:false,
        total: 0
    }
    componentDidMount() {
        message.info('antd')
        getTables({
            owner: window.localStorage.realname
        }).then(res => {
            this.setState({
                total: res.total
            })
        })
    }

    render() {
        return (
            <>
                <div className='options'>
                    <Button onClick={() => this.props.history.push('/table-search')}>数据检索</Button>
                    <Button type='primary' onClick={() => this.props.history.push('/create-table')}>新建数据表</Button>
                    <Button type='primary' onClick={() => this.setState({ showClone: true })}>克隆数据表</Button>
                    <Button type='primary' onClick={() => this.props.history.push('/auth-manage')} disabled={!this.state.total}>授权管理</Button>
                </div>
                <p className='hhhh'>fdfasdfsa</p>
                <Button type='primary'>primary</Button>
                <p className='btntest'>fdsafsdggfkdgjdsllgdjlgj</p>
                <p>fdsf322367676767676767667</p>
            </>
        )
    }
}

TablePage.propTypes = {
    history: PropTypes.object // React-Router API
}

export default TablePage
