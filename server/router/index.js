const router = require('koa-router')()
const api = require('../controllers')
const tokenMiddleWare = require('../middlewares/jwt')

router.get('/userInfo/:userName', tokenMiddleWare, api.getUserInfo)
router.get('/checkstar/:userName', api.checkStar)

module.exports = router
