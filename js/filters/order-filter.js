function orderFilter(matrix, width, order = 1, filterSize=3) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const img2 = JSON.parse(JSON.stringify(lineAndChunkSeparated));
  const kernelSize = (filterSize - 1) / 2;

  for (let i = kernelSize; i < lineAndChunkSeparated.length - kernelSize; i++) {
    for (let j = kernelSize; j < lineAndChunkSeparated[i].length - kernelSize; j++) {
      let median = [[], [], [], []];
      for (let l = i - kernelSize; l <= i + kernelSize; l++) {
        for (let m = j - kernelSize; m <= j + kernelSize; m++) {
          lineAndChunkSeparated[l][m].forEach((pixelVal, idx) => {
            median[idx].push(pixelVal);
          });
        }
      }

      median.forEach(arr => arr.sort());
      img2[i][j][0] = median[0][order];
      img2[i][j][1] = median[1][order];
      img2[i][j][2] = median[2][order];
      img2[i][j][3] = 255;
    }
  }

  return flattenV2(img2);  
}

