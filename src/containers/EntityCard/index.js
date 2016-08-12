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
        return (
              <div className={"card " + styles.entityCard} >
                {this.renderEntityCardHeader(entity).bind(this)}
                {this.renderEntityCardBody(entity).bind(this)}
              </div>
        )
    }
    renderEntityCardHeader(entity) {
    	return (
    		<div className={"card-header clearfix " + styles.entityCardHeader}>
                
                    {entity.actor?
                        {this.renderEntityActor(entity.actor)}
                    : null}
                    
                    <span className={"pull-xs-right " + styles.entityCardDelete}
                          onClick={(mouseEvent) => this.handleClickOnDelete(entityID, mouseEvent)}
                    >
                        <MdDelete />
                    </span>
                    
                    {entity.timeCreated?
                        {this.renderEntityTimeCreated(entity.timeCreated)}
                    : null}
                    
        	</div>
    	)
    }
    renderEntityCardBody(entity) {
    	const informationElement = entity.targettedResource? entity.targettedResource: entity
    	return (
    		<div className={"card-block clearfix " + styles.entityCardBody}
                     onClick={(mouseEvent) => this.handleClickOnEntity(entity.id, mouseEvent)}
                >
                    {informationElement.title?
                        {this.renderInfoEleTitle(informationElement.title, informationElement.uri)}
                    : null}
                    
                    {informationElement.plainTextContent?
                        {this.renderInfoElePlainTextContent(informationElement.plainTextContent)}
                    : null}
                    
                    {informationElement.type?
                        {this.renderInfoEleTitle(informationElement.type)}
                    : null}
              </div>
    	)
    }
    renderInfoEleTitle(title, uri) {
    	return (
    		<a 
        		className={styles.infoEleTitle} 
                href={`${uri}`} 
            >
            	{title}
            </a>
    	)
    }
    renderInfoEleType(type) {
    	return (
    		<h5 className="pull-xs-right">
            	<a href={`${type}`}>
                	<span className={"label label-default " + styles.infoEleLabel}>
                             {type.substring(type.indexOf('#')+1, type.length)}
                        </span>
                 </a>
            </h5>
    	)  
    }
    renderEntityActor(actor) {
    	return (
    		<span className={"pull-xs-left " + styles.entityCardHeaderSpan}>
            	From: 
            	<b className={styles.entityCardHeaderTitle}>
            		{actor}
            	</b>
            </span>
    	)
    }
    renderEntityTimeCreated(timeCreated) {
    	<span className={"pull-xs-right " + styles.entityCardHeaderUrl}>
            {`${moment(timeCreated).format('MMMM Do YYYY, HH:mm:ss')}`}
        </span>
    }
    renderInfoElePlainTextContent(plainTextContent) {
        return (
            <p className={styles.entityCardPlainText} >
                {plainTextContent}
            </p>
        )
    }
    
}

export default connect(null, { clickOnEntityCard, deleteEntity })(EntityCard)


