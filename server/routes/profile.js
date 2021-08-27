const express = require('express');
const router = express.Router();
const { Profile } = require("../models/Profile");
const multer = require('multer')

//=================================
//             Profile
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  var upload = multer({ storage: storage }).single("file")
  router.post('/image', (req, res) => {
    // 가져온 이미지 저장
    upload(req,res, err => {
        if (err){
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath:res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/', (req, res) => {
  // 받아온 정보들을 DB에 입력
  const profile = new Profile(req.body)
  profile.save((err) => {
    if (err) return res.status(400).json({success: false, err })
    return res.status(200).json({ success: true })
   })
})


// profile collection에 들어있는 모든 정보 가져오기
router.post('/profiles', (req, res) => {

  // profile collection에 들어 있는 모든 상품 정보를 가져오기 

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    // profile collection에 들어 있는 모든 상품 정보를 가져오기 
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm

  let findArgs = {};

  for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
            console.log('key', key)
      findArgs[key] = req.body.filters[key];
       
      }
    }


  if (term) {
      Profile.find(findArgs)
          .find({ $text: { $search: term } })
          .populate("writer")
          .sort([[sortBy, order]])
          .skip(skip)
          .limit(limit)
          .exec((err, profileInfo) => {
              if (err) return res.status(400).json({ success: false, err })
              return res.status(200).json({
                  success: true, profileInfo,
                  postSize: profileInfo.length
              })
          })
 } else {
     Profile.find(findArgs)
         .populate("writer")
         .sort([[sortBy, order]])
         .skip(skip)
         .limit(limit)
         .exec((err, profileInfo) => {
             if (err) return res.status(400).json({ success: false, err })
             return res.status(200).json({
                 success: true, profileInfo,
                 postSize: profileInfo.length
             })
         })
 }

})


//  type=array
router.get('/profiles_by_id', (req, res) => {

    let type = req.query.type
    let profileIds = req.query.id

    if (type === "array") {
        
        let ids = req.query.id.split(',')
        profileIds = ids.map(item => {
            return item
        })

    }

    // profileId를 이용해서 DB에서 profileId와 같은 상품의 정보를 가져온다.

    Profile.find({ _id: { $in: profileIds } })
        .populate('writer')
        .exec((err, profile) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(profile)
        })

})






module.exports = router;
