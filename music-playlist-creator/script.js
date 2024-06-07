const playlistCards = document.getElementsByClassName("playlist-cards");
const modal = document.getElementById("myModal");
var lastPlaylistInModal;

const exitButton = document.getElementById("exitButton");

function createPlaylistCards() {
  const container = document.querySelector(".grid-container");

  if (container === null) {
    return;
  }

  container.innerHTML = ``;

  data.playlists.forEach((playlist) => {
    // Create a new div element for the card
    const playlistCard = document.createElement("div");
    playlistCard.classList.add("playlist-cards");
    playlistCard.setAttribute("id", playlist.playlistID);
    // `<span id="exitButton" class="close">&times;</span>'
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");

    playlistCard.appendChild(deleteButton);
    deleteButton.innerHTML = `x`;

    // Add the playlist image to the card
    const playlistImage = document.createElement("img");
    playlistImage.src = playlist.playlist_art;
    playlistImage.classList.add("playlist-image");
    playlistCard.appendChild(playlistImage);

    // Add the playlist title to the card
    const playlistTitle = document.createElement("h2");
    playlistTitle.textContent = playlist.playlist_name;
    playlistTitle.classList.add("playlist-name");

    playlistCard.appendChild(playlistTitle);

    // Add the playlist artist to the card
    const playlistArtist = document.createElement("p");
    playlistArtist.textContent = playlist.playlist_creator;
    playlistCard.appendChild(playlistArtist);
    playlistArtist.classList.add("creator");


    // Add the playlist likes to the card
    const playlistLikes = document.createElement("button");
    playlistLikes.setAttribute("class", "like-section");
    playlistLikes.innerHTML = `<span class="like-counter">♡ </span><span>${playlist.likeCount}</span>`;
    playlistCard.appendChild(playlistLikes);

    playlistLikes.addEventListener("click", (event) => {
      let heart = playlistLikes.getElementsByClassName("like-counter");
      console.log(heart);
      if (event.target === heart[0] && event.target !== playlistLikes) {
        playlist.likeCount++;
        console.log("goodclick");

        playlistLikes.innerHTML = `<span class="like-counter">♡ </span><span>${playlist.likeCount}</span>`;

        if (playlist.likeCount > 0) {
          playlistLikes.innerHTML = `<span class="like-counter">♥ </span><span>${playlist.likeCount}</span>`;
        }
      }
    });

    if (playlist.likeCount > 0) {
        playlistLikes.innerHTML = `<span class="like-counter">♥ </span><span>${playlist.likeCount}</span>`;
      }

    playlistLikes
      .querySelector(".like-counter")
      .addEventListener("mouseover", () => {
        console.log("hover");

        //playlistLikes.innerHTML = `<p class="like-counter">&#57378; ${playlist.likeCount}</p>`;
      });

    //make likes incrementable

    playlistCard.addEventListener("click", (event) => {
      if (
        event.target !== playlistLikes &&
        (event.target === playlistCard ||
          event.target === playlistArtist ||
          event.target === playlistImage ||
          event.target === playlistTitle)
      ) { //in the future use stop propigation
        modalPopup(playlist);
      }
    });

    // Add the card to the page
    container.appendChild(playlistCard);

    deleteButton.addEventListener("click", () => {
      console.log("Helfw");
      container.removeChild(playlistCard);
      data.playlists = data.playlists.filter((pl) => {
        return playlist.playlistID != pl.playlistID;
      });
    });
  });
}

createPlaylistCards();

console.log(playlistCards);
// add a click event listener to the div

