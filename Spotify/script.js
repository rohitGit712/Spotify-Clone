console.log('Welcome to Spotify');
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItemPlay = document.getElementsByClassName('songItemPlay');
let currentSongTitle = document.getElementById('currentSongTitle');

const songItemContainer = document.querySelector('.songItemContainer');

let songs = [
    {songName: "Khel Khel Mein" , filePath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "Sky Force" , filePath: "songs/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "Shankara" , filePath: "songs/3.mp3" , coverPath: "covers/3.webp"},
    {songName: "Houseful 5" , filePath: "songs/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "Hera Phera" , filePath: "songs/5.mp3" , coverPath: "covers/5.webp"},
];

// Dynamically create song items
songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('songItem');

    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${index + 1}">
        <span>${song.songName}</span>
        <span class="spngListPlay">
            <span class="timeStamp">00:00 <i id="${index}" class="fa-regular songItemPlay fa-circle-play"></i></span>
        </span>
    `;

    songItemContainer.appendChild(songItem);
});

masterPlay.addEventListener('click' , ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }    
});

audioElement.addEventListener('timeupdate' , ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = ()=>{
    Array.from(songItemPlay).forEach((element)=> {
        element.classList.add('fa-circle-play');
    });
}

Array.from(songItemPlay).forEach((element)=> {
    element.addEventListener('click' , (e)=> {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;

            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            currentSongTitle.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;

        } else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    });
});

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex >= 4){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    currentSongTitle.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex < 1 ){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    currentSongTitle.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});