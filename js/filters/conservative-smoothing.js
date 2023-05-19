const smoothingFilter = {
  apply: function(matrix, width, filterSize) {
    const lineSeparated = separateMatrixIntoLines(matrix, width);
    const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
    const kernelSize = (filterSize - 1) / 2;
    const img2 = JSON.parse(JSON.stringify(lineAndChunkSeparated));

    for (let i = kernelSize; i< lineAndChunkSeparated.length - kernelSize; i++) {
      for (let j = kernelSize; j < lineAndChunkSeparated[i].length - kernelSize; j++) {
        let maximumValue = [0, 0, 0, 0];
        let minimumValue = [256, 256, 256, 256];

        for (let l = i - kernelSize; l <= i + kernelSize; l++) {
          for (let m = j - kernelSize; m <= j + kernelSize; m++) {
            if (lineAndChunkSeparated[l] && lineAndChunkSeparated[l][m] && !(i === l && j === m)) {
              lineAndChunkSeparated[l][m].forEach((pixelVal, idx) => {
                if (maximumValue[idx] < pixelVal) {
                  maximumValue[idx] = pixelVal;
                }

                if (minimumValue[idx] > pixelVal) {
                  minimumValue[idx] = pixelVal;
                }
              });
            }
          }
        }

        lineAndChunkSeparated[i][j].forEach((pixelVal, idx) => {
          if (pixelVal > maximumValue[idx]) {
            img2[i][j][idx] = maximumValue[idx];    
          }

          if (pixelVal < minimumValue[idx]) {
            img2[i][j][idx] = minimumValue[idx];    
          }
        });

        img2[i][j][3] = 255;
      }
    }

    return flattenV2(lineAndChunkSeparated);
  }  
}