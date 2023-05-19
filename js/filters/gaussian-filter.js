const gaussianFilter = {
  apply: function(matrix, width, filterSize) {
    const lineSeparated = separateMatrixIntoLines(matrix, width);
    const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
    const img2 = JSON.parse(JSON.stringify(lineAndChunkSeparated));
    const kernelSize = (filterSize - 1) / 2;
    const bias = 4;

    for (let i = kernelSize; i < lineAndChunkSeparated.length - kernelSize; i++) {
      for (let j = kernelSize; j < lineAndChunkSeparated[i].length - kernelSize; j++) {
        let totalPixelSum = [0,0,0,0];
        let div = 0;

        for (let l = i - kernelSize; l <= i + kernelSize; l++) {
          for (let m = j - kernelSize; m <= j + kernelSize; m++) {
            const val = (1 / (2 * Math.PI * (bias * bias))) * Math.exp(-1 * ((l * l) * (m * m)) / (2 * bias * bias));
            totalPixelSum[0] += lineAndChunkSeparated[l][m][0] * val;
            totalPixelSum[1] += lineAndChunkSeparated[l][m][1] * val;
            totalPixelSum[2] += lineAndChunkSeparated[l][m][2] * val;
            div += val;
          }
        }

        img2[i][j][0] = Math.floor(totalPixelSum[0] / div);
        img2[i][j][1] = Math.floor(totalPixelSum[1] / div);
        img2[i][j][2] = Math.floor(totalPixelSum[2] / div);
        img2[i][j][3] = 255;
      }
    }

    return flattenV2(img2);
  }
}
