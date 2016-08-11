import React, { Component }from 'react'
import moment from 'moment' //TODO: es6 import moment?
import MdDelete from 'react-icons/lib/md/delete'
import styles from './styles.css'
import { clickOnEntityCard, deleteEntity } from './actions'

class EntityCard extends Component {
    handleClickOnEntity(entityID, mouseEvent) {
    	mouseEvent.preventDefault()
    	this.props.clickOnEntity(entityID)
        
    }
    handleClickOnDelete(entityID, mouseEvent) {
    	mouseEvent.preventDefault()
    	this.props.deleteEntity(entityID)
    }
    render() {
    	const { entity } = this.props
    	const informationElement = entity.targettedResource? entity.targettedResource: entity
        return (
              <div className={"card " + styles.entityCard} >
                <div className={"card-header clearfix " + styles.entityCardHeader}>
                
                    {entity.actor?
                        {renderEntityActor(entity.actor)}
                    : null}
                    
                    <span className={"pull-xs-right " + styles.entityCardDelete}
                          onClick={(mouseEvent) => this.handleClickOnDelete(entityID, mouseEvent)}
                    >
                        <MdDelete />
                    </span>
                    
                    {entity.timeCreated?
                        {renderEntityTimeCreated(entity.timeCreated)}
                    : null}
                    
                </div>
                
                <div className={"card-block clearfix " + styles.entityCardBody}
                     onClick={(mouseEvent) => this.handleClickOnEntity(entity.id, mouseEvent)}
                >
                    <a 
                    	className={styles.infoEleTitle} 
                    	href={`${informationElement.uri}`} 
                    	>
                        {informationElement.title}
                    </a>
                    
                    {informationElement.plainTextContent?
                        {renderInformationElementPlainTextContent(informationElement.plainTextContent)}
                    : null}
                    
                    <h5 className="pull-xs-right">
                        <a href={`${informationElement.type}`}>
                        <span className={"label label-default " + styles.infoEleLabel}>
                             {informationElement.type.substring(informationElement.type.indexOf('#')+1, informationElement.type.length)}
                        </span>
                        </a>
                    </h5>
                </div>
            </div>
        )
    }
    renderEntityActor(actor) {
    	return (
    		<span className={"pull-xs-left " + styles.entityCardHeaderSpan}>
            	From: 
            	<b className={styles.entityCardHeaderTitle}>
            		{entity.actor}
            	</b>
            </span>
    	)
    }
    renderEntityTimeCreated(timeCreated) {
    	<span className={"pull-xs-right " + styles.entityCardHeaderUrl}>
            {`${moment(timeCreated).format('MMMM Do YYYY, HH:mm:ss')}`}
        </span>
    }
    renderInformationElementPlainTextContent(plainTextContent) {
        return (
            <p className={styles.entityCardPlainText} >
                {plainTextContent}
            </p>
        )
    }
    
}

export default connect(null, { clickOnEntityCard, deleteEntity })(EntityCard)


