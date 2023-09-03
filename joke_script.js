const jokeModule = (function() {
  // Expose public methods or variables
  let isInitialized = false;
  
  // Private variables and functions for the feature
  function privateFunction() {

    const button =  document.getElementById('jokeButton');
    const audioElement =  document.getElementById('audio');
    const jokeElement = document.getElementById('joke-text');
    const jokeContainer = document.getElementsByClassName('joke-text-container');
    let currentTypingIntervalId;

    //START WITH NO JOKE CONTAINER
    jokeContainer[0].style.display = 'none';
    
    // VoiceRSS Javascript SDK
    const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};
    
    
    //Disable/Enable Button
    function toggleButton() {
        button.disabled = !button.disabled;
    }
    
    //type writer effect
    function displayJokeTypeWriter(joke) {
        let charIndex = 0;
    
        // Clear existing typewriter effect if one is ongoing
        if (currentTypingIntervalId) {
          clearInterval(currentTypingIntervalId);
        }
    
        // Clear the current joke content
        jokeElement.textContent = '';
    
        // Adjusts typing speed
        const typingInterval = 70;
    
        currentTypingIntervalId = setInterval(() => {
          if (charIndex < joke.length) {
            jokeElement.textContent += joke[charIndex];
            charIndex++;
          } else {
            clearInterval(currentTypingIntervalId);
          }
        }, typingInterval);

      }
    
    //Passing our Joke to VoiceRSS API
    function tellMe(joke) {
    
        if (joke.trim() === '') {
            // If joke is empty, hide the jokeContainer
            jokeContainer[0].style.display = 'none';
        } else {
            // If joke is present, display the jokeContainer and set the content
            jokeContainer[0].style.display = 'block';
            //--------------------//
            displayJokeTypeWriter(joke);
            //-----------------------//
        }
        VoiceRSS.speech({
            key: 'e4348375283d4112911479a1032381b1',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
    }
    
    //Get Jokes from Joke API
    
    async function getJokes() {
        let joke = '';
        const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if(data.setup) {
                joke = `${data.setup} ... ${data.delivery}`;
            } else {
                joke = data.joke;
            }
            // Text-to-Speech
            tellMe(joke);
            //Disable Button
            toggleButton();
            console.log(joke);
        } catch (error) {
            //Catch Errors Here
            console.log('Whoops', error);
        }
    }
    
    
    //Event Listeners
    button.removeEventListener('click', getJokes);
    audioElement.removeEventListener('ended', toggleButton);
    button.addEventListener('click', getJokes);
    audioElement.addEventListener('ended', toggleButton);
    
}
  
  return {
      initialize: function() {
          // Check if the module is already initialized
          if(isInitialized) {
              return;
          }
  
          // If not, proceed to initialize the module
          privateFunction();
          
          // Set the flag to true to prevent reinitialization
          isInitialized = true;
      }
  };
})();
