// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'

export function getRecommend () {
  const url = '/api/getRecommend'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    _: 1522744403237
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPlayList () {
  const url = '/api/getPlayList'

  const data = Object.assign({}, commonParams, {
    needNewCode: 0,
    categoryId: 10000000,
    format: 'json', // 因为使用axios,所以请求数据的应该是json
    sortId: 5,
    sin: 0,
    ein: 29,
    platform: 'yqq',
    hostUin: 0,
    rnd: Math.random()
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList (disstid) {
  const url = '/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0,
    g_tk: 1928093487
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}