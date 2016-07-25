import Lazy from 'lazy.js'
import stopWords from 'stopwords'
import porter from 'talisman/stemmers/porter'
//import lovins from 'talisman/stemmers/lovins'
//import lancaster from 'talisman/stemmers/lancaster'
//from http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
//import nlp from "nlp_compromise/src/index"

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'text': prop,
                'frequency': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return b.frequency - a.frequency; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr;
}

function getFrequentWords(wordsArray) {
    let frequencies = {}
    for (let word of wordsArray) {
        frequencies[word] = frequencies[word] || 0;
        frequencies[word]++;
    }
    return sortObject(frequencies)
}

function wordFilter(tag) {
    let word = tag.text
    const punctuationReg = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
    const numberReg = /[0-9]/g
    const notASCII = /[^\x00-\x7F]/g
    const pageURL = /^((?!pageURL).)*$/
    const tags = /^((?!tags).)*$/
    if ( numberReg.test(word) || notASCII.test(word) || punctuationReg.test(word) || stopWords.english.indexOf(word) !== -1 || !pageURL.test(word) || !tags.test(word)) {
        return false
    } else if (word.length > 3){
        return true
    }
    return false
}

function actorFilter(tag) {
    if (tag.actor && tag.actor === 'KEA') {
        return true
    } else {
        return false
    }
}

export default function getFrequentTags(events) {
    let tags = Lazy(events)
                .map((event)=> {return event.targettedResource.tags})
                .flatten().compact().filter(actorFilter).filter(wordFilter)
                .map((tag)=>{return tag.text}).toArray()
    return getFrequentWords(tags)
}
