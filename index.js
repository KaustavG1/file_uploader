const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const { response } = require('express');
const fileUpload = require('express-fileupload');
const { request } = require('http');

if(process.env.NODE_ENV === 'development') {
    var env = 'dev';
} 

if(process.env.NODE_ENV === 'production') {
    var env = 'prod';
}

const customEnv = require('custom-env').env(true);

app.use(fileUpload());

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
    console.log(process.env);
});

app.post('/', (request, response) => {
    if(request.files) {
        const file = request.files.file;
        const fileName = file.name;
        const uploadPath = path.resolve(__dirname, process.env.UPLOADS_FOLDER, fileName);
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
