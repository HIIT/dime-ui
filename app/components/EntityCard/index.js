/**
*
* EntityCard
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import JSONTree from '@alexkuz/react-json-tree';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EpandedMore from 'material-ui/svg-icons/navigation/expand-more';
import EpandedLess from 'material-ui/svg-icons/navigation/expand-less';
import FlatButton from 'material-ui/FlatButton';
import { grey300, red400 } from 'material-ui/styles/colors';
import styles from './styles.css';

export class EntityCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clickOnEntityCard: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    entity: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleClickOnEntity = (entity, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.clickOnEntityCard(entity);
  }
  handleClickOnDelete = (entity, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.clickOnEntityDelete(entity);
  }
  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  }
  handleExpand = () => {
    this.setState({ expanded: true });
  }
  handleReduce = () => {
    this.setState({ expanded: false });
  }
  renderEntityCardHeader = (entity) => {
    const title = entity.targettedResource ? entity.targettedResource.title : entity.title;
    return (
      <CardHeader
        title={title || entity.type.substring(entity.type.indexOf('#') + 1, entity.type.length || entity['@type'])}
      >
        <div
          className={styles.cardHeaderInfoWrapper}
        >
          <span>
            Type {this.renderType(entity.type)} Actor {this.renderActor(entity.actor)} <br />
            {this.renderTime(entity.timeCreated)}
          </span>
        </div>
        <div
          className={styles.cardHeaderDeleteWrapper}
        >
          <ActionDelete
            color={grey300}
            hoverColor={red400}
            onClick={(mouseEvent) => { this.handleClickOnDelete(entity, mouseEvent); }}
          />
        </div>
      </CardHeader>
    );
  }
  renderEntityCardBody = (entity) => {
    const label = 'REDUCE';
    return (
      <CardText
        expandable
      >
        <FlatButton
          onTouchTap={this.handleReduce}
          label={label}
          icon={<EpandedLess />}
          style={{ marginLeft: '-7px', marginTop: '-8px', marginBottom: '15px' }}
        />
        <JSONTree
          data={entity}
          hideRoot
        />
      </CardText>
    );
  }
  renderEntityCardActions = () => {
    const label = 'EXPAND';
    return (
      <CardActions>
        <FlatButton
          icon={<EpandedMore />}
          label={label}
          onTouchTap={this.handleExpand}
          style={{ color: this.state.expanded ? '#9E9E9E' : '#CCCCCC' }}
        />
      </CardActions>
    );
  }
  renderType(type) {
    return (
      <a
        className={styles.entityType}
        href={`${type}`}
      >
        {type.substring(type.indexOf('#') + 1, type.length)}
      </a>
    );
  }
  renderActor(actor) {
    return (
      <span
        className={styles.entityActor}
      >
        {actor}
      </span>
    );
  }
  renderTime(time) {
    const timeObject = new Date(time);
    return (
      <span
        className={styles.entityTime}
      >
        {timeObject.toUTCString()}
      </span>
    );
  }
  render() {
    const { entity } = this.props;
    return (
      <div
        className={styles.cardWrapper}
      >
        <Card
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
        >
          {this.renderEntityCardHeader(entity)}
          {this.renderEntityCardBody(entity)}
          {this.renderEntityCardActions(entity)}
        </Card>
      </div>
    );
  }
}

export default EntityCard;
