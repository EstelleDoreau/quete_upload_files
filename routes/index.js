// Challenge
// Send me some pics
// Dans ton dossier contenant ton projet généré avec l'express-generator, tu vas créer une nouvelle route dans routes/index.js ; cette route sera en POST (/monupload) et permettra de gérer l'upload de fichiers.
// L'utilisateur pourra envoyer envoyer des images, seulement au format *.png et avec une taille inférieure à 3mo.

// Tu peux informer l'utilisateur du type de format accepté (png) grâce à l'attribut HTML accept.

// Le code sera disponible sur github.

// Critéres de validation
// Le code permet l'upload de plusieurs fichiers
// Le code bloque les fichiers supérieur à 3mo
// Le code n'accepte que les fichiers avec le mimetype image/png

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ 
  dest: 'tmp/',
  limits: { fileSize: 3000000 }
});
const fs = require('fs'); 
var app = express();

router.get('/monupload', function(req, res, next) {
  res.render('monupload', { file: req.file });
});

// envoi d'un seul fichier
// router.post('/uploaddufichier', upload.single('monfichier'), function (req, res, next) {
//   // traitement du formulaire 
//   console.log(req.file);
//   fs.rename(req.file.path, 'public/images/' + req.file.originalname, function(err){
//     if (err) {
//         res.send('problème durant le déplacement'); 
//     } else {
//         res.send('Fichier uploadé avec succès'); 
//     }
//   }); 
// })

// envoi de plusieurs fichiers limité à 5
router.post('/uploaddufichier', upload.array('monfichier', 5), function (req, res, next) {
  // traitement du formulaire 
  console.log(req.files);

  for(let i = 0; i < req.files.length; i++) {
    fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function(err){
      if (err) {
          res.send('problème durant le déplacement'); 
      } else {
          res.send('Fichier uploadé avec succès'); 
      }
    }); 
  }
})
module.exports = router;