var express = require('express')
var config = require('./config/index')
var axios = require('axios')
const bodyParser = require('body-parser')
var port = process.env.PORT || config.build.port

var app = express()

var volData = require('./data.json')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var apiRoutes = express.Router()

apiRoutes.get('/getRecommend', function (req, res) {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com',
      origin: 'm.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getPlayList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getCdInfo', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /^\w+\(({.+})\)$/
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getTopList', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com',
      origin: 'https://m.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getDetailToplist', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getHotKey', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/',
      origin: 'https://m.y.qq.com/'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/volData', function (req, res) {
  res.json({
    errno: 0,
    data: volData
  })
});

apiRoutes.get('/search', function (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  console.log(req.query, 2222)
  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/',
      origin: 'https://m.y.qq.com/'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});

apiRoutes.get('/getPlayVkeys', function (req, res) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
});

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})