// import ziks from './datas.js';

let songRoot = "assets/songs/";
let coverRoot = "assets/images/covers/";

let songs = [
    {
        title: "5G",
        author: "Booba",
        cover: coverRoot + "cover-booba.jpg",
        path: songRoot + "5G.mp3",

    },
    {
        title: "Mona Lisa ",
        author: "Booba (feat. JSX)",
        cover: coverRoot + "cover-booba.jpg",
        path: songRoot + "Mona Lisa (feat. JSX).mp3",

    },
    {
        title: "Cendrillon",
        author: "Eva feat Naza",
        cover: coverRoot + "cover-eva.png",
        path: songRoot + "cendrillon.mp3",

    },
    {
        title: "Vrai",
        author: "Niska",
        cover: coverRoot + "default-cover.png",
        path: songRoot + "vrai.mp3",

    }
]
let cover = document.querySelector(".cover");
let songTitle = document.querySelector(".song-title");
let songAuthor = document.querySelector(".song-author");
let backward = document.querySelector(".previous");
let play = document.querySelector(".fa-play");
let forward = document.querySelector(".next");
let volume = document.querySelector(".volume");
let time = document.querySelector(".time");
let songCount = document.querySelector(".count-song");


let i = 0;
let lenght = songs.length;
let song = new Audio(songs[i].path);


songTitle.textContent = songs[i].title;
songAuthor.textContent = songs[i].author;
cover.setAttribute("src",songs[i].cover);
songCount.textContent = i+1 + "/" + lenght;



backward.addEventListener("click", (e) => {
    pauseSong(song);
    i--;
    if(i < 0) {
        i = lenght;        
    }
    songCount.textContent = i+1 + "/" + lenght;
    songTitle.textContent = songs[i].title;
    songAuthor.textContent = songs[i].author;
    cover.setAttribute("src",songs[i].cover);
    song = new Audio(songs[i].path);
    play.classList.add("fa-pause");
    playSong(song);

});


forward.addEventListener("click", (e) => {
    pauseSong(song);
    i++;
    if(i > lenght) {
        i = 0;        
    }
    songCount.textContent = i+1 + "/" + lenght;
    songTitle.textContent = songs[i].title;
    songAuthor.textContent = songs[i].author;
    cover.setAttribute("src",songs[i].cover);
    song = new Audio(songs[i].path);
    play.classList.add("fa-pause");
    playSong(song);
    
});


play.addEventListener("click", (e) => {
    if (!play.classList.contains('fa-pause')) {
        play.classList.add("fa-pause");
        playSong(song);
        
    } else{
        play.classList.remove("fa-pause");
        pauseSong(song)
    }
});

volume.addEventListener("change", (e) => {
    let volume = parseInt(e.target.value) / 100;
    song.volume = volume;
});

time.addEventListener("change", (e) => {
    let value = e.target.value;
    let coefficient = song.duration / 100;
    song.currentTime = value * coefficient;
});

watchDog(song);


/**
 * Launch the play of the song
 * 
 * @param {Audio} song 
 */
function playSong(song) {
    song.volume = .3;
    song.play();
}


/**
 * Launch the pause of the song
 * 
 * @param {Audio} song 
 */
function pauseSong (song) {
    song.pause();
}

/**
 * 
 * @param {Audio} song 
 */
function watchDog  (song)  {
    setTimeout(()=> {
        if(song.currentTime === song.duration){
            play.classList.remove('fa-pause');
        }
        watchDog(song);
    }, 1000);
}


/**
 * Launch the play of the song
 * 
 * @param {Audio} song 
 */
 function watchTime (song) {
    setTimeout(() => {
        if (!song.paused) {
            time.value = parseFloat(time.value) + 1;
        }
        watchTime(song);
    }, (song.duration * 1000) / 100);
}
