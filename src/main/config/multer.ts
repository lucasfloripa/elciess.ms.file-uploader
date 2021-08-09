import multer from 'multer'

const tmpFilePath = `${__dirname}/../../tmp`

const multerConfig = {
  dest: tmpFilePath,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tmpFilePath)
    }
  })
}

const multerUpload = multer(multerConfig).single('file')

export { multerUpload }
