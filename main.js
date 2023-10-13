//When listening to the first event, it takes 20 milliseconds to listen to the next one. 
function debounce(func, wait = 15, immediate = true ){
    var timeout 
    return function(){
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if(!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if(callNow) func.apply(context, args)
    }
}

const sliderImages = document.querySelectorAll('.slide-in')

//Run this function every time someone scrolls.

function checkSlide(e){

    //console.log(window.scrollY) tells us how far we scroll down counting from the top. 

    sliderImages.forEach(sliderImg => {

        //slideInAt = halfway through the image. 
            //Calculation to know in what position the image has to appear Ex: 50%
      const sliderInAt = (window.scrollY + window.innerHeight) - sliderImg.height / 2
            // Pixel level, counted from the bottom of our window to the middle of the images.

        //The bottom of the image. 
        //.offsetTop, It will tell us how many pixels there are between the topMax of the image, to the beginning of the page.  
        
        //But since we want to know it from the bottom of the image we do:
       const imageBottom = sliderImg.offsetTop + sliderImg.height 


       //If half of the image is displayed
       const isHalfShown = sliderInAt > sliderImg.offsetTop
       //If we don't go beyond the image.
       const isNotScrolledPast = window.scrollY < imageBottom 

       if(isHalfShown && isNotScrolledPast){
           sliderImg.classList.add('active')
       }else{
        sliderImg.classList.remove('active')
       }



     
    });

}

window.addEventListener('scroll',debounce(checkSlide))  