const showPlaylistDetails = (playlist) => {
  const modalBody = document.querySelector(".modal-content");
  const coverImage = playlist.playlist_art;
  const name = playlist.playlist_name;
  const creator = playlist.playlist_creator;
  const songs = playlist.songs;

  // Clear existing content
  modalBody.innerHTML = "";

  // Add top-modal div
  const topModal = document.createElement("section");
  topModal.classList.add("top-modal");
  modalBody.appendChild(topModal);

  // Add left-quarter div for cover image
  const leftQuarter = document.createElement("div");
  leftQuarter.classList.add("left-quarter");
  topModal.appendChild(leftQuarter);
  if (coverImage) {
    const image = document.createElement("img");
    image.src = coverImage.url;
    image.width = "100";
    image.height = "100";
    leftQuarter.appendChild(image);
  }

  // Add left-three-quarter div for playlist details
  const leftThreeQuarter = document.createElement("div");
  leftThreeQuarter.classList.add("left-three-quarter");
  topModal.appendChild(leftThreeQuarter);

  // Add playlist name and creator
  const title = document.createElement("h1");
  title.textContent = name;
  leftThreeQuarter.appendChild(title);

  const creatorTitle = document.createElement("h3");
  creatorTitle.textContent = `by ${creator}`;
  leftThreeQuarter.appendChild(creatorTitle);

  // Add list of songs
  const songList = document.createElement("ul");
  songs.forEach((song) => {
    const songItem = document.createElement("li");
    songItem.textContent = `${song.title} by ${song.artist} (${song.duration})`;
    songList.appendChild(songItem);
  });
  leftThreeQuarter.appendChild(songList);
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
const modalPopup = (playlist) => {
  lastPlaylistInModal = playlist;
  console.log(playlist);
  modal.style.display = "block";

  modal.innerHTML = ``;
  modal.innerHTML = `
    <div class="modal-content">

        <span id="exitButton" class="close">&times;</span>

        <section id="top-half-of-modal" class="top-modal">

            <div class="left-quarter">
                <img src="${playlist.playlist_art}" width="100" height="100">
                <button id="shuffle-button">Shuffle</button>
                <button id="addSongButton" onclick="addSong()">Add Song</button>


            </div>

            <div class="left-three-quarter">
                <h1 class="playlist-name">${playlist.playlist_name}</h1>
                <h3 class="creator">${playlist.playlist_creator}</h3>
            </div>

        </section>

        <div class="scroller">

        </div>

    </div>

    `;


  const myList = document.getElementsByClassName("scroller");
  console.log(myList);

  //for loop through songs, and add to myList
  console.log("here");

  const songsList = [];

  playlist.songs.forEach((song) => {
    const songToAdd = document.createElement("div");
    //note span might be eaier
    songToAdd.innerHTML = `
            <section class="song top-modal">
                <div class="column left">
                    <img src="${song.cover_art}" width="50" height="50">
                </div>

                <div class="column middle">
                    <h5 class="small-margin">${song.title}</h5>
                    <p class="small-margin">${song.artist}</p>
                    <p class="small-margin">${song.album}</p>
                </div>    
                <p class="column right">${song.duration}</p>

            </section>
        `;
    console.log("Hello");

    songsList.push(songToAdd);

    myList[0].appendChild(songToAdd);
  });

  document
    .getElementById("shuffle-button")
    .addEventListener("click", (event) => {
      shuffleArray(playlist.songs);

      console.log(songsList);

      myList[0].innerHTML = ``;

      playlist.songs.forEach((song) => {
        const songToAdd = document.createElement("div");
        //note span might be eaier
        songToAdd.innerHTML = `
                <section class="song top-modal">
                    <div class="column left">
                        <img src="${song.cover_art}" width="50" height="50">
                    </div>
    
                    <div class="column middle">
                        <h5 class="small-margin">${song.title}</h5>
                        <p class="small-margin">${song.artist}</p>
                        <p class="small-margin">${song.album}</p>
                    </div>    
                    <p class="column right">${song.duration}</p>
    
                </section>
            `;
        console.log("Hello");
        myList[0].appendChild(songToAdd);
      });
    });




    const exitButton = document.getElementById("exitButton");

    exitButton.addEventListener("click", (event) => {
      modal.style.display = "none";

    });
  
    modal.addEventListener("click", (event) => {

      const body = document.getElementsByClassName("modal-content");
  
      if (event.target !== body && event.target === modal) {

        modal.style.display = "none";
      }
    });
};

//FEATURED JAVASCRIPT

function populateFeatured(playlist) {
  const featuredBody = document.querySelector("#featured");
  if (featuredBody === null) {
    return;
  }

  featuredBody.innerHTML = `
    <div style="display: flex;">

    <span class="fcolumn">

            <div id="ftoppart">
                <img src="${playlist.playlist_art}" class="fplaypic">
                <button id="fshuffle-button">Shuffle</button>

            </div>

            <div class="left-three-quarter">
                <h1>${playlist.playlist_name}</h1>
                <h3>${playlist.playlist_creator}</h3>
            </div>

        </span>

        <span class="fscroller">
            
        </span>

    </div>

    `;

  const fmyList = document.getElementsByClassName("fscroller");
  console.log(fmyList);

  //for loop through songs, and add to myList
  console.log("here");

  const songsList = [];

  playlist.songs.forEach((song) => {
    const songToAdd = document.createElement("div");
    //note span might be eaier
    songToAdd.innerHTML = `
            <section class="song top-modal">
                <div class="column left">
                    <img src="${song.cover_art}" width="50" height="50">
                </div>

                <div class="column middle">
                    <h5 class="small-margin">${song.title}</h5>
                    <p class="small-margin">${song.artist}</p>
                    <p class="small-margin">${song.album}</p>
                </div>    
                <p class="column right">${song.duration}</p>

            </section>
        `;
    console.log("Hello");

    fmyList[0].appendChild(songToAdd);
  });

  document
    .getElementById("fshuffle-button")
    .addEventListener("click", (event) => {
      shuffleArray(playlist.songs);
      fmyList[0].innerHTML = ``;

      playlist.songs.forEach((song) => {
        const songToAdd = document.createElement("div");
        //note span might be eaier
        songToAdd.innerHTML = `
                <section class="song top-modal">
                    <div class="column left">
                        <img src="${song.cover_art}" width="50" height="50">
                    </div>
    
                    <div class="column middle">
                        <h5 class="small-margin">${song.title}</h5>
                        <p class="small-margin">${song.artist}</p>
                        <p class="small-margin">${song.album}</p>
                    </div>    
                    <p class="column right">${song.duration}</p>
    
                </section>
            `;
        console.log("Hello");

        fmyList[0].appendChild(songToAdd);
      });
    });
}

populateFeatured(
  data.playlists[Math.floor(Math.random() * data.playlists.length)]
);

function addPlayList() {
  document.getElementById("myForm").style.display = "block";
}

function addSong() {
    console.log("adding song");
    document.getElementById("songForm").style.display = "block";
  }

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function closeFormSong() {
    document.getElementById("songForm").style.display = "none";
  }



const formEle = document.querySelector("#playlist-adder");
console.log(formEle);
if(formEle != null) {
    formEle.addEventListener("submit", (event) => {
        event.preventDefault();
      
        const plname = document.getElementById("plname").value;
        const plcreator = document.getElementById("plcreator").value;
      
        console.log(plname + plcreator);
      
        const container = document.querySelector(".grid-container");
      
        const playlistCard = document.createElement("div");
        playlistCard.classList.add("playlist-cards");
        playlistCard.setAttribute("id", plname + plcreator);
        // `<span id="exitButton" class="close">&times;</span>'
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "deleteButton");
      
        playlistCard.appendChild(deleteButton);
        deleteButton.innerHTML = `x`;
      
        // Add the playlist image to the card
        const playlistImage = document.createElement("img");
        playlistImage.src = "assets/img/playlist.png";
        playlistImage.classList.add("playlist-image");
        playlistCard.appendChild(playlistImage);
      
        // Add the playlist title to the card
        const playlistTitle = document.createElement("h2");
        playlistTitle.textContent = plname;
        playlistCard.appendChild(playlistTitle);
      
        // Add the playlist artist to the card
        const playlistArtist = document.createElement("p");
        playlistArtist.textContent = plcreator;
        playlistCard.appendChild(playlistArtist);
      
        // Add the playlist likes to the card
        const playlistLikes = document.createElement("button");
        playlistLikes.setAttribute("class", "like-section");
        playlistLikes.innerHTML = `<span class="like-counter">♡ </span><span>0</span>`;
        playlistCard.appendChild(playlistLikes);
      
      
        let playlist =     {
          "playlistID": plname + plcreator,
          "playlist_name": plname,
          "playlist_creator": plcreator,
          "playlist_art": "assets/img/playlist.png",
          "likeCount": 0,
          "songs": []
        };
        lastPlaylistInModal = playlist;
      
        playlistLikes.addEventListener("click", (event) => {
          let heart = playlistLikes.getElementsByClassName("like-counter");
          console.log(heart);
          if (event.target === heart[0] && event.target !== playlistLikes) {
            playlist.likeCount++;
            console.log(playlist);
            console.log("goodclick");
      
            playlistLikes.innerHTML = `<span class="like-counter">♡ </span><span>${playlist.likeCount}</span>`;
      
            if (playlist.likeCount > 0) {
              playlistLikes.innerHTML = `<span class="like-counter">♥ </span><span>${playlist.likeCount}</span>`;
            }
          }
        });
      
        playlistLikes
          .querySelector(".like-counter")
          .addEventListener("mouseover", () => {
            console.log("hover");
      
            //playlistLikes.innerHTML = `<p class="like-counter">&#57378; ${playlist.likeCount}</p>`;
          });
      
        //make likes incrementable
      
        //fix popup
        playlistCard.addEventListener("click", (event) => {
          if (
            event.target !== playlistLikes &&
            (event.target === playlistCard ||
              event.target === playlistArtist ||
              event.target === playlistImage ||
              event.target === playlistTitle)
          ) {
            console.log(playlist);
            modalPopup(playlist);
          }
        });
      
        // Add the card to the page
        container.appendChild(playlistCard);
      
        data.playlists.push(playlist);
      
        deleteButton.addEventListener("click", () => {
          console.log("Helfw");
          container.removeChild(playlistCard);
          data.playlists = data.playlists.filter((pl) => {
            return playlist.playlistID != pl.playlistID;
          });
        });
      });
}



