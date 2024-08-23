import multer from "multer"
//middleware it copy from https://github.com/expressjs/multer DiskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      //cb -->callback
    }
  })
  
 export const upload = multer({
     storage,
    })
  