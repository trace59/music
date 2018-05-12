import { commonParams } from './config'
import axios from 'axios'

export function getToplist() {
  const url = '/api/getTopList'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    g_tk: 5381,
    format: 'json',
    uin: 0,
    notice: 0
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid) {
  const url = '/api/getDetailToplist'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    page: 'detail',
    loginUin: 0,
    hostUin: 0,
    song_begin: 0,
    song_num: 30,
    needNewCode: 1,
    type: 'top',
    format: 'json',
    notice: 0,
    g_tk: 999222372,
    topid
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}