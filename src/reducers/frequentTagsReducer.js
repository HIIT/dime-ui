import Lazy from 'lazy.js'

import { GET_FREQUENT_TAGS } from "../actions/index"

//from http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
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

export default function(state = [], action) {
    switch (action.type) {
        case GET_FREQUENT_TAGS:

            let tags = Lazy(action.payload.data)
                            .map((event)=> {return event.targettedResource.tags})
                            .flatten().compact()
                            .map((tag)=>{return tag.text}).compact().toArray()
            //console.log(getFrequentWords(tags))
            return getFrequentWords(tags)
        default:
            return state
    }
}

