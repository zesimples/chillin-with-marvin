const weatherModule = (function() {
  // Expose public methods or variables
  let isInitialized = false;

  // Private variables and functions for the feature
  function privateFunction() {

        const weatherContainerElement = document.getElementsByClassName('weatherInfo-container');
        const weatherText = document.getElementById('weatherInfo');
        const audioElement = document.getElementById('audio-weather');
        const getWeatherButton = document.getElementById("getWeather");
        const YOUR_API_KEY = 'fe77ac17f74d169fe95bd9efda8540ef';
        let currentTypingIntervalId;

        weatherContainerElement[0].style.display = 'none';
        
        // VoiceRSS Javascript SDK
        const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};
        
        //Disable/Enable Button
        function toggleButton() {
          getWeatherButton.disabled = !getWeatherButton.disabled;
        }

        //TYPEWRITER
        function displayTypeWriter(weather) {
          let charIndex = 0;

        // Clear existing typewriter effect if one is ongoing
          if (currentTypingIntervalId) {
          clearInterval(currentTypingIntervalId);
          }

          weatherText.textContent = '';

          //adjusts typing speed
          const typingInterval = 70;
      
          const typingIntervalId = setInterval(() => {
              if (charIndex < weather.length) {
                  weatherText.textContent += weather[charIndex];
                  charIndex++;
              } else {
                  clearInterval(currentTypingIntervalId);
              }
          }, typingInterval);
        }

        //Passing the Weather Forecast to VoiceRSS API
        function tellMe(weather) {

          if (weather.trim() === '') {
              // If weather is empty, hide the weatherContainer
              weatherContainerElement[0].style.display = 'none';
          } else {
              // If weather is present, display the weatherContainer and set the content
              weatherContainerElement[0].style.display = 'block';
              displayTypeWriter(weather);
          }
          
          console.log('tell me:', weather);
          VoiceRSS.speech({
              key: 'e4348375283d4112911479a1032381b1',
              src: weather,
              hl: 'en-us',
              v: 'Linda',
              r: 0, 
              c: 'mp3',
              f: '44khz_16bit_stereo',
              ssml: false
          });
        }
      
        async function getWeather(location) {
          
          const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${YOUR_API_KEY}`;
          try {
            const response = await fetch(weatherAPI);
            const data = await response.json();
            const weatherCondition = data.weather[0].main;
            const marvinSays = getMarvinSayings(weatherCondition);
            tellMe(marvinSays);

            //Disable Button
            toggleButton();

           } catch (error) {
            //Catch Errors Here
            console.log('Whoops', error);
          }
        }
      
        function getMarvinSayings(weatherCondition) {
          switch(weatherCondition) {
            case 'Clear':
              return "What a glorious day! The sun is shining, and so should you!";
            case 'Rain':
              return "Rain is just confetti from the sky! A perfect time to dance in the puddles.";
            case 'Snow':
              return "Snowfall turns the world into a winter wonderland! Time for some snow angels.";
            case 'Clouds':
              return "Cloudy skies give us a moment to pause and reflect. Plus, they make for excellent daydreaming!";
            default:
              return "Every type of weather brings its own kind of magic!";
          }
        }

        //Event Listeners
        getWeatherButton.addEventListener("click", function() {
          const location = document.getElementById("location").value;  
          if (!location) {
            alert("Please enter a location.");
            return;
          }
          getWeather(location);
        });
        audioElement.addEventListener('ended', toggleButton);
      
  }

  // Expose public methods or variables
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
      },
  };
  })
    ();