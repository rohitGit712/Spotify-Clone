let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

let songItemPlay = document.getElementsByClassName('songItemPlay');
let currentSongTitle = document.getElementById('currentSongTitle');

const songItemContainer = document.querySelector('.songItemContainer');

let songs = [
    {songName: "52 Bars" , filePath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "Aaye Haaye" , filePath: "songs/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "On Top 2 Karan Aujla" , filePath: "songs/3.mp3" , coverPath: "covers/3.jpg"},
    {songName: "Sifar Safar Karan Aujla" , filePath: "songs/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "Wavy Karan Aujla" , filePath: "songs/5.mp3" , coverPath: "covers/5.jpg"},
];

// Dynamically create song items
songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('songItem');

    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${index + 1}">
        <span>${song.songName}</span>
        <span class="spngListPlay">
            <span class="timeStamp">00:00 <i id="${index}" class="fa-regular songItemPlay fa-circle-play"></i><img src="playing.gif" width="42px" alt="" class="gifList"></span>
        </span>
    `;

    songItemContainer.appendChild(songItem);
});

masterPlay.addEventListener('click' , ()=>{
    let gifImage = document.querySelector('.gifList');
    gifImage.style.opacity = 0;
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

    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);
    let totalMinutes = Math.floor(audioElement.duration / 60);
    let totalSeconds = Math.floor(audioElement.duration % 60);

    // Format to 2 digits (e.g., 01:02)
    currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;
    totalSeconds = totalSeconds < 10 ? '0' + totalSeconds : totalSeconds;

    time = `${currentMinutes}:${currentSeconds} / ${totalMinutes}:${totalSeconds}`;
    document.getElementById('durationTime').textContent = time;

    if(myProgressBar.value == 100){
        if(songIndex >= 4){
            songIndex = 0;
        }else{
            songIndex += 1;
        }
        currentSongTitle.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
    }
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
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            currentSongTitle.innerText = songs[songIndex].songName;
            
        } else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
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

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;  // Ensure looping around the list
    currentSongTitle.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});