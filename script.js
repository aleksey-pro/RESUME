//Выполняем при загруке элементов страницы

$(document).ready(function(){

var WORKS_METHOD ={
  
  //Определяем и компилируем шаблон
  
  handlerData:function(resJSON){
    
    var templateSource   = $("#works-template").html(),
      
      template = Handlebars.compile(templateSource),
      
      worksHTML = template(resJSON);
    
    $('#portfolio').html(worksHTML);
  },
  
  // Подгружаем данные в шаблон
  
  loadWorksData : function(){
    $.ajax({
      url:"https://davegahn.github.io/RESUME/worksdata.json",
      method:'get',
      success:this.handlerData
    })
  }
};

 // Запускаем метод

  WORKS_METHOD.loadWorksData();
});

// При загрузке данных вызываем эффекты прокрутки списка работ к верху и появления кнопки прокрутки

$( document ).ajaxComplete(function() {
  $('.readme').eq(1).html('<a href="img/certificate.jpg" target="_blank">Certificate</a>');
  
  $('.nav__scroll-up').on('click', function(e) {
    e.preventDefault();
    $('.nav').animate({
      scrollTop: 0
    }, 1000);
  });
  
  $('.nav').on('scroll', function(){
    if($(this).scrollTop()>700) {
      $('.nav__scroll-up').fadeIn();
    } else $('.nav__scroll-up').fadeOut();
  });

//Конструктор галереи  -определяем свойства и методы
  
 var Gallery = function(sources) {
    this.galleryContainer = document.querySelector('.overlay-gallery');
    this.closeElement = this.galleryContainer.querySelector('.overlay-gallery-close');
    this.leftArrow = this.galleryContainer.querySelector('.overlay-gallery-control-left');
    this.rightArrow = this.galleryContainer.querySelector('.overlay-gallery-control-right');
    this.picturesContainer = this.galleryContainer.querySelector('.overlay-gallery-preview');
    this.pictures = sources;
  };

  Gallery.prototype.show = function(index) {
    this.galleryContainer.classList.remove('invisible');
    this.setActivePicture(index);
    var self = this;
    this.closeElement.onclick = function() {
      self.hide();
    };
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

  Gallery.prototype.setActivePicture = function(index) {
    this.activePicture = index;
    if (this.activePictureImage) {
      this.activePictureImage.parentNode.removeChild(this.activePictureImage);
    }
    this.activePictureImage = new Image();
    this.activePictureImage.src = this.pictures[index];
    this.picturesContainer.appendChild(this.activePictureImage);
    if (window.matchMedia("(max-width: 400px)").matches) {
      console.log(this);
      this.activePictureImage.width = 150;
    } else this.activePictureImage.width = 360;
  };


  Gallery.prototype.hide = function() {
    this.galleryContainer.classList.add('invisible');
    this.closeElement.onclick = null;
    this.leftArrow.onclick = null;
    this.rightArrow.onclick = null;
  };

  
  Gallery.prototype.moveleft = function() {
    this.setActivePicture(Math.max(this.activePicture - 1, 0));
  };

  Gallery.prototype.moveright = function() {
    this.setActivePicture(Math.min(this.activePicture + 1, this.pictures.length - 1));
  };
  
  var pictureSection = document.querySelector('.photogallery');
  var links = pictureSection.querySelectorAll('.portfolio__image');
  var slides = document.querySelector('.photogallery').querySelectorAll('img');
  
  // Определяем элементы галереи на странице (фотографии)
  var sources = [];
  for (var i = 0, l = slides.length; i < l; i++) {
    sources.push(slides[i].src);
  }
  
  // Вставляем фотографии в галерею
  
  var gallery = new Gallery(sources);
  
  // Вызывваем показ галереи при клике на фотографии
  
  var link = $('.portfolio__image');
  link.on( "click", function(e) {
    e.preventDefault();
    var idx = link.index(this);
    gallery.show(idx);
  });
  
  
  //Функция показа навыков

  function meter() {
    var container = $('.skills'),
      skillItem = container.find('.skills-list__item');
    
    function colorize(val){
      var circleCont = $('.skills-meter');
      circleCont.toggleClass('circle-'+val);
    }
    
    skillItem.on('mouseenter mouseleave', function() {
      var txt = $(this).text();
      switch (txt) {
        case 'HTML5':
          colorize('90');
          break;
        case 'CSS':
          colorize('80');
          break;
        case 'CSS3':
          colorize('50');
          break;
        case 'JavaScript':
          colorize('50');
          break;
        case 'jQuery':
          colorize('60');
          break;
        case 'AJAX':
          colorize('30');
          break;
        case 'SASS':
          colorize('75');
          break;
        case 'Bootstrap':
          colorize('60');
          break;
        case 'БЭМ':
          colorize('80');
          break;
        case 'SVG':
          colorize('70');
          break;
        case 'PUG':
          colorize('80');
          break;
        case 'Gulp':
          colorize('60');
          break;
        case 'Git':
          colorize('60');
          break;
        case 'Photoshop':
          colorize('40');
          break;
        case 'WebStorm':
          colorize('50');
          break;
        case 'SEO':
          colorize('30');
      }
      $(this).toggleClass('hovered');
    });
  }
  
  meter();
  
  //Функция скрытия списка работ свайпом вправо (пальцем)
    
function swipePanel() {
 var panel = document.querySelector('.nav');

  var mc = new Hammer(panel);

  mc.on("panright", function(ev) {
    var $panel = $(panel);
    var checkbox = $panel.siblings('#nav-toggle');
    $(checkbox).attr('checked',false);
  });
}
  
swipePanel();


});