const songEle = document.querySelector("#song-addition"); //need to make it specific to a playlist
if (songEle != null) { 
    songEle.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("made it");
        
        const songName = document.getElementById("songName").value;
        const songArtist = document.getElementById("songArtist").value;
        const songLength = document.getElementById("songLength").value;
        const songAlbum = document.getElementById("songAlbum").value;
        
        
        
        
        const songToAdd = document.createElement("div");
            //note span might be eaier
            songToAdd.innerHTML = `
                    <section class="song top-modal">
                        <div class="column left">
                            <img src="assets/img/song.png" width="50" height="50">
                        </div>
        
                        <div class="column middle">
                            <h5 class="small-margin">${songName}</h5>
                            <p class="small-margin">${songArtist}</p>
                            <p class="small-margin">${songAlbum}</p>
                        </div>    
                        <p class="column right">${songLength}</p>
        
                    </section>
                `;
            console.log("Hello");
        
            const myListAdd = document.getElementsByClassName("scroller");
        
            myListAdd[0].appendChild(songToAdd);
            lastPlaylistInModal.songs.push({
                "songID": songName + songArtist,
                "title": songName,
                "artist": songArtist,
                "album": songAlbum,
                "cover_art": "assets/img/song.png",
                "duration": songLength
              })
        
        });
}




