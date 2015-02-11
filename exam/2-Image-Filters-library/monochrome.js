var Q = require('q');

function Monochrome = {

}

Monochrome.prototype.applyKernel = function(image, kernel){
  var result = createBlankImage(image),
      deferred = Q.defer();

  calculateImage(image, kernel, [0,0], result, deferred);

  return deferred.promise;
}

Monochrome.prototype.edgeDetection = function(image){
  var edgeDetection = [
        [1, 0, -1],
        [0, 0, 0],
        [-1, 0, 1],
    ];

  return this.applyKernel(image, edgeDetection);
}

Monochrome.prototype.boxBlur = function(image){
  var boxBlur = [
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9],
    ];

  return this.applyKernel(image, boxBlur);
}

function calculatePixel(image, kernel, position){
  var sum = 0,
      offset = (kernel.length - 1)/2;

  kernel.forEach(function(row, rowIndex){
    row.forEach(function(value, columnIndex){
      var pixelRowIndex = rowIndex - offset + position[0],
          pixelColumnIndex = columnIndex - offset + position[1],
          pixelValue = 0;

  if (pixelRowIndex >= 0 && pixelRowIndex < image.length &&
      pixelColumnIndex >= 0 && pixelColumnIndex < image[0].length){

    pixelValue = image[pixelRowIndex][pixelColumnIndex];
  }

  sum += pixelValue * value;
    })
  })
  return sum;
}

function calculateImage(image, kernel, lastPosition, result, deferred){
  if (lastPosition[0] === image.length - 1 &&
    lastPosition[1] === image[0].length - 1){

    deferred.resolve(result);
  }
  else{
    setImmediate(function(){
      var nextPosition = lastPosition;
      nextPosition[1]++;

      if (nextPosition[1] === image[0].length){
        nextPosition[1] = 0;
        nextPosition[0] ++;
      }

      result[nextPosition[0]][nextPosition[1]] = calculatePixel(image, kernel, nextPosition);

      calculateImage(image, kernel, nextPosition, result, deferred);
    })
  }
}

function createBlankImage(image){
  var blank_image = [];
  image.forEach(function(row, rowIndex){
    blank_image[rowIndex] = [];
    row.forEach(function(value, columnIndex){
      blank_image[rowIndex][columnIndex] = 0;
    });
  });
  return blank_image;
}



module.exports = Monochrome;
