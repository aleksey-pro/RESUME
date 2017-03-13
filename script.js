'use strict';

//AJAX

$(document).ready(function(){

var WORKS_METHOD ={
  
  handlerData:function(resJSON){
    
    var templateSource   = $("#works-template").html(),
      
      template = Handlebars.compile(templateSource),
      
      worksHTML = template(resJSON);
    
    $('#works-container').html(worksHTML);
    console.log($("#works-template"))
  },
  loadWorksData : function(){
    
    $.ajax({
      url:"https://davegahn.github.io/RESUME/worksdata.json",
      method:'get',
      success:this.handlerData
    })
  }
};

  WORKS_METHOD.loadWorksData();
});

$( document ).ajaxComplete(function() {
  $('.readme').eq(0).text('Certificate');

//Gallery
  
 var Gallery = function(sources) {

// Свойства объекта
    this.galleryContainer = document.querySelector('.overlay-gallery');
    this.closeElement = this.galleryContainer.querySelector('.overlay-gallery-close');
    this.leftArrow = this.galleryContainer.querySelector('.overlay-gallery-control-left');
    this.rightArrow = this.galleryContainer.querySelector('.overlay-gallery-control-right');
    this.picturesContainer = this.galleryContainer.querySelector('.overlay-gallery-preview');
    this.pictures = sources;
  };

// Методы объекта

//show принимает на вход число
  Gallery.prototype.show = function(index) {
//  Показывает фотогалерею, убирая у ее DOM-элемента класс invisible.
    this.galleryContainer.classList.remove('invisible');
//  Вызывает метод setActivePicture, передав в него параметром число,
// которое было передано параметром в show.
    this.setActivePicture(index);
// Добавляем обработчики событий DOM-элементам галереи
    var self = this;
//hide убирает фотогалерею
    this.closeElement.onclick = function() {
      self.hide();
    };
//hide убирает фотогалерею по нажатию на фон
    document.onkeydown = function (e) {
      if(e.keyCode =='27') self.hide();
    };

//перелистывание
    this.leftArrow.onclick = function() {
      self.moveleft();
    };
    this.rightArrow.onclick = function() {
      self.moveright();
    };
  };

//setActivePicture принимает на вход число и записывает его в свойство activePicture.
  Gallery.prototype.setActivePicture = function(index) {
    this.activePicture = index;
//Если в блоке overlay-gallery-preview уже есть фотография, ее нужно предварительно
// удалить (или воспользоваться методом replaceChild).
    if (this.activePictureImage) {
      this.activePictureImage.parentNode.removeChild(this.activePictureImage);
    }
//После этого находит в массиве pictures фотографию с нужным индексом,
// создает для нее DOM-элемент Image с помощью конструктора, записывает
// ему src нужной фотографии и ставит его в конец блока overlay-gallery-preview.
    this.activePictureImage = new Image();
    this.activePictureImage.src = this.pictures[index];
    this.picturesContainer.appendChild(this.activePictureImage);
    this.activePictureImage.width = 360;
  };

//     Обработчики событий

// Обработчик события click по элементу gallery-overlay-close, который вызывает метод hide.
  Gallery.prototype.hide = function() {
    this.galleryContainer.classList.add('invisible');
    this.closeElement.onclick = null;
    this.leftArrow.onclick = null;
    this.rightArrow.onclick = null;
  };
// Обработчик события click по элементам overlay-gallery-control-left
// и overlay-gallery-control-right, которые показывают, соответственно
// следующую или предыдущую фотографию из списка вызывая метод setActivePicture
// с соответствующим параметром. Показ галереи не зацикливается, например, если
// мы находимся на последней фотографии, при клике на контрол, переключающий
// на следующую фотографию ничего не происходит.
  
  Gallery.prototype.moveleft = function() {
    this.setActivePicture(Math.max(this.activePicture - 1, 0)); // чтобы индекс не был меньше нуля
  };
// };
  Gallery.prototype.moveright = function() {
    this.setActivePicture(Math.min(this.activePicture + 1, this.pictures.length - 1)); //чтобы индекс
    // не был больше последнего индекса в массиве картинок
  };
  
  var pictureSection = document.querySelector('.photogallery');
  var links = pictureSection.querySelectorAll('.photogallery-image');
  var slides = document.querySelector('.photogallery').querySelectorAll('img');
  var sources = [];
  for (var i = 0, l = slides.length; i < l; i++) {
    sources.push(slides[i].src);
  }

// Создайте переменную gallery запишите в нее объект, созданный функцией-конструктором Gallery, параметром конструктора передайте полученный
// ранее массив фотографий.
  
  var gallery = new Gallery(sources);
  
  var link = $('.photogallery-image');
  link.on( "click", function(e) {
    e.preventDefault();
    var idx = link.index(this);
    gallery.show(idx);
  });
  
  
});
// parallax background

$('html').mousemove(function(e){
		
		var wx = $(window).width();
		var wy = $(window).height();
		
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		
		var newx = x - wx/2;
		var newy = y - wy/2;
		
		$('#loc').text(newx + ", " + newy);
		
		$('#wrapper div').each(function(){
			var speed = $(this).attr('data-speed');
			if($(this).attr('data-revert')) speed *= -1;
			TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});			
		});		
});