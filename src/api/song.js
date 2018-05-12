import { commonParams } from './config'
import axios from 'axios'

export function getLyric (mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    g_tk: 67232076,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getVkey (songMid) {
  const url = '/api/getPlayVkeys'

  const data = Object.assign({}, {
    g_tk: 1586143899,
    loginUin: 1103052133,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 1103052133,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    guid: 7631401125
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    // console.log(res)
    return Promise.resolve(res.data.data.items[0].vkey)
  })
}

export function getSongsKey (songMids) {
  const url = '/api/getVkeys'
  const type = Array(songMids.length).fill(0)
  const data = Object.assign({}, {
    comm: {
      g_tk: 5381,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'json',
      platform: 'h5',
      uin: 0
    },
    url_mid: {
      method: 'CgiGetVkey',
      module: 'vkey.GetVkeyServer',
      param: {
        guid: '7052901565',
        loginflag: 0,
        platform: '23',
        songmid: songMids,
        songtype: type,
        uin: '0'
      }
    }
  })
  return axios.post(url, data).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}