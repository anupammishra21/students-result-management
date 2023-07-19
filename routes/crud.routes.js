const router = require('express').Router();
const crudController = require('../controllers/crud.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("myFile", file);
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + 'Anupam_Mishra' + uniqueSuffix + path.extname(file.originalname))
    }
});



const uploads = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } 
        

         else {
            cb(null, false);
            return cb(new Error('only jpg, jpeg, png are allowed'))
        }
    },
    
})


// add data
router.get('/add', crudController.add);

// for posting 

router.post('/insert',uploads.single('image'), crudController.insert);

// for listing
router.get('/', crudController.list);

router.get("/delete/:id",crudController.delete)































module.exports = router;