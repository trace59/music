import axios from 'axios'
import {commonParams} from 'api/config'

export function getHotKey() {
  const url = '/api/getHotKey'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    format: 'json',
    g_tk: 999222372
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function search(query, page, zhida, perpage) {
  const url = '/api/search'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    format: 'json',
    g_tk: 999222372,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    n: 20,
    perpage,
    h: perpage,
    remoteplace: 'txt.mqq.all',
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}