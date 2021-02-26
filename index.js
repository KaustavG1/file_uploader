const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const { response } = require('express');
const fileUpload = require('express-fileupload');
const { request } = require('http');

<<<<<<< HEAD
if(process.env.NODE_ENV === 'development') {
    var env = 'dev';
} 

if(process.env.NODE_ENV === 'production') {
    var env = 'prod';
}

const customEnv = require('custom-env').env(true);

// app.use(fileUpload({ useTempFiles : true, tempFileDir : '/tmp/' }));
app.use(fileUpload());
// console.log(process.env.NODE_ENV);

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
    console.log(process.env);
=======
app.use(fileUpload({ useTempFiles : true, tempFileDir : '/tmp/' }));

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
>>>>>>> 01adc819b82b7ae9cdf6c5679eac630de3461e22
});

app.post('/', (request, response) => {
    if(request.files) {
        const file = request.files.file;
        const fileName = file.name;
<<<<<<< HEAD
        const uploadPath = path.resolve(__dirname, process.env.UPLOADS_FOLDER, fileName);
=======
        const uploadPath = path.resolve(__dirname, 'uploads', fileName);
>>>>>>> 01adc819b82b7ae9cdf6c5679eac630de3461e22
        file.mv(uploadPath, err => {
            if(err) {
                response.send(err);
            } else {
                response.send('File was uploaded successfully');
            }
        });

    }
});

http.listen(8000, () => {
    console.log('listening on port 8080');
});