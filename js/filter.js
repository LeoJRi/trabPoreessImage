const filter = {
    getSelectedDimension: function(){
        var selectDimension = document.getElementsByTagName("select")[0];
        var selectInstance = M.FormSelect.getInstance(selectDimension);

        console.log(selectInstance.input.value.split('x')[0].trim());

        return selectInstance.input.value.split('x')[0].trim();
    },
    averageFilter: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = averageFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    minValue: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = minimumFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    maxValue: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = maximumFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    median: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = medianFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    order: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = maximumFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    smoothing: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = smoothingFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    gaussian: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = gaussianFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    }
}