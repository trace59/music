import jsonp from 'common/js/jsonp'
// import axios from 'axios'
// import Qs from 'qs'
import { commonParams, options } from './config'

export function getSingerList () { // 获取歌单
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) { // 获取歌手信息
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 5381,
    singermid: singerId
  })

  return jsonp(url, data, options)
}

// export function getSongsKey (songMids) {
//   const url = '/api/getPlayVkeys'
//   const type = Array(songMids.length).fill(0)
//   const data = Object.assign({}, {
//     comm: {
//       g_tk: 5381,
//       inCharset: 'utf-8',
//       outCharset: 'utf-8',
//       notice: 0,
//       format: 'json',
//       platform: 'h5',
//       uin: 0
//     },
//     url_mid: {
//       method: 'CgiGetVkey',
//       module: 'vkey.GetVkeyServer',
//       param: {
//         guid: '7052901565',
//         loginflag: 0,
//         platform: '23',
//         songmid: songMids,
//         songtype: type,
//         uin: '0'
//       }
//     }
//   })
//   return axios.post(url, data).then((res) => {
//     console.log(res)
//     return Promise.resolve(res.data)
//   })
// }
