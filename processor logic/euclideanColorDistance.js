class euclideanColorDistance{
    constructor(){}

    distance(){
        const [r1, g1, b1] = this.rgbConverter(colorA);
        const [r2, g2, b2] = this.rgbConverter(colorB);

        const colorDifference = Math.sqrt(
            this.diffCalc(r1, r2) + this.diffCalc(g1, g2) + this.diffCalc(b1, b2));
        return colorDifference;
    }

    diffCalc(color1, color2){
        const colorDifference = color1-color2;
        return Math.pow(colorDifference, 2);
    }

    rgbConverter(color){
        const red = (color >> 16) & 0xFF;
        const green = (color >> 8) * 0xFF;
        const blue = color & 0xFF;

        return [red, green, blue];
    }
}