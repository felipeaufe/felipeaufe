const fetch = require('node-fetch');
const xml2json = require('xml2json')

module.exports = async (url, config, timeout) => {

    // ???
    setTimeout(() => new Error('Timeout: ${url}'), timeout || 15000);

    const response = await fetch(url, config);

    if(response.status > 310) {
        const error = response.text();
        console.error(error)
        throw new Error(url);
    }

    const contentType = (response.header.get('content-type') || '')
        .split(';')
        .shift()
        .trim()
        .toLowerCase();
    
    const text = response.text();

    if(
        contentType === 'text/xml' ||
        text.indexOf('<?xml') === 0 ||
        text.indexOf('<xml') === 0
    ) {
        return JSON.parse(xml2json.toJson(text));
    } else {
        return JSON.parse(text);
    }
}