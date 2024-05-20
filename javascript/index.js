// MOBILE DROPDOWN MENU 

const navigation = document.getElementById('navigation');

function toggleMobileMenu() {
    navigation.classList.toggle('menu-open');
} 

window.addEventListener("resize", function(){
    if (window.matchMedia("(min-width: 900px)")) {
        navigation.classList.remove('menu-open');
}
})

// SHOW MANNY BACKGROUND IMAGE 

const mannyIMG = document.getElementById('manny-img');
const heroH1 = document.getElementById("h1-hero");

function showManny() {
    if(mannyIMG && heroH1){
        setTimeout(function(){
            mannyIMG.classList.add("animate-img");
        }, 1000);
    
        setTimeout(function(){
            heroH1.classList.add("animate-h1");
        }, 1500);
        
        setTimeout(function(){
            heroH1.classList.remove("animate-h1");
        }, 1720);
        
        setTimeout(function(){
            heroH1.classList.add("animate-h1");
        }, 1900);
        
        setTimeout(function(){
            heroH1.classList.remove("animate-h1");
        }, 2120);

        setTimeout(function(){
            mannyIMG.classList.remove("animate-img");
        }, 2400);
    }
}

showManny();

// MEDIA LAZY LOAD FUNCTION
const placeholderImageDiv = document.querySelectorAll(".placeholder-img");
const placeholderImageDivHome = document.querySelectorAll(".home-placeholder-img");
const imgTags = document.getElementsByTagName("IMG");
const imgArray = Array.from(imgTags);
const videoTags = document.getElementsByTagName('VIDEO');
const videoArray = Array.from(videoTags);

placeholderImageDiv.forEach(function(div){

    imgArray.forEach(function(img){
        if(div.contains(img)){
            
            if (img.complete) {
                div.classList.add("loaded");
              } else {
                img.addEventListener("load", function(){
                    div.classList.add("loaded")
                });
              }

        }
    })

    videoArray.forEach(function(video){
        if(div.contains(video)){
            if (video.readyState === 4){
                div.classList.add("loaded");
            } else {
                video.addEventListener("loadeddata", function(){
                    div.classList.add("loaded")
                });
            }
        }
    })
})

placeholderImageDivHome.forEach(function(div){

    videoArray.forEach(function(video){
        if(div.contains(video)){
            if (video.readyState === 4){
                div.classList.add("loaded");
            } else {
                video.addEventListener("loadeddata", function(){
                    div.classList.add("loaded")
                });
            }
        }
    })
})


// AUTOPLAY VIDEOS
function loadVideos(){
    if(videoArray){
        videoArray.forEach(function (video){
            video.play();
        })
    }
}


// SCALE ANIMATION INTERSECTION OBSERVER

function callback(entries) {
    entries.forEach(entry => {

        const skillsTags = entry.target.querySelectorAll('li');
        const skillsArray = Array.from(skillsTags);
        console.log(skillsArray);

        skillsArray.forEach(function(skillItem) {
            console.log(skillItem)
            if (entry.isIntersecting) {
                skillItem.classList.add('scale-animation');
                return; 
            }

            skillItem.classList.remove('scale-animation');
        })
    });
}

var options = {
    threshold: [1],
    rootMargin: "-80px"
 }

const observer = new IntersectionObserver(callback, options);
  
  observer.observe(document.querySelector('.skills-list'));

// PROJECT VIDEO NAVIGATION BUTTONS

const prevBtn = document.getElementById('video-nav-prev');
const nextBtn = document.getElementById('video-nav-next');
const projectMedia = document.querySelectorAll('.project-media-item');
const videoTitles = document.querySelectorAll('p.video-title');

function translateTitleDown(){
    videoTitles.forEach( function(title){
        if(title.style.transform === "translateY(-150%)"){
                
            title.style.transform = "translateY(0%)";
            
        } else if(title.style.transform !== "translateY(0%)"){

            title.style.transform = "translateY(-150%)";

        } 
    })
}

function translateTitleUp(){
    videoTitles.forEach( function(title){
        if(title.style.transform === "translateY(-150%)"){
                
            title.style.transform = "translateY(-300%)";
            
        } else if(title.style.transform !== "translateY(-300%)"){

            title.style.transform = "translateY(-150%)";

        } 
    })
}

if(prevBtn){
    if(!prevBtn.classList.contains('nav-disabled')){
        prevBtn.classList.add('nav-disabled');
    }

    prevBtn.addEventListener('click', function(){
        
        translateTitleDown();

        projectMedia.forEach( function(item){
            if(item.style.transform === "translateX(-100%)"){
                
                item.style.transform = "translateX(0%)";
                prevBtn.classList.add('nav-disabled');
                
                videoArray.forEach(function(video){
                    if(item.contains(video)){
                        video.currentTime = 0;
                    }
                })
                
            } else if(item.style.transform !== "translateX(0%)"){

                item.style.transform = "translateX(-100%)";
                nextBtn.classList.remove('nav-disabled');

                videoArray.forEach(function(video){
                    if(item.contains(video)){
                        video.currentTime = 0;
                    }
                })

            } 
        })
    })
}

if(nextBtn){
    nextBtn.addEventListener('click', function(){

        translateTitleUp();

        projectMedia.forEach( function(item){
            if(item.style.transform === "translateX(-100%)"){
                
                item.style.transform = "translateX(-200%)";
                nextBtn.classList.add('nav-disabled');

                videoArray.forEach(function(video){
                    if(item.contains(video)){
                        video.currentTime = 0;
                    }
                })
                
            } else if(item.style.transform !== "translateX(-200%)"){

                item.style.transform = "translateX(-100%)";
                prevBtn.classList.remove('nav-disabled');

                videoArray.forEach(function(video){
                    if(item.contains(video)){
                        video.currentTime = 0;
                    }
                })

            } 
        })
    })
}



// CONTACT FORM

const constraints = {
    name: {
        presence: { allowEmpty: false }
    },
    email: {
        presence: { allowEmpty: false },
        email: true
    },
};

const form = document.getElementById('contact-form');

if(form){
    form.addEventListener('submit', function (event) {
        const formValues = {
            name: form.elements.name.value,
            email: form.elements.email.value
        };

        const errors = validate(formValues, constraints);

        if (errors) {
        event.preventDefault();
        const errorMessage = Object
            .values(errors)
            .map(function (fieldValues) { return fieldValues.join(', ')})
            .join("\n");

        alert(errorMessage);
        }
        
}, false);
}