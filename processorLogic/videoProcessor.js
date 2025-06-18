const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

class videoProcessor{
    constructor(frameProcessor, outputFilePath){
        this.frameProcessor = frameProcessor;
        this.writer = fs.createWriteStream(outputFilePath);
    }

    async centroidToCsv(filename){
        let frameCount = 0;
        let fps = 0;

        try{
            const probeData = await this.probeVideo(filename);
            fps = Math.round(eval())
        }
    }
}