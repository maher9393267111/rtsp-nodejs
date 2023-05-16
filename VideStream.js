const videoStream = require('./index');
let express = require('express');
let path = require('path');
let app = express();
const findRemoveSync = require('find-remove')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));


app.get('/', function(req, res, next) {
    res.status(200).json('server work successfully')
  //  res.sendFile(__dirname+'/index.html');
});

app.get('/stream', function(req, res, next) {
    res.sendFile(__dirname+'/index.html');
});


const options = {
    url : 'rtsp://185.217.90.19:554/11',
    //'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
    segmentFolder : __dirname + '/videos',
    ffmpegOptions : {  //ffmpeg option.
        // If you have a ffmpeg option you want to add, write it down here.
        '-hls_time': '30', // If the same option is set, it is possible to change the value.
        'ultrafast':undefined // single option other than the key-value type, it can be set by setting the value to undefined.
    },
}
//const stream = new videoStream(options);
//stream.start();








app.listen(3000);



