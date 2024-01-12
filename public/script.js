// fetch music files from client's system and add them to an array as objects with their information like title, duration, etc.
// Play music files in these array objects while displaying information about them on the page.
// V1 is going to be grabbing music files from local directory.
// V2 gets big changes. UI is reworked and the app uses spotify's API to access music.
const console_colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgMagenta: '\x1b[35m',
    fgCyan: '\x1b[36m',
    fgWhite: '\x1b[37m'
};
// def
const songs_src = [
    {
        title: "Overjoyed",
        artist: "LAKEY INSPIRED",
        path: "./Songs/LAKEY INSPIRED - Overjoyed.mp3",
        art_path: "./Cover arts/overjoyed cover art.jpg",
        length: "2:41"
    },
    {
        title: "Hello World",
        artist: "Kid Ink",
        path: "./Songs/Hello World.mp3",
        art_path: "./Cover arts/hello world CA.jpg",
        length: "3:25"
    },
    {
        title: "Hold",
        artist: "HOME",
        path: "./Songs/HOME - Hold.mp3",
        art_path: "./Cover arts/HOME - Hold CA.jpg",
        length: "3:27"
    },
    {
        title: "Day 'N' Nite",
        artist: "Kid Cudi",
        path: "./Songs/Kid Cudi - Day 'N' Nite.mp3",
        art_path: "./Cover arts/day n night CA.jpeg",
        length: "3:07"
    },
    {
        title: "True Faith",
        artist: "New Order",
        path: "./Songs/New Order-True Faith.mp3",
        art_path: "./Cover arts/new order true faith CA.jpg",
        length: "5:52"
    },
    {
        title: "Malo Tebya",
        artist: "Serebro",
        path: "./Songs/Serebro - Malo Tebya (DJ Spizdil Hardstyle Remix).mp3",
        art_path: "./Cover arts/malo tabya CA.jpg",
        length: "2:45"
    },
    {
        title: "Soon As I Get Home",
        artist: "2Pac",
        path: "./Songs/Soon As I Get Home.mp3",
        art_path: "./Cover arts/soon as i get home CA.jpg",
        length: "3:40"
    },
    {
        title: "Love",
        artist: "Tatli",
        path: "./Songs/Tatli - Love.mp3",
        art_path: "./Cover arts/tatli love CA.jpg",
        length: "4:14"
    },
    {
        title: "Everyone Wants To Rule The World",
        artist: "Tears For Fears",
        path: "./Songs/Tears For Fears - Everybody Wants To Rule The World (Official Music Video).mp3",
        art_path: "./Cover arts/Tears_for_Fears CA.jpg",
        length: "4:51"
    },
    {
        title: "Love Is A Long Road",
        artist: "Tome Petty",
        path: "./Songs/Tom Petty - Love Is A Long Road (Audio).mp3",
        art_path: "./Cover arts/love is a long road CA.jpg",
        length: "4:07"
    },
    {
        title: "HIGHEST IN THE ROOM",
        artist: "Travis Scott",
        path: "./Songs/Travis Scott - HIGHEST IN THE ROOM (Audio).mp3",
        art_path: "./Cover arts/highest in the room CA.png",
        length: "2:57"
    },
    {
        title: "WHAT TO DO?",
        artist: "Travis Scott",
        path: "./Songs/WHAT TO DO_.mp3",
        art_path: "./Cover arts/What to do CA.png",
        length: "4:10"
    },

];
// temp
let play_pause = -1;
let pointer = 0;
let is_shuffle = false;
const root = document.documentElement;
const open_files = document.querySelector("#open-files");
const song_title_lable = document.querySelector(".song-title");
const song_artist_lable = document.querySelector(".song-artist");
const player = document.querySelector("#player");
player.volume = 1.0;
const shuffle_btn = document.querySelector(".shuffle-btn");
const prev_track_btn = document.querySelector("#prevtrack-btn");
const play_track_btn = document.querySelector("#playtrack-btn");
const next_track_btn = document.getElementById("nexttrack-btn");
const current_text = document.querySelector(".text-current");
const duration_text = document.querySelector(".text-duration");
const timeline = document.querySelector(".timeline");
const playlist_container = document.querySelector(".playlist-container");
const playlist_wrapper = document.querySelector(".playlist-wrapper");
const open_playlist_btn = document.querySelector("#open-playlist-btn");
const close_playlist_btn = document.querySelector("#close-playlist-btn");
const music_carousel = document.querySelector(".music-carousel");


var is_playlist_open = false;

