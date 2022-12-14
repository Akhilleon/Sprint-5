const API_URL: string = 'https://icanhazdadjoke.com/';
const APIWEATHER_URL: string = 'https://api.openweathermap.org/data/2.5/weather?lat=41.394433&lon=2.168306&appid=55c29d75b9110d223c1a45ebb075c1a8&units=metric&lang=ca';
const APIJOKES2_URL: string = 'https://api.chucknorris.io/jokes/random';
const tpl: any = document.getElementById('joke');
const timeDisplayTpl: any = document.getElementById('time-display');
const cityDisplayTpl: any = document.getElementById('city');
const tempDisplayTpl: any = document.getElementById('temp-celsius');

const myInit = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
};

const initWeather = () => {
    fetch(APIWEATHER_URL)
    .then((response) => response.json())
    .then(json => {
        const unixTimestamp = json.dt;
        const date = new Date(unixTimestamp * 1000); //formato UNIX
        const year = date.getFullYear();
        const month = padTo2Digits(date.getMonth() + 1);
        const day = padTo2Digits(date.getDate());
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
        const tempInt = parseInt(json.main.temp);
        let weatherDescStr = json.weather[0].description;
        const weatherUpperStr = weatherDescStr.charAt(0).toUpperCase() + weatherDescStr.slice(1);
        timeDisplayTpl.innerHTML = `${day}-${month}-${year} | ${time}`;
        cityDisplayTpl.innerHTML = `${json.name}, Barcelona, ${json.sys.country}`;
        tempDisplayTpl.innerHTML = `${tempInt}ºC ${weatherUpperStr}`;
    })
}

const initJokes = async (): Promise<string> => {
    return await fetch(API_URL, myInit)
        .then((response) => response.json())
        .then((jokes) => {
            return tpl.innerHTML = jokes.joke;
        });
}

const initChuckNorrisJokes = async () => {
    await fetch(APIJOKES2_URL)
        .then((response) => response.json())
        .then((jokes) => {
            return tpl.innerHTML = jokes.value;
        })
}

let reportJokes: Report[] = [];


class Report {
    joke: string;
    score: number;
    date: string;
    constructor(joke: string, score: number, date: string) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}

const storeJokes = (num: number) => {
    let joke = document.getElementById('joke').innerHTML;
    let score = num;        
    let date = new Date();
    let strDate = date.toISOString();

    if (joke == '') {
        return;
    }

    let object = new Report(joke, score, strDate)
    reportJokes.push(object);

    const uniqueJokes = Array.from(new Set(reportJokes.map(a => a.joke)))
    .map(joke => {
    return reportJokes.find(a => a.joke === joke)
    });

    console.log(uniqueJokes);

    checkScore(num, joke);
    
    return uniqueJokes;
}

const checkScore = (num: number, joke: string) => {
    const index = reportJokes.findIndex(object => {
        return object.joke === joke;
      });
      
      if (index !== -1) {
        reportJokes[index].score = num;
      }
}
const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0');
}

const chooseRandomAPI = () => {
    let randomNum = Math.floor(Math.random() * 2) + 1;

    if (randomNum == 1) {
       return initJokes();
    } 
    return initChuckNorrisJokes();
}

window.onload = () => initWeather();

