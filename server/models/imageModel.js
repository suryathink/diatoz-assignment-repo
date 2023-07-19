const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    download_url: {
        type: String,
        required: true,
    },
   
})


const ImageModel = mongoose.model('ImageModel',imageSchema);

module.exports = ImageModel;


/*
{
"id": "0",
"author": "Alejandro Escamilla",
"width": 5000,
"height": 3333,
"url": "https://unsplash.com/photos/yC-Yzbqy7PY",
"download_url": "https://picsum.photos/id/0/5000/3333"
},
*/