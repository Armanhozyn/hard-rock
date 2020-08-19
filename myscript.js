const searchBtn = document.getElementById('search_btn');
const search_value = document.getElementById('search_value');
const show_result = document.getElementById('show_result');
const lyrics_show = document.getElementById('lyrics_show');

const main_url = 'https://api.lyrics.ovh';


// Get Song Function

async function getSong(song){
    const res = await fetch(`${main_url}/suggest/${song}`);
    const data = await res.json();

    showInDocument(data);
}
// Showing Data

function showInDocument(data){
    show_result.innerHTML = data.data.map( song => `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-artist=${song.artist.name} data-song-title=${song.title}>Get Lyrics</button>
            </div>
        </div>
    `).join('');
}


// Event Listener
searchBtn.addEventListener('click',e => {
    e.preventDefault();

    const searchValue = search_value.value.trim();

    if(!searchValue){
        alert("Please Fill Up the Field");
    }else{
        getSong(searchValue);
    }

});

//Get Lyrics 

async function getLyrics(artist,song){
    const res = await fetch(`${main_url}/v1/${artist}/${song}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace('/(\r\n|\r|\n)g',"<br>");
    lyrics_show.innerHTML = 
    `
    <button class="btn go-back">&lsaquo;</button>
    <h2 class="text-success mb-4">${artist} - ${song}</h2>
    <pre class="lyric text-white">
        ${lyrics}
    </pre>

    `;
}

show_result.addEventListener('click',e => {
    const clickedElement = e.target ;
    if(clickedElement.tagName === "BUTTON"){
       const artist = clickedElement.getAttribute('data-artist');
       const songTitle = clickedElement.getAttribute('data-song-title');

       getLyrics(artist,songTitle);
      
    }
})