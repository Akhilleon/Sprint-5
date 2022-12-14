const API_URL: string = 'https://icanhazdadjoke.com/';
const tpl: any = document.getElementById('joke');

const myInit = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
};

const initJokes = async (): Promise<string> => {
    return await fetch(API_URL, myInit)
        .then((response) => response.json())
        .then((jokes) => {
            return tpl.innerHTML = jokes.joke;
        });
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