function createCoverArt(song_obj, index) { 
    const cover_art_container = document.createElement("div");
    cover_art_container.classList.add("m-slide");
    const cover_art_image = document.createElement("img");
    cover_art_image.id = `cover-art-${index}`;
    cover_art_image.src = song_obj.art_path;
    cover_art_image.alt = 'Cover art image';
    cover_art_container.appendChild(cover_art_image);
    music_carousel.appendChild(cover_art_container);

    // swiping cover art blocks to play music here.
}

function createPlaylist_tracks(song_obj, index) {
    const track_container = document.createElement("div");
    track_container.classList.add("track-container");

    const track_cover_art = document.createElement("img");
    track_cover_art.src = song_obj.art_path;
    track_cover_art.alt = 'Cover art image for playlist tracks';

    const track_info_container = document.createElement("div");
    track_info_container.classList.add("track-info");

    const track_title = document.createElement("p");
    track_title.innerHTML = song_obj.title;
    track_title.classList.add("track-title");


    const track_artist = document.createElement("small");
    track_artist.innerHTML = song_obj.artist;
    track_artist.classList.add("track-artist");


    const track_duration = document.createElement("p");
    track_duration.classList.add("track-duration");
    track_duration.innerHTML = song_obj.length;


    const track_burger = document.createElement("div");
    track_burger.classList.add("track-burger");
    track_burger.innerHTML = `
        <div class="burger-line" id="burger-line-1"></div>
        <div class="burger-line" id="burger-line-2"></div>
        <div class="burger-line" id="burger-line-3"></div>
    `;
    // track_burger.style.display = "none";


    // adding event listeners to the playlist tracks.
    track_container.addEventListener("click", () => {
        songs_src.forEach((obj, i) => {
            if (obj.title == song_obj.title) {
                pointer = i;
                song_title_lable.innerHTML = obj.title;
                song_artist_lable.innerHTML = obj.artist;

                player.src = songs_src[pointer].path; 
                
                player.load();
                player.play();
                play_pause = 1;
                playstate();
                updateCoverArt(`cover-art-${i}`);
                update_playlist();
                track_container.appendChild(track_burger);
                // track_container.classList.add("playlist-active");
            }

        });
    });


    

    track_info_container.appendChild(track_title);
    track_info_container.appendChild(track_artist);
    track_container.appendChild(track_cover_art);
    track_container.appendChild(track_info_container);
    track_container.appendChild(track_duration);
    // track_container.appendChild(track_burger);
    playlist_wrapper.appendChild(track_container);
}


