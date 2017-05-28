'use strict';

//AJAX

$(document).ready(function(){

var WORKS_METHOD ={
  
  handlerData:function(resJSON){
    
    var templateSource   = $("#works-template").html(),
      
      template = Handlebars.compile(templateSource),
      
      worksHTML = template(resJSON);
    
    $('#works-container').html(worksHTML);
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
  $('.readme').eq(0).html('<a href="img/certificate.jpg" target="_blank">Certificate</a>');
  
  $('.scroll-up').on('click', function(e) {
    e.preventDefault();
    $('.nav').animate({
      scrollTop: 0
    }, 1000);
  });
  
  $('.nav').on('scroll', function(){
    if($(this).scrollTop()>700) {
      $('.scroll-up').fadeIn();
    } else $('.scroll-up').fadeOut();
  });

//Gallery
  
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
  var links = pictureSection.querySelectorAll('.photogallery-image');
  var slides = document.querySelector('.photogallery').querySelectorAll('img');
  var sources = [];
  for (var i = 0, l = slides.length; i < l; i++) {
    sources.push(slides[i].src);
  }
  
  var gallery = new Gallery(sources);
  
  var link = $('.photogallery-image');
  link.on( "click", function(e) {
    e.preventDefault();
    var idx = link.index(this);
    gallery.show(idx);
  });
    
});