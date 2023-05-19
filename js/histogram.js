const histogram = {
    drawChart: function(values, title, divId) {
        const data = google.visualization.arrayToDataTable([
          ["Pixel Value", "Quantity"],
          ...values
        ]);
        
        const options = {
          title,
          legend: { position: "none" },
        };
  
        const chart = new google.visualization.ColumnChart(
          document.getElementById(divId)
        );
        chart.draw(data, options);
    },
    generate: function (matrix, width) {
      let minValue = 9999999999;
      const pixelCount = [];
      const cumulative = [];
      const newImagePixels = [];
    
      for (let i = 0; i < 256; i++) {
        pixelCount[i] = 0;
        cumulative[i] = 0;
      }
    
      for (let i = 0; i < matrix.length; i += 4) {
        pixelCount[matrix[i]]++;
      }
    
      for (let i = 0; i < pixelCount.length; i++) {
        if (i === 0) {
          cumulative[i] = pixelCount[i];
          continue;
        }
    
        cumulative[i] = cumulative[i - 1] + pixelCount[i];
      }
    
      minValue = cumulative[0];
    
      for (let i = 0; i < matrix.length; i += 4) {
        const firstDivision = cumulative[matrix[i]] - minValue;
        const squaredWidth = width * width;
        const secondDivision = squaredWidth - minValue;
    
        const result = Math.floor((firstDivision / secondDivision) * 255);
        newImagePixels[i] = result;
        newImagePixels[i + 1] = result;
        newImagePixels[i + 2] = result;
        newImagePixels[i + 3] = 255;
      }
    
      return [newImagePixels, pixelCount];
    },
    start: function (image) {
      const originalImageData = getImageData(image);

      console.info("Source image:", originalImageData);

      const [histogramResult, oldDistribution] = this.generate(originalImageData.data, originalImageData.width);
      const [, newDistribution] = this.generate(histogramResult, originalImageData.width);

      const oldChartValues = transformToDrawChart(oldDistribution);
      const newChartValues = transformToDrawChart(newDistribution);

      console.log(oldChartValues)

      this.drawChart(oldChartValues, '', 'source-histogram');
      this.drawChart(newChartValues, '','result-histogram');

      const resultImage = matrixToImage(histogramResult, image.width, image.height);
      showResult(resultImage, "display-image-equality");
    }
}
