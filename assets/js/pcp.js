let elem = document.createElement('div');
elem.setAttribute('id', 'pcp-wrapper')
document.querySelector('#post-body-content').append(elem)

let input = document.createElement('input')
input.setAttribute('type', 'text')
input.setAttribute('placeholder', 'Enter number of Layers')
input.setAttribute('id', 'text-input')
document.querySelector('#pcp-wrapper').append(input)

let btn = document.createElement('a')
btn.innerHTML = "Get Fields"
btn.setAttribute('id', 'pcp-getFields')
document.querySelector('#pcp-wrapper').append(btn)

let chooseImg = document.createElement('input')
chooseImg.setAttribute('type', 'file')
chooseImg.setAttribute('id', 'chooseImg')
document.querySelector('#pcp-wrapper').append(chooseImg);

let pcpWrapperImage = document.createElement('div')
pcpWrapperImage.setAttribute('id', 'pcp-wrapper-image')
document.querySelector('#pcp-wrapper').append(pcpWrapperImage)


document.querySelector('#pcp-getFields').addEventListener('click', function () {
  let val = document.querySelector('#text-input').value
  console.log(val)
  let elem;
  let label;
  for (let i = 1; i <= val; i++) {

    elem = document.createElement('input')
    elem.setAttribute('class', 'pcp-input-field')
    if (i == 1) {
      elem.setAttribute('id', 'pcp-input-field-text')
      elem.setAttribute('placeholder', 'text #' + i)
    } else {
      elem.setAttribute('placeholder', 'Image #' + i)
      // elem.setAttribute('value', 'Image #' + i)
    }
    document.querySelector('#pcp-wrapper').append(elem)

  }
})








let fileInput = document.querySelector('#chooseImg')
fileInput.addEventListener('change', function () {
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    // Validate file type (e.g., only images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please select an image file (JPEG, PNG, or GIF).');
      return;
    }

    let pcpImg = document.createElement('img')
    pcpImg.setAttribute('id', 'pcp-image')
    // pcpImg.setAttribute('src', 'set-post-thumbnail')
    document.querySelector('#pcp-wrapper-image').append(pcpImg)

    let elemCanvas = document.createElement('canvas')
    elemCanvas.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;')
    elemCanvas.setAttribute('id', 'canvas')
    document.querySelector('#pcp-wrapper-image').append(elemCanvas)

    // const canvas = document.getElementById('canvas');
    // const fabricCanvas = new fabric.Canvas(canvas);


    // Preview the image using a FileReader
    const reader = new FileReader();
    reader.onload = function (event) {
      pcpImg.src = event.target.result;

      //ext - code

      var Rectangle = (function () {
        function Rectangle(canvas) {
          var inst = this;
          this.canvas = canvas;
          this.className = 'Rectangle';
          this.isDrawing = false;
          this.bindEvents();
        }

        Rectangle.prototype.bindEvents = function () {
          var inst = this;
          inst.canvas.on('mouse:down', function (o) {
            inst.onMouseDown(o);
          });
          inst.canvas.on('mouse:move', function (o) {
            inst.onMouseMove(o);
          });
          inst.canvas.on('mouse:up', function (o) {
            inst.onMouseUp(o);
          });
          inst.canvas.on('object:moving', function (o) {
            inst.disable();
          })
          inst.canvas.on('selection:created', function (o) {
            // for (let i = 0; i <= pcpFieldsCount.length; i++) {
            //   if (pcpKeepingCountTrack == 0) {
            //     pcpKeepingCountTrack = 1
            //     // pcpFieldsCount[i].value = pointer.y + " : " + pointer.x
            //     pcpFieldsCount[0].value = pcpPointerY + " : " + pcpPointerX
            //   } else {
            //     pcpFieldsCount[i].value = pcpPointerY + " : " + pcpPointerX
            //   }
            // }
            console.log(o)
            pcpFieldsCount[pcpKeepingCountTrack].value = o.selected[0].left + " : " + o.selected[0].top
            pcpKeepingCountTrack++
          })
        }
        Rectangle.prototype.onMouseUp = function (o) {
          var inst = this;
          inst.disable();
        };

        Rectangle.prototype.onMouseMove = function (o) {
          var inst = this;


          if (!inst.isEnable()) { return; }
          console.log("mouse move rectange");
          var pointer = inst.canvas.getPointer(o.e);
          var activeObj = inst.canvas.getActiveObject();

          activeObj.stroke = 'red',
            activeObj.strokeWidth = 2;
          activeObj.fill = 'transparent';

          if (origX > pointer.x) {
            activeObj.set({ left: Math.abs(pointer.x) });
          }
          if (origY > pointer.y) {
            activeObj.set({ top: Math.abs(pointer.y) });
          }

          activeObj.set({ width: Math.abs(origX - pointer.x) });
          activeObj.set({ height: Math.abs(origY - pointer.y) });
          activeObj.setCoords();


          pcpPointerY = pointer.y
          pcpPointerX = pointer.x





          inst.canvas.renderAll();

        };

        Rectangle.prototype.onMouseDown = function (o) {
          var inst = this;
          inst.enable();

          var pointer = inst.canvas.getPointer(o.e);
          origX = pointer.x;
          origY = pointer.y;

          var rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            transparentCorners: false,
            hasBorders: false,
            hasControls: false
          });

          inst.canvas.add(rect).setActiveObject(rect);
        };

        Rectangle.prototype.isEnable = function () {
          return this.isDrawing;
        }

        Rectangle.prototype.enable = function () {
          this.isDrawing = true;
        }

        Rectangle.prototype.disable = function () {
          this.isDrawing = false;
        }

        return Rectangle;
      }());



      var canvas = new fabric.Canvas('canvas');
      var arrow = new Rectangle(canvas);
      //ext - code

    };

    reader.readAsDataURL(selectedFile)

    var pcpFieldsCount = document.querySelectorAll('.pcp-input-field')
    var pcpKeepingCountTrack = 0
    var pcpPointerY;
    var pcpPointerX;






























    // Add event listener to create rectangles on click
    // canvas.addEventListener('click', (event) => {
    //   const x = event.offsetX;
    //   const y = event.offsetY;
    //   const rectangles = [];

    //   const rect = new fabric.Rect({
    //     left: x,
    //     top: y,
    //     width: 50,
    //     height: 50,
    //     fill: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    //     stroke: 'white',
    //     strokeWidth: 2
    //   });
    //   console.log("Rectangle coordinates:", rect.left, rect.top);

    //   console.log('hello form here')

    //   rectangles.push(rect);

    //   fabricCanvas.add(rect);

    //   // console.log(rect.get('left'))
    //   // console.log(rect.get('top'))
    // });
    // console.log('jflksdjflskdfjlds;j')
    // canvas.addEventListener('mousemove', () => {
    //   fabricCanvas.clear();
    //   rectangles.forEach(rect => {
    //     fabricCanvas.add(rect);
    //   });
    // });



  }
});