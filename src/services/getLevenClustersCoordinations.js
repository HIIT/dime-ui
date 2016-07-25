import TSNE from 'tsne-js';
import leven from 'leven'

export default function getLevenClustersCoordinations (tags, options) {
    let tagTextsLevenized = tags.map((tag) => {return tag.text}).map((sourceText, index, textArray)=> {
        return textArray.map((targetText) => {
            return leven(sourceText, targetText)
        })
    })
    let defaultOption = {
        dim: 2,
        perplexity: 5,
        earlyExaggeration: 1.0,
        learningRate: 100,
        nIter: 400,
        metric: 'euclidean'
    }
    let model = new TSNE(options? options:defaultOption)
    model.init({
        data: tagTextsLevenized,
        type: 'dense'
    })
    model.run()
    return model.getOutputScaled().map((coordinationArray)=> {
        return coordinationArray.map((coordination) => {
            return (coordination + 1)/2
        })
    })
}
