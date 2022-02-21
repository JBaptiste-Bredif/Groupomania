const multer = require('multer')
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    name = file.originalname.split('.')[0]
    name = name.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + '_' + Date.now() + '.' + extension)
  }
})

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext.toUpperCase() !== '.PNG' && ext.toUpperCase() !== '.JPG' && ext.toUpperCase() !== '.GIF' && ext.toUpperCase() !== '.JPEG') {
      return callback(null, false) // Multer bloque le fichier, la requête continue comme si le fichier n'avais jamais était envoyé
    }
    callback(null, true)
  },
}).single('image')