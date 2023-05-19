function getImageData(image) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    const imageDataObj = context.getImageData(0, 0, image.width, image.height);
    
    return imageDataObj;
}

function imageDataToImage(imagedata) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    let image = new Image();
    image.src = canvas.toDataURL();

    return image;
}

function matrixToImageData(matrix, width, height) {
    const typedArray = new Uint8ClampedArray(matrix.length);
    for (let i = 0; i < matrix.length - 4; i += 4) {
      typedArray[i] = matrix[i];
      typedArray[i+ 1] = matrix[i + 1];
      typedArray[i + 2] = matrix[i + 2];
      typedArray[i + 3] = 255;
    }

    const imgData = new ImageData(typedArray, width, height);

    return imgData;
}

function matrixToImage(matrix, width, height){
    const imageData = matrixToImageData(matrix, width, height);
    const image = imageDataToImage(imageData);

    return image;
}

function truncateValues(value) {
    return value > 255 ? 255 : value;
}

function resolveOverflowToMinimun(value) {
    return value > 255 ? 0 : value;
}

function resolveOverflow(value){
    if(value === Infinity) {
        return 255;
    }

    return value > 255 ? value % 255 : value;
}

function resolveUnderflow(value) {
    return value < 0 ? 0 : value;
}

function showResult(image, divId) {
    let outputResult = document.getElementById(divId);
    outputResult.src = image.src;
}

function flatten(flipped) {
    return flipped.reduce((acc, curr) => acc = [...acc, ...curr], []);
}

function flattenV2(arr) {
    const result = [];
    arr.forEach(line => line.forEach(pixelChunk => pixelChunk.forEach(pixelVal => result.push(pixelVal))));

    return result;
}

function separateMatrixIntoLines(matrix, width) {
    const result = [];
    
    for (let i = 0; i < matrix.length; i += width * 4) {
        result.push(matrix.slice(i, i + width * 4));
    }

    return result;
}

function separateChunkIntoPixels(matrix) {
    return matrix.map(line => {
        const newLine = [];
        for (let i = 0; i < line.length; i += 4) {
        const pixelChunk = [line[i], line[i + 1], line[i + 2], line[i + 3]];
        newLine.push(pixelChunk);
        }

        return newLine;
    });
}

const transformToDrawChart = (arr) => arr.map((item, idx) => [idx, item]);