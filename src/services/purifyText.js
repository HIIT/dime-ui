import extractor from "keyword-extractor"
export function purify (text) {
    if (text === undefined) return []
    let str = text.replace(/[^\w\s]/gi, '')
    return extractor.extract(str,{
        language:"english",
        remove_digits: true,
        //return_changed_case:true,
        //remove_duplicates: true
    }).slice(0,50);
}
