const play = document.getElementById('play');
const music = document.querySelector('audio');
const img = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const progress = document.getElementById('progress');

let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');

const progress_div = document.getElementById('progress_div');

const songs = [
     {
        name: 'music-1',
        title: "CALM DOWN",
        artist: 'Rema'
     },
     {
        name: 'music-2',
        title: "CHEAP THRILLS",
        artist: 'Sia'
     },
     {
        name: 'music-3',
        title: "STAY",
        artist: 'Justin Beiber'
     },
];

let isPlaying = false;

//for play
const playMusic = () =>{
    isPlaying =true;
    music.play();
   
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("anime");
};


//for pause
const pauseMusic = () =>{
    isPlaying = false;
    music.pause();
   
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove("anime");
};

play.addEventListener('click', ()=>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
})


//changing music data
const loadSong =(songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src= "music/" + songs.name + ".mp3";
    img.src= "images/" + songs.name + ".jpg";

}


songIndex = 0;


const nextSong =() =>{
    songIndex =(songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong =() =>{
    songIndex =(songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    pauseMusic();
}


// progress bar


music.addEventListener('timeupdate', (event) =>{
    console.log(event);

    const {currentTime, duration} = event.srcElement;
    console.log(duration);
    console.log(currentTime);

    let progress_time = (currentTime / duration) * 100;
    progress.style.width= `${progress_time}%`;

    //music duration tym
    console.log(duration);
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }



    //current duration update
    
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`
    }
    

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
       current_time.textContent = `${tot_currentTime}`;
     
    

   
   
 });

 //progress onclick functionality
 progress_div.addEventListener('click', (event) =>{
    console.log(event);
    const { duration } = music;
 
    let move_progress =( event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
    console.log(move_progress);
 })

 music.addEventListener('ended' ,nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);