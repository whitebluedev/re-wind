/**
 * 
 *            888                                               .d8888b.   .d8888b.  
 *          888                                               d88P  Y88b d88P  Y88b 
 *         888                                                     .d88P 888        
 *     .d88888  .d88b.  888  888        888  888 .d8888b         8888"  888d888b.  
 *   d88" 888 d8P  Y8b 888  888       888  888 88K               "Y8b. 888P "Y88b 
 *  888  888 88888888 Y88  88P      888  888 "Y8888b.      888    888 888    888 
 *  Y88b 888 Y8b.      Y8bd8P       Y88b 888      X88      Y88b  d88P Y88b  d88P 
 *  "Y88888  "Y8888    Y88P         "Y88888  88888P'       "Y8888P"   "Y8888P"  
 *                                     888                                       
 *                               Y8b d88P                                       
 *                                "Y88P"                                        
 * 
 * @author dev-ys-36
 * @link https://github.com/dev-ys-36
 * @license MIT LICENSE
 * 
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 * 
 */

const requestIp = require('request-ip')

const passport = require('passport')
const request = require('request-promise')

const mysql = require('../config/mysql')
const loggerUtil = require('../utils/logger')

module.exports.loginCheck = (req, res, next) => {
  if (typeof(req.user) !== 'undefined'){
    //res.status(400).json({ status: 'fail' })
    res.redirect('https://re-wind.today')
    return
  }
  
  next()
}

module.exports.logoutCheck = (req, res, next) => {
  if (typeof(req.user) === 'undefined'){
    //res.status(400).json({ status: 'fail' })
    res.redirect('https://re-wind.today')
    return
  }

  if (req.user.type !== 'kakao'){
    //res.status(400).json({ status: 'fail' })
    res.redirect('https://re-wind.today')
    return
  }
  
  next()
}

module.exports.login = passport.authenticate('kakao')

module.exports.logout = async(req, res) => {
  const option = {
    uri: 'https://kapi.kakao.com/v1/user/unlink',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + req.user.token
    },
    json: true
  }

  await request(option)
  .then((body) => {
    res.redirect('https://re-wind.today/vote')
  })
  .catch((error) => {
    res.redirect('https://re-wind.today/vote')
  })
  req.logout((error) => { if (error) throw error })
}

module.exports.callback = passport.authenticate('kakao', {
  successRedirect: 'https://re-wind.today/vote',
  failureRedirect: 'https://re-wind.today/vote',
})
