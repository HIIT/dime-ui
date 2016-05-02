import _ from 'underscore'
import Lazy from 'lazy.js'

import { FETCH_TAGS } from "../actions/index"

//from http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'tag': prop,
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
        case FETCH_TAGS:

            //let tags = _.compact(_.flatten(action.payload.data.map((event)=> {
            //    if (event.targettedResource.tags.length > 0) {
            //        //console.log(event.targettedResource.tags)
            //        return event.targettedResource.tags
            //    }
            //}))).map((tag)=>{
            //    return tag.text
            //})
            //console.log(getFrequentWords(tags))

            let tags = Lazy(action.payload.data).map((event)=> {return event.targettedResource.tags}).flatten().compact().toArray()
            //let tags = _.compact(_.compact(_.flatten(action.payload.data.map((event)=> {
            //    if (event.targettedResource.tags.length > 0) {
            //        //console.log(event.targettedResource.tags)
            //        return event.targettedResource.tags
            //    }
            //}))).map((tag)=>{
            //    if (tag.time) {
            //        return tag
            //    }
            //}))
            //console.log(tags)
            return _.sample(tags,200)
        default:
            return state
    }
}
