// multerConfig.js
const multer = require('multer');
const shortid =require('shortid');
// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    const extencion = file.mimetype.split('/')[1];
    const imageName = `${shortid.generate()}.${extencion}`;
    cb(null, imageName); // Nombre del archivo en el servidor
    file.originalname=imageName;
  },
});

const upload = multer({ storage: storage });

// Controlador para cargar una imagen y crear una publicación

exports.uploadFile = (req, res,next) => {
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Error al subir archivo:', err);
      return res.status(500).send('Error al subir archivo');
    }
    next();
  });
};