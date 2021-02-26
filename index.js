const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const { response } = require('express');
const fileUpload = require('express-fileupload');
const { request } = require('http');

app.use(fileUpload({ useTempFiles : true, tempFileDir : '/tmp/' }));

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post('/', (request, response) => {
    if(request.files) {
        const file = request.files.file;
        const fileName = file.name;
        const uploadPath = path.resolve(__dirname, 'uploads', fileName);
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