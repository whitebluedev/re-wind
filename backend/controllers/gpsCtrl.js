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


const request = require('request-promise')

const secuUtil = require('../utils/secu')

module.exports.gpsShow = (req, res) => {
  res.status(200).render('gps')
}

module.exports.gpsCheck = async(req, res) => {
  const { x, y } = req.body

  const option = {
    uri: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=' + x + '&y=' + y,
    method: 'POST',
    headers: {
      'Authorization' : 'KakaoAK ' + Buffer.from(secuUtil.kakaoClientID, 'base64').toString('utf8')
    },
    json: true
  }

  const out = await request(option, (error, res, body) => {
    if (!error){
      return res
    }
  })

  console.log(out.documents[0].address_name)

  if (out.documents[0].address_name != '서울특별시 강북구 번동'){
    res.status(400).json({ 'status': 400 })
    return
  }

  res.status(200).json({ 'status': 200 })
}