//playlist sorting





const sortEle = document.querySelector("#sort-choice"); //need to make it specific to a playlist
if (sortEle != null) {
    sortEle.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(lastPlaylistInModal);
    
        const sortingMethod = document.getElementById("method").value;
        console.log(data.playlists);
    
        if(sortingMethod === "Name") {
            data.playlists = data.playlists.sort((a, b) => {
                if (a.playlist_name < b.playlist_name) return -1;
                if (a.playlist_name > b.playlist_name) return 1;
                return 0;
              });
              console.log(data.playlists);
            createPlaylistCards();
        }
        else if (sortingMethod === "Like") {
            data.playlists = data.playlists.sort((a, b) => {
                if (a.likeCount < b.likeCount) return 1;
                if (a.likeCount > b.likeCount) return -1;
                return 0;
              });
              console.log(data.playlists);
            createPlaylistCards();
        }
    });
    
}


//search bar functionality 

function togglePlaylistCardDisplay() {

    const gridContainer = document.querySelector('.grid-container');

    if (gridContainer != null) {
        const searchBar = document.querySelector('#search-bar');
    
        // Get all playlist cards
    
        const playlistCards = gridContainer.querySelectorAll('.playlist-cards');
        
        // Set initial display state of all playlist cards to block
        playlistCards.forEach(card => card.style.display = 'block');
        
        // Add event listener to search bar input
        searchBar.addEventListener('input', (event) => {
          const searchQuery = event.target.value;
          console.log(searchQuery);
          
          // Loop through each playlist card
          playlistCards.forEach(card => {
            // Check if playlist name or creator matches search query
            console.log(card);
            const playlistNameMatches = card.querySelector('.playlist-name').textContent.toLowerCase().includes(searchQuery.toLowerCase());
            const creatorMatches = card.querySelector('.creator').textContent.toLowerCase().includes(searchQuery.toLowerCase());
            
            // If neither name nor creator match, hide the playlist card
            if (!playlistNameMatches && !creatorMatches) {
              card.style.display = 'none';
            } else {
              // Otherwise, show the playlist card
              card.style.display = 'block';
            }
          });
        });
    }
    
  }
  
  togglePlaylistCardDisplay();