import 'euclideanColorDistance.js';
class distanceImageBinarizer{

    constructor(distanceFinder, threshold, targetColor){
        this.distanceFinder = distanceFinder;
        this.threshold = threshold;
        this.targetColor = targetColor;
    }

    // recieves canvas image and returns it as a 2d binary array
    toBinaryArray(image){
        if (image == null){
            throw new Error("toBinaryArrary: Image may not be null.");
        }

        // get data from canvas image
        const context = image.getContext("2d");
        const width = image.width;
        const height = image.height;

        const contextData = context.getImageData(0, 0, width, height);
        const imageData = contextData.data;

        // initialize 2d array
        const binary = [];

        for(let y = 0; y < height; y++){
            const row = [];
            for (let x = 0; x < width; x++){
                const i = (y * width + x) * 4;
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];

                const hex = (red << 16) | (green << 8) | blue;

                const difference = this.distanceFinder.distance(hex, this.targetColor);

                if (difference < this.threshold){
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            binary.push(row);
        }

        return binary;
    }

    toCanvasImage(image){
        if (image == null || image.length == 0){
            throw new Error("toCanvasImage: Array cannot be null")
        }

    }
}