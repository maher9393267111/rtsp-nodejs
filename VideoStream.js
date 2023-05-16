const { spawn } = require('child_process');
const fs = require('fs');

class VideoStream {
    constructor(options) {
        this.url = options.url;
        this.segmentFolder = options.segmentFolder;
        this.options = ['-rtsp_transport', 'tcp',
            '-i', this.url,
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-f', 'hls',
            '-hls_time', '10',
            '-hls_list_size', '5',
            '-hls_flags', 'delete_segments',
            `${this.segmentFolder}/stream.m3u8`];
        if(options.ffmpegOptions !== undefined) {
            this.#addffmpegOptions(options.ffmpegOptions)
        }

        console.log(this.options);
    }

    start() {
        if (!fs.existsSync(this.segmentFolder)) {
            fs.mkdirSync(this.segmentFolder);
        }
        const ffmpeg = spawn('ffmpeg', this.options);
        ffmpeg.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        ffmpeg.on('close', (code) => {
            console.log(`ffmpeg process closed with code ${code}`);
        });

        return ffmpeg;
    }

    dirPath() {
        return this.segmentFolder();
    }

    #addffmpegOptions(ffmpegOptions) {
        for (const key in ffmpegOptions) {
            if (!this.options.includes(key)) {
                this.options.push(key.toString());
                if(ffmpegOptions[key] !== undefined) {
                    this.options.push(ffmpegOptions[key].toString());
                }
            } else {
                const ffmpegOptionValueIndex = this.options.indexOf(key) + 1;
                if(ffmpegOptions[key] !== undefined){
                  this.options[ffmpegOptionValueIndex] = ffmpegOptions[key].toString();
                }
            }
        }
    }
}


module.exports = VideoStream;