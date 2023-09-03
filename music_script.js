const musicModule = (function() {
    // Expose public methods or variables
    let isInitialized = false;

    function privateFunction() {
        console.log("music script");

        const image = document.getElementById('album-art');
        const title = document.getElementById('title');
        const artist = document.getElementById('artist');
        const music = document.querySelector('audio');
        const progressContainer = document.getElementById('progress-container');
        const progress = document.getElementById('progress');
        const currentTimeEl = document.getElementById('current-time');
        const durationEl= document.getElementById('duration');
        const prevBtn = document.getElementById('prev');
        const playBtn = document.getElementById('play');
        const nextBtn = document.getElementById('next');

        //MUSIC

        const songs = [
            {
                link: 'https://cdn.discordapp.com/attachments/1143614036454412320/1144982272769015818/coconut-mango.mp3',
                displayName: 'Coconut Mango',
                artist: 'Arrangement',
                imgLink: 'https://cdn.discordapp.com/attachments/1144371087753355355/1144984834423402596/img-coconut-mango.jpeg',

            },
            {
                link: 'https://cdn.discordapp.com/attachments/1144371087753355355/1144986188743188551/paranoid-android.mp3',
                displayName: 'Paranoid Android',
                artist: 'Radiohead',
                imgLink: 'https://cdn.discordapp.com/attachments/1144371087753355355/1144987434627645490/img-paranoid-android.jpg',
            },
            {
                link: 'https://cdn.discordapp.com/attachments/1144371087753355355/1144990324360486952/computer-love.mp3',
                displayName: 'Computer Love',
                artist: 'Kraftwerk',
                imgLink: 'https://cdn.discordapp.com/attachments/1144371087753355355/1144990595627110430/img-computer-love.jpg',
            }
        ];

        // CHECKS IF PLAYING
        let isPlaying = false;

        // PLAY

        function playSong() {
            isPlaying = true;
            playBtn.classList.replace('fa-play', 'fa-pause');
            playBtn.setAttribute('title', 'Pause');
            music.play();
        }

        // PAUSE

        function pauseSong() {
            isPlaying = false;
            playBtn.classList.replace('fa-pause', 'fa-play');
            playBtn.setAttribute('title', 'Play');
            music.pause();
        }

        playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

        // UPDATE DOM
        function loadSong(song) {
            title.textContent= song.displayName;
            artist.textContent = song.artist;
            music.src = song.link;
            image.src = song.imgLink;
        }

        //CURRENT SONG

        let songIndex = 0;

        //PREVIOUS SONG
        function prevSong() {
            songIndex--;
            if (songIndex < 0) {
                songIndex = songs.length -1;
                }
            loadSong(songs[songIndex]);
            playSong();
        }

        //NEXT SONG
        function nextSong() {
            songIndex++;
            if (songIndex > songs.length -1) {
                songIndex = 0;
                }
            loadSong(songs[songIndex]);
            playSong();
        }

        //LOAD FIRST SONG
        loadSong(songs[songIndex]);

        //UPDATE PROGRESS BAR & TIME

        function updateProgressBar(e) {
            if (isPlaying) {
                const { duration, currentTime } = e.srcElement;

                //UPDATE PROGRESS BAR WIDTH
                const progressPercent = (currentTime/duration)*100;
                progress.style.width = `${progressPercent}%`;

                //CALCULATE DISPLAY FOR DURATION
                const durationMinutes =  Math.floor(duration/60);
                let durationSeconds = Math.floor(duration % 60);

                if (durationSeconds < 10) {
                    durationSeconds = `0${durationSeconds}`;
                }
                
                //DELAY SWITCHING DURATION ELEMENT TO AVOID NaN
                if (durationSeconds) {
                    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
                }

                //CALCULATE DISPLAY FOR CURRENT TIME
                const currentMinutes =  Math.floor(currentTime/60);
                let currentSeconds = Math.floor(currentTime % 60);

                if (currentSeconds < 10) {
                    currentSeconds = `0${currentSeconds}`;
                }

                currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

            };
        };

        //SET PROGRESS BAR
        function setProgressBar(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const { duration } = music;
            music.currentTime = (clickX/width)*duration;
        }

        //EVENT LISTENERS
        prevBtn.addEventListener('click',prevSong);
        nextBtn.addEventListener('click',nextSong);
        music.addEventListener('timeupdate', updateProgressBar);
        progressContainer.addEventListener('click', setProgressBar);
        music.addEventListener('ended',nextSong);

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
        }
    };
  })();
  