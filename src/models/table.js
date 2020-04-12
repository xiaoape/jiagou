// import { getLabels } from '@/services/tableService'
// import { getConnectors } from '@/services/connectorService'

// export default {
//     namespace: 'table',

//     state: {
//         labels: { // 所有标签
//             project: [],
//             data_type: [],
//             environment: []
//         },
//         connectors: []
//     },

//     effects: {
//         * fetchConnector({ payload }, { call, put }) {
//             let connector = yield call(getConnectors, { settings: true })
//             if (connector) {
//                 yield put({
//                     type: 'changeState',
//                     payload: {
//                         ...connector
//                     }
//                 })
//             }
//         },

//         * fetchLabels({ payload }, { call, put }) {
//             let labels = yield call(getLabels)
//             if (labels) {
//                 yield put({
//                     type: 'changeState',
//                     payload: {
//                         labels
//                     }
//                 })
//             }
//         }

//     },

//     reducers: {
//         changeState(state, action) {
//             return { ...state, ...action.payload }
//         }
//     }
// }
