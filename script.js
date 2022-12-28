const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

function toggleBtn() {
   button.disabled = !button.disabled;
}

// passing joke to Voice RSS API
function tellMe(joke) {
    //toggleBtn();
    console.log(joke);
    VoiceRSS.speech({
            key: '01aaa87bb0b846dfabbea8315b0d8a5a',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleBtn();
    } catch(e) {
        console.log('whoops, error here:', e);
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleBtn);