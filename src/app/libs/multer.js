import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/gif' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb({'error': 'Le format supporté est : gif, jpg, jpeg, png'}, false)
  }
  
}

const upload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024},
  fileFilter
})

export default upload
