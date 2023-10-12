const playlist = document.getElementById('playlist');
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const fastForwardButton = document.getElementById('fastForwardButton');
const fileInput = document.getElementById('fileInput');
const addMusicButton = document.getElementById('addMusicButton');
const seekBar = document.getElementById('seekBar');
const seekButton = document.getElementById('seekButton');

let musicList = []; 

function populatePlaylist() {
    playlist.innerHTML = '';
    musicList.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${index + 1}. ${track.title}`;
        listItem.addEventListener('click', () => playTrack(index));
        playlist.appendChild(listItem);
    });
}

function playTrack(index) {
    const track = musicList[index];
    audio.src = track.source;
    audio.play();
    playButton.textContent = 'Pause';
}

playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = 'Pause';
    } else {
        audio.pause();
        playButton.textContent = 'Play';
    }
});

pauseButton.addEventListener('click', () => {
    audio.pause();
    playButton.textContent = 'Play';
});

fastForwardButton.addEventListener('click', () => {
    audio.currentTime += 10; 
});

addMusicButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    for (const file of files) {
        const newTrack = {
            title: file.name,
            source: URL.createObjectURL(file),
        };
        musicList.push(newTrack);
    }

    populatePlaylist();
    localStorage.setItem('musicList', JSON.stringify(musicList));
    fileInput.value = ''; 
});

seekButton.addEventListener('click', () => {
    const timeToSeek = parseFloat(seekBar.value);
    audio.currentTime = timeToSeek;
});

audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
});

const storedMusicList = JSON.parse(localStorage.getItem('musicList'));

if (storedMusicList) {
    musicList = storedMusicList;
}

populatePlaylist();
