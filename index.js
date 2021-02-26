const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const { response } = require('express');
const fileUpload = require('express-fileupload');
const { request } = require('http');

const mongoose = require('mongoose');

// Determine the environment
if(process.env.NODE_ENV === 'development') {
    var env = 'dev';
} 

if(process.env.NODE_ENV === 'production') {
    var env = 'prod';
}

// Load environment specific properties
const customEnv = require('custom-env').env(true);

// Generate connection string depending on the environment
const connectionString = process.env.DB_HOST.replace('<username>', process.env.DB_USER).replace('<password>', process.env.DB_PASS);

// Connect to DB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Create DB Schema
const fileDBSchema = new mongoose.Schema({
    file_name: String,
    file_size: Number,
    env: String
});

// Create Schema Model
const fileModel = mongoose.model('file_details', fileDBSchema);



// Invoke file upload middleware
app.use(fileUpload());

// Serve UI to client
app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
    console.log(process.env);
});

// Receive file, move it to environment specific folder and add details to DB
app.post('/', (request, response) => {
    if(request.files) {
        const file = request.files.file;
        const fileName = file.name;
        const fileSize = file.size;
        const uploadPath = path.resolve(__dirname, process.env.UPLOADS_FOLDER, fileName);
        file.mv(uploadPath, err => {
            if(err) {
                response.send(err);
            } else {
                const fileDetailsObj = new fileModel({
                    file_name: fileName,
                    file_size: fileSize,
                    env: process.env.DB_USER
                });
                fileDetailsObj.save().then(doc => {console.log(doc)}).catch(err => {console.log('ERROR', err)});
                response.send('File was uploaded successfully');
            }
        });

    }
});

// Listen for connections on port 8080
http.listen(8000, () => {
    console.log('listening on port 8080');
});
