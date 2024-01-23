let currentMusic = 0;

const music = document.querySelector('#aduio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause'))
    {
        audio.play();
    }
    else
    {
        audio.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
    
})

// setup music

const setMusic = (i) => {
    seekBar.value = 0; // define range slide value para 0;
    let song = songs[i];
    currentMusic = i;
    audio.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = audio.duration;
        musicDuration.innerHTML = formatTime(audio.duration);
    }, 300);

}

setMusic(0);

// formatting time in min and seconds format

const formatTime = (time) =>
{
    let min = Math.floor(time / 60);
    if(min < 10)
    {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10 )
    {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

//seek bar

setInterval(() => {
    seekBar.value = audio.currentTime;
    currentTime.innerHTML = formatTime(audio.currentTime);
    if(Math.floor(audio.currentTime) == Math.floor(seekBar.max))
    {
        forwardBtn.click();
    }
}, 500)

seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value;
})

const playMusic = () =>
{
    audio.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

// forward and backward button
forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1)
    {
        currentMusic = 0;
    }
    else
    {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})
backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0)
    {
        currentMusic = songs.length -1;
    }
    else
    {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})