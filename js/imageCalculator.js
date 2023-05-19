class ImageCalculator {
    
    static addition(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            finalImageData.data[pixelsLenght] = image_one.data[pixelsLenght] * 0.5 
                + image_two.data[pixelsLenght] * 0.5;
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
      
    }
    //Subtração de 50% do pixel da segunda imagem
    static subtraction(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let subtractedPixel = image_one.data[pixelsLenght] - image_two.data[pixelsLenght] * 0.5;
            finalImageData.data[pixelsLenght] = resolveUnderflow(subtractedPixel);
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }
    //Para uma melhor visualização foi multiplicado 15% de cada pixel.
    //E truncando o pixel que excede o valor de 255 em 255.
    static multiplication(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght] * 0.15) * (image_two.data[pixelsLenght] * 0.15);
            finalImageData.data[pixelsLenght] = truncateValues(pixelMultiplied);
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }
    //ToFix
    static division(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        for(let i = 0; i < pixelsLenght; i+=4){
            let red = Math.ceil(image_one.data[i] / image_two.data[i]);
            let green = Math.ceil(image_one.data[i + 1] / image_two.data[i + 1]);
            let blue = Math.ceil(image_one.data[i + 2] / image_two.data[i + 2]);
            //let alpha = Math.ceil(image_one.data[i + 3] / image_two.data[i + 3]);
            let alpha = 180;

            finalImageData.data[i] = red;
            finalImageData.data[i + 1] = green;
            finalImageData.data[i + 2] = blue;
            finalImageData.data[i + 3] = alpha;
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static average(img_one, img_two) {
        calculator.addition(img_one, img_two);
    }

    static blending(img_one, img_two, k) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght] * k) + (image_two.data[pixelsLenght] * (1 - k));
            finalImageData.data[pixelsLenght] = Math.abs(truncateValues(pixelMultiplied));
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static not(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) + (image_two.data[pixelsLenght]);
            finalImageData.data[pixelsLenght] = 255 - resolveOverflow(pixelMultiplied);
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }
    
    static or(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) | (image_two.data[pixelsLenght]);
            finalImageData.data[pixelsLenght] = pixelMultiplied;
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static and(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) & (image_two.data[pixelsLenght]);
            finalImageData.data[pixelsLenght] = pixelMultiplied;
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static xor(img_one, img_two){
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_two.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) ^ (image_two.data[pixelsLenght] * 0.3);
            finalImageData.data[pixelsLenght] = resolveOverflow(pixelMultiplied);
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static createImage(width, height) {
        let image_temp = new Image();
        image_temp.width = width;
        image_temp.height = height;

        return getImageData(image_temp);
    }
}

