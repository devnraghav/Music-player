// fetch music files from client's system and add them to an array as objects with their information like title, duration, etc.
// Play music files in these array objects while displaying information about them on the page.


// V1 is going to be grabbing music files from local directory.

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
const songs_src = [];
let play_pause = -1;
let pointer = 0;

const open_files = document.querySelector("#open-files");
const song_title_lable = document.querySelector(".song-title");
const player = document.querySelector("#player");
player.volume = 1.0;
const shuffle_btn = document.querySelector(".shuffle-btn");
const prev_track_btn = document.querySelector("#prevtrack-btn");
const play_track_btn = document.querySelector("#playtrack-btn");
const next_track_btn = document.getElementById("nexttrack-btn");
const download_track_btn = document.querySelector(".download-song");
download_track_btn.classList.add("disable-link");
const current_text = document.querySelector(".text-current");
const duration_text = document.querySelector(".text-duration");
const timeline_slider = document.querySelector(".timeline");
const cover_art = document.querySelector(".cover-art");



function playstate() {
    if (play_pause > 0) {
        // play
        play_track_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        cover_art.style.animationPlayState = "running";

        return true
    } else {
        // pause
        play_track_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        cover_art.style.animationPlayState = "paused";

        return false
    }
}
// running the function to initialize the state of our play/pause button.
playstate();

function setPlayhead(value) {
    let timeline_percent = value;
    // what is timeline_percent of max
    let maximum = Math.floor(player.duration);
    try {
        player.currentTime = Math.round((timeline_percent / 100) * maximum);
    } catch {
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
    timeline_slider.value = timeline_percent;
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
// fetch our music files and their info
open_files.addEventListener("change", (file) => {
    try {
        // returning the file list
        const file_list = file.target.files;
        // looping through the file list
        for (file of file_list) {
            songs_src.forEach((song_obj, song_idx) => {
                if (song_obj == file.name) {
                    songs_src.splice(song_idx, 1);                    
                }
            });

            // checking if our file is an audio file and ends with either .mp3 or .wav
            if ((file.name.endsWith(".mp3") || file.name.endsWith(".wav")) && file.type == "audio/mpeg") {
                // push it to our array as an object
                songs_src.push(file.name);
                // console.log(`${console_colors.underscore}${file.name}${console_colors.reset} ${file.type} ${Math.round(file.size/1000000 * 10) / 10} MB`);
            }
        }
        // console.log(songs_src);
        
        // load the first track in array by default

        if (songs_src.length > 0) {
            download_track_btn.classList.remove("disable-link");
        } else {
            download_track_btn.classList.add("disable-link");
        }

        if (!player.paused) {
            return
        }
        song_title_lable.innerHTML = songs_src[pointer].replace(".mp3", "");
        player.src = `Songs/${songs_src[pointer]}`;
        download_track_btn.href = `Songs/${songs_src[pointer]}`;
        player.load();
        play_pause = -1;
        playstate();

    } 
    catch (e){
        console.log(`Something went wrong! ${console_colors.fgRed + e.message}`);
    }
    
});
// play/pause
function play_pause_track() {
    if (songs_src.length <= 0) {
        return false
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
        return false
    }
    try {
        // incrementing the pointer by + 1 -> next track.
        pointer = pointer + 1;
        if (pointer > songs_src.length - 1) {
            pointer = 0;
        }
        // console.log(`Length: ${songs_src.length} Pointer: ${pointer} Current song obj: ${songs_src[pointer]}`);
        song_title_lable.innerHTML = songs_src[pointer].replace(".mp3", "");
        player.src = `Songs/${songs_src[pointer]}`;
        // download_track_btn.style.visibility = "visible";
        download_track_btn.href = `Songs/${songs_src[pointer]}`;
        player.load();
        player.play();
        play_pause = 1;
        playstate();
    }
    catch (e){
        console.log(`Something went wrong! ${console_colors.fgRed + e.message}`);
    }
};

// prev track
function prevtrack() {
    if (songs_src.length <= 0) {
        return false
    }
    try {
        pointer = pointer - 1;
        if (pointer < 0) {
            pointer = songs_src.length - 1;
        }
        // console.log(pointer);
        // console.log(`Length: ${songs_src.length} Pointer: ${pointer} Current song obj: ${songs_src[pointer]}`);
        song_title_lable.innerHTML = songs_src[pointer].replace(".mp3", "");
        player.src = `Songs/${songs_src[pointer]}`;
        // download_track_btn.style.visibility = "visible";
        download_track_btn.href = `Songs/${songs_src[pointer]}`;
        player.load();
        player.play();
        play_pause = 1;
        playstate();
    }
    catch (e){
        console.log(`Something went wrong! ${console_colors.fgRed + e.message}`);
    }
};

// Knuth shuffle algorithm.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

// shuffle
shuffle_btn.addEventListener("click", () => {
    if (songs_src.length <= 0) {
        return
    }
    shuffleArray(songs_src);
});




// FOR V2
// let dir_handle;
// async function get_dir() {
//     try {
//         dir_handle = await window.showDirectoryPicker();
//         for await (const entry of dir_handle.values()) {
//             if (entry.kind == "file" && (entry.name.endsWith('.mp3') || entry.name.endsWith('.wav'))) {
//                 song_objs.push(await entry.getFile());
//             }
//         }
//     }
//     catch(e) {
//         console.log("Error! ", e.message);
//     }
// }


