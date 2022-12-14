"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://icanhazdadjoke.com/';
const tpl = document.getElementById('joke');
const myInit = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
};
const initJokes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(API_URL, myInit)
        .then((response) => response.json())
        .then((jokes) => {
        return tpl.innerHTML = jokes.joke;
    });
});
let reportJokes = [];
class Report {
    constructor(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}
const storeJokes = (num) => {
    let joke = document.getElementById('joke').innerHTML;
    let score = num;
    let date = new Date();
    let strDate = date.toISOString();
    if (joke == '') {
        return;
    }
    let object = new Report(joke, score, strDate);
    reportJokes.push(object);
    const uniqueJokes = Array.from(new Set(reportJokes.map(a => a.joke)))
        .map(joke => {
        return reportJokes.find(a => a.joke === joke);
    });
    console.log(uniqueJokes);
    checkScore(num, joke);
    return uniqueJokes;
};
const checkScore = (num, joke) => {
    const index = reportJokes.findIndex(object => {
        return object.joke === joke;
    });
    if (index !== -1) {
        reportJokes[index].score = num;
    }
};