function update_playlist() {
    document.querySelectorAll(".track-container").forEach((element) => {
        let track_duration = element.querySelector(".track-duration");
        if (element.contains(element.querySelector(".track-burger"))) {
            // code commented below was for debugging purposes. It replaced the duration element for the track to display which track was clicked on and playing. No need to un-commment. 
            
            // let track_title = element.querySelector(".track-info").querySelector(".track-title");
            // songs_src.forEach((obj, i) => {
            //     if (obj.title == track_title.textContent) {
            //         track_duration.textContent = obj.length;
            //     }
            // });
            element.removeChild(element.querySelector(".track-burger"));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // creating all the cover art divs for our carousel.
    music_carousel.innerHTML = "";
    playlist_wrapper.innerHTML = "";
    songs_src.forEach((obj, i) => {
        createCoverArt(obj, i);
        createPlaylist_tracks(obj, i);
    });

    // load the first song or a random one into the player.
    song_title_lable.innerHTML = songs_src[pointer].title;
    song_artist_lable.innerHTML = songs_src[pointer].artist;
    player.src = songs_src[pointer].path; 
    player.load();
    updateCoverArt(`cover-art-${pointer}`);
    playstate();
});


// function updateCoverArt(coverArtId) {
//     // little bit of chatGPT copy pasta ;)
//     var element = document.getElementById(coverArtId);
//     if (element) {
//         element.scrollIntoView({block: 'center'});
//     }
// }

function updateCoverArt(coverArtId) {
    // little bit of chatGPT copy pasta ;)
    var element = document.getElementById(coverArtId);
    if (element) {
        element.scrollIntoView({block: 'center'});
    }
}

function playstate() {
    if (play_pause > 0) {
        // play
        play_track_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        // cover_art.style.animationPlayState = "running";
        return true
    } else {
        // pause
        play_track_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        // cover_art.style.animationPlayState = "paused";

        return false
    }
}
// running the function to initialize the state of our play/pause button.

function setPlayhead(value) {
    let timeline_percent = value;
    // what is timeline_percent of max
    let maximum = Math.floor(player.duration);
    try {
        player.currentTime = Math.round((timeline_percent / 100) * maximum);
    } catch (e){
    }
}

player.addEventListener("loadedmetadata", () => {
    updateduration();
    updatePlayhead();
});

player.addEventListener("timeupdate", () => {
    updateduration();
    updatePlayhead();

    // also switch track once duration has finished.
    if (formatTime(player.currentTime) == formatTime(player.duration)) {
        nexttrack();
    }
});

function updatePlayhead() {
    let currentpercent = Math.round(player.currentTime); //current time in seconds rounded off
    let maximum = Math.floor(player.duration); // duration in seconds rounded off.

    let timeline_percent = Math.floor((currentpercent / maximum) * 100);
    timeline.value = timeline_percent;
    root.style.setProperty('--thumb-width', `${timeline_percent}%`);
}

function formatTime(time) {
    // formatting seconds to mins and seconds
    let time_mins = Math.floor(time / 60);
    let time_sec = Math.round(time % 60);
    time_sec = time_sec < 10 ? "0" + time_sec:time_sec;
    return `${time_mins}:${time_sec}`;
}

function updateduration() {
    current_text.innerHTML = `${formatTime(player.currentTime)}`;
    duration_text.innerHTML = `${!player.duration ? "0:00" : formatTime(player.duration)}`;
}

function play_pause_track() {
    if (songs_src.length <= 0) {
        return false;
    }
    try{
        play_pause = play_pause * -1;
        if (playstate()){
            player.play();
        }
        else {
            player.pause();
        }
    }
    catch (e) {
        console.log(`Something went wrong! ${console_colors.fgRed + e.message}`);
    }
};


// next track
function nexttrack() {
    if (songs_src.length <= 0) {
        return;
    }
    try {
        // incrementing the pointer by + 1 -> next track.
        if (is_shuffle) {
            pointer = shuffle_playlist();
        } else {
            pointer += 1;
            if (pointer > songs_src.length - 1) {
                pointer = 0;
            }
        }
        song_title_lable.innerHTML = songs_src[pointer].title;
        song_artist_lable.innerHTML = songs_src[pointer].artist;
        updateCoverArt(`cover-art-${pointer}`);
        player.src = songs_src[pointer].path;
        player.load();
        player.play();
        play_pause = 1;
        playstate();
    }
    catch (e) {
        console.log(`Something went wrong! ${console_colors.fgRed + e.message}`);
    }
        // console.log(songs_src[pointer].art_path);
};

// prev track
function prevtrack() {
    if (songs_src.length <= 0) {
        return false
    }
    try {
        if (is_shuffle) {
            pointer = shuffle_playlist();
        } else {
            pointer -= 1;
            if (pointer < 0) {
                pointer = songs_src.length - 1;
            }
        }
        song_title_lable.innerHTML = songs_src[pointer].title;
        song_artist_lable.innerHTML = songs_src[pointer].artist;
        updateCoverArt(`cover-art-${pointer}`);
        player.src = songs_src[pointer].path;
        player.load();
        player.play();
        play_pause = 1;
        playstate();
    }
    catch (e) {
        console.log(`Something went wrong! ${console_colors.fgRed + e.message}`);
    }
};

// Knuth shuffle algorithm.
function shuffle_playlist() {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomInt(0, songs_src.length - 1);
}

// shuffle
shuffle_btn.addEventListener("click", () => {
    // checkig if there's no songs in our array.
    if (songs_src.length <= 0) {
        return;
    }
    is_shuffle = (is_shuffle) ? false:true;

    if (!is_shuffle) {
        shuffle_btn.style.color = "rgb(201, 200, 206)";
    } else {
        shuffle_btn.style.color = "rgb(52, 53, 60)";
    }
});

// updating our music carousel according to song items inside our songs_src array.

open_playlist_btn.addEventListener("click", () => {
    is_playlist_open = true
    playlist_UI();
});
close_playlist_btn.addEventListener("click", () => {
    is_playlist_open = false
    playlist_UI();
});

function playlist_UI() {
    playlist_container.style.transition = "top 0.5s ease-in-out";
    playlist_container.style.top = (is_playlist_open) ? "0%" : "100%";
    // console.log(songs_src);
}
function updateCarousel() {
    if (songs_src.length <= 0) {
        return false;
    }
    try {
    } 
    catch (e){
        console.log(e);
    }
}