const minimumFilter = {
  apply: function(matrix, width, filterSize) {
    console.log(filterSize);

    const lineSeparated = separateMatrixIntoLines(matrix, width);
    const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
    const img2 = JSON.parse(JSON.stringify(lineAndChunkSeparated));
    const kernelSize = (filterSize - 1) / 2;

    for (let i = kernelSize; i < lineAndChunkSeparated.length - kernelSize; i++) {
      for (let j = kernelSize; j < lineAndChunkSeparated[i].length - kernelSize; j++) {
        let totalPixelSum = [[], [], [], []];

        for (let l = i - kernelSize; l <= i + kernelSize; l++) {
          for (let m = j - kernelSize; m <= j + kernelSize; m++) {
            if (l == i && m == j) {
              continue;
            } else {
              totalPixelSum[0].push(lineAndChunkSeparated[l][m][0]);
              totalPixelSum[1].push(lineAndChunkSeparated[l][m][1]);
              totalPixelSum[2].push(lineAndChunkSeparated[l][m][2]);
            }
          }
        }

        img2[i][j][0] = Math.min(...totalPixelSum[0]);
        img2[i][j][1] = Math.min(...totalPixelSum[1]);
        img2[i][j][2] = Math.min(...totalPixelSum[2]);
        img2[i][j][3] = 255;
      }
    }

    return flattenV2(img2);
  }
}

