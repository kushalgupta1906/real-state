import multer from "multer";
//export const upload=multer({dest:"public/temp/"})
 const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"backend/public/temp")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
 export const upload=multer({storage,})
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "..", "..", "public", "images"));
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// export const upload = multer({ storage: storage });
