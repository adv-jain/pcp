// alert('hello from plugin')

// let elem = document.createElement('h1');
// elem.innerHTML = "inserted from pcp";
// document.querySelector('#post-body-content').append(elem)

// document.body.style.backgroundColor = "red";

document.addEventListener('DOMContentLoaded', function () {
  console.log('heres the prod')
  console.log(productObj)

  let elemCanvas = document.createElement('canvas')
  elemCanvas.setAttribute('id', 'pcp-product-page-Canvas')
  document.querySelector('.woocommerce-product-gallery__image').append(elemCanvas)

  canvas = new fabric.Canvas('pcp-product-page-Canvas');


  // document.querySelectorAll('.imgLoader')[0].onchange = function handleImage(e) {
  //   var reader = new FileReader();
  //   reader.onload = function (event) {
  //     console.log('fdsf');
  //     var imgObj = new Image();
  //     imgObj.src = event.target.result;
  //     console.log(imgObj)

  //     imgObj.onload = function () {
  //       // start fabricJS stuff
  //       console.log('inside onload imgobj....')
  //       var image = new fabric.Image(imgObj);
  //       image.set({
  //         left: productObj[0]['left'],
  //         top: productObj[0]['top'],
  //         angle: productObj[0]['angle'],
  //       });
  //       // image.scaleToWidth(productObj[0]['width'])
  //       // image.scaleToHeight(productObj[0]['height'])
  //       image.scaleToWidth(500)
  //       image.scaleToHeight(500)
  //       console.log("the height is: " +
  //         productObj[0]['height'])

  //       image.scale(0.5).setCoords();

  //       canvas.add(image);

  //       // end fabricJS stuff
  //     }

  //   }
  //   reader.readAsDataURL(e.target.files[0]);
  // }



  document.querySelectorAll('.imgLoader')[0].onchange = function (e) {
    var reader = new FileReader()
    reader.onload = function () {
      fabric.Image.fromURL(reader.result, function (img) {
        var img = img.scale(1).set({
          // left: productObj[0]['left'] != undefined ? productObj[0]['left'] : 100,
          // top: productObj[0]['top'] != undefined ? productObj[0]['top'] : 100,
          // angle: productObj[0]['angle'],
          left: 100,
          top: 186,
        });
        img.scaleToWidth(productObj[0]['width'])
        img.scaleToHeight(productObj[0]['height'])
        canvas.add(img);
      })
    }

    reader.readAsDataURL(e.target.files[0]);

  }

})