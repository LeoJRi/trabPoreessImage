const mirror = {
    start: async function(image) {
        const [imageData] = await Promise.all([getImageData(image)]);
        const mirrorMatrix = this.mirror(imageData, image.width);
        //var imageMirror = matrixToImage(mirrorMatrix, image.width, image.height)

        const concatResult = this.concatImage(imageData.data, mirrorMatrix, image.width);
        //const imageConcat = matrixToImage(concatResult, image.width * 2, image.height);

        const result = matrixToImage(concatResult, image.width * 2, image.height);

        showResult(result, "display-image-result");
    }, 
    mirror: function(imageData, width) {
        //const imageData = getImageData(image);

        const lineSeparated = separateMatrixIntoLines(imageData.data, width);
        const flipped = lineSeparated.map(line => this.flipLine(line));

        return flatten(flipped);
    },
    flipLine: function(line) {
        const flippedLine = [];

        for (let i = line.length - 4; i >= 0; i -= 4) {
            const pixel = line.slice(i, i + 4);
            pixel.forEach(pxValue => flippedLine.push(pxValue));
        }

        return flippedLine;
    },
    concatImage: function(img1, img2, imgWidth) {
        const [lineSeparated1, lineSeparated2] = [
            separateMatrixIntoLines(img1, imgWidth), 
            separateMatrixIntoLines(img2, imgWidth)
        ];
        const concat = lineSeparated1.map((line, idx) => [...line, ...lineSeparated2[idx]]);

        return flatten(concat);
    }
}