const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const { URLSearchParams } = require('url');

const optionDefinitions = [
    { name: 'token-bot', alias: 't', type: String },
    { name: 'id-chat', alias: 'i', type: String}
];

const argsCL = commandLineArgs(optionDefinitions, {camelCase: true});
const PATH_DEFAULT_REPORT = './lighthouseci/assertion-results.json';

const addSpace = (n) => ' '.repeat(n);
const formatDetails = data =>
    data
        .map(({ auditTitle, operator, expected, actual }) =>
            `${addSpace(3)}${auditTitle}\n` +
            `${addSpace(6)}Ожидаемый ${operator}${expected} \n` +
            `${addSpace(6)}Фактический ${actual}\n`)
        .join('');

const generateText = (data) => {
    const filtredByNotPassed = data.filter(el => !el.passed);
    if(filtredByNotPassed.length === 0) {
        return 'Тесты lighthouse прошли успешно 😇';
    }
    const dataGroupedByUrl =
        filtredByNotPassed.reduce((acc, el) => {
            const urls = acc[el.url] || [];
            return {
                ...acc,
                [el.url]: [...urls, el]
            }
        }, {});
    return Object.keys(dataGroupedByUrl)
        .map((url) => `${url}\n` + formatDetails(dataGroupedByUrl[url])
        ).join('');
};


const sendToTelegram = (text) => {
    const url = `https://api.telegram.org/bot${argsCL['tokenBot']}/sendMessage?`;
    const params = new URLSearchParams({
        text: text,
        chat_id: argsCL['idChat'],
        parse_mode: 'markdown'
    });
    const options = {
        method: 'POST'
    };

    fetch(url+params, options)
        .then(
            json => console.log(json),
            err => console.error('error send to telegram '+err)
        );
};

fs.access(PATH_DEFAULT_REPORT, fs.F_OK, (err) => {
    // file not found
    if (err) {
        sendToTelegram('Тесты lighthouse прошли 😇 assertion not found');
        console.log(`##teamcity[buildStatus status='SUCCESS' text='asserts not found']`)
    }else{
        const result = require(PATH_DEFAULT_REPORT);
        const text = generateText(result);
        sendToTelegram(text);
        console.log(`##teamcity[buildStatus  text='test']`);
    }
});