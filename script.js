const navigationLinks = document.querySelectorAll('nav a');
const featureContainers = document.querySelectorAll('.content');
const quoteElement = document.getElementById("footerQuotes");
const menuItems = document.querySelectorAll(".navButton");
const introPage = document.getElementById("introPage");
const welcomeText = document.getElementById("welcome-text");
const audioElement = document.getElementById('audio-welcome');

// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

//TEXT-TO-SPEECH FUNCTION
function tellMe(text) {
  console.log('tell me:', text);
  VoiceRSS.speech({
      key: 'e4348375283d4112911479a1032381b1',
      src: text,
      hl: 'en-us',
      v: 'Linda',
      r: 0, 
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
  });
}

//INTRO FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function() {
  
  introPage.addEventListener("animationend", function() {
    document.addEventListener('click', tellMe(welcomeText.innerText));
    introPage.style.zIndex = "-10";
    introPage.style.display = "none";
  });
});

setTimeout(() => {

navigationLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetFeature = link.getAttribute('href').substring(1);
    navigationLinks.forEach(link2 => {
      link2.classList.remove('select');
    });
    link.classList.add('select');
    handleNavigation(targetFeature);
  });
});

function loadContent(feature) {
    featureContainers.forEach(container => {
      container.classList.remove('show');
      container.classList.add('hide');
      setTimeout(()=> {
        container.classList.add("disappear");
      }, 499);
    });

    setTimeout(() => {
      const targetContainer = document.getElementById(feature);
      targetContainer.classList.remove('hide', 'disappear');
      targetContainer.classList.add('show');
    }, 500);

    switch (feature) {
      case 'home':
        return;
      case 'musicPlayer':
        musicModule.initialize();
        break;
      case 'weatherForecast':
        weatherModule.initialize();
        break;
      case 'jokeTeller':
        jokeModule.initialize();
        break;
    }

    // Update the footer quote when new feature is loaded
    updateFooterQuote();
} 

function handleNavigation(feature) {
  loadContent(feature);
  history.pushState({ feature }, null, `/${feature}`);
}

window.addEventListener('popstate', event => {
  const page = event.state?.feature || 'home';
  loadContent(page);
});



// Initial page load
const initialPage = 'home';
handleNavigation(initialPage); }, 5400);


  