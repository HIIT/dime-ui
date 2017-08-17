/**
*
* EntityCard
*
*/

import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { Tabs, Tab } from 'material-ui/Tabs';
import JSONTree from 'leonaves-react-json-tree';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EpandedMore from 'material-ui/svg-icons/navigation/expand-more';
import EpandedLess from 'material-ui/svg-icons/navigation/expand-less';
import { grey300, blue300, red400 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import get from 'lodash/get';
import Paper from 'material-ui/Paper';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles';
import TagsList from 'components/TagsList';
import styles from './styles.css';

export class EntityCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clickOnEntityCard: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    profiles: React.PropTypes.array,
    loadProfiles: React.PropTypes.func,
    addToProfile: React.PropTypes.func,
    entity: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      entity_details_expanded: false,
      profile_list_expanded: false,
      json_view_expanded: false,
    };
  }
  handleClickOnEntity = (entity, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.clickOnEntityCard(entity);
  }
  handleClickOnDelete = (entity, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.clickOnEntityDelete(entity.id);
  }
  handleExpandChange = (expanded) => {
    this.setState({ entity_details_expanded: expanded });
  }
  handleExpand = () => {
    this.setState({ entity_details_expanded: true });
  }
  handleReduce = () => {
    this.setState({ entity_details_expanded: false });
  }
  handleClickOnShowJSON = () => {
    this.setState({ json_view_expanded: true });
  }
  handleClickAdd = () => {
    this.props.loadProfiles();
    this.setState({ profile_list_expanded: true });
  }
  handleClickCancelAdd = () => {
    this.setState({ profile_list_expanded: false });
  }
  handleAddToProfile = (entity, profileID, mouseEvent) => {
    mouseEvent.preventDefault();
    this.props.addToProfile(entity, profileID);
  }
  openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }
  rednerAbstract(entity) {
    if (entity.targettedResource || entity.plainTextContent) {
      const plainTextContent = entity.targettedResource ? get(entity, 'targettedResource.plainTextContent') : entity.plainTextContent;
      return (
        <p className={`${styles.abstractP}`}>{plainTextContent.substring(0, 300)}</p>
      );
    }
    return null;
  }
  renderTitle = (entity) => {
    const title = entity.targettedResource ? get(entity, 'targettedResource.title') : entity.title;
    const type = get(entity, 'type', '');
    return (
      <a
        href={entity.targettedResource ? get(entity, 'targettedResource.uri') : entity.uri}
        target="_blank"
        className={`${styles.entityTitleLink}`}
      >
        <span className={`${styles.entityTitle}`}>
          {title || type.substring(type.indexOf('#') + 1, type.length || entity['@type'])}
        </span>
      </a>
    );
  }
  renderEntityCardHeader = (entity) =>
    <CardHeader
      title={this.renderTitle(entity)}
    >
      <div
        className={`${styles.cardHeaderInfoWrapper}`}
      >
        {entity.type ?
          <span>
            Type {this.renderType(get(entity, 'type', ''))}
          </span>
        : null }
        { entity.actor ?
          <span>
            Actor {this.renderActor(get(entity, 'actor', ''))}
          </span>
        : null }
      </div>
      <div
        className={`${styles.cardHeaderDeleteWrapper}`}
      >
        <ActionDelete
          color={grey300}
          hoverColor={red400}
          onClick={(mouseEvent) => { this.handleClickOnDelete(entity, mouseEvent); }}
        />
      </div>
    </CardHeader>
  renderJSONViewer = (entity) =>
    <Tabs
      tabItemContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      inkBarStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <Tab
        label="JSON (tree-view)"
        style={{ color: 'rgba(0, 0, 0, 0.25)' }}
      >
        <JSONTree
          data={entity}
          shouldExpandNode={() => false}
          valueRenderer={(raw) => (raw.length > 1000 ? <em>text lenth &gt; 3000, hiden</em> : raw)}
          hideRoot
        />
      </Tab>
      <Tab
        label="JSON (raw)"
        style={{ color: 'rgba(0, 0, 0, 0.25)' }}
      >
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          customStyle={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', fontSize: '12px', fontFamily: "'Roboto Mono', monospace !important" }}
        >
          {JSON.stringify(entity, null, 4)}
        </SyntaxHighlighter>
      </Tab>
    </Tabs>
  renderEntityCardBody = (entity) =>
    <div className={`${styles.entityBodyWrapper}`} >
      <CardText
        expandable
      >
        {this.renderTagsList(entity)}
        {this.rednerAbstract(entity)}
        {this.state.json_view_expanded ? null : <span className={`${styles.fullJSONButton}`} onClick={this.handleClickOnShowJSON} >Full JSON</span> }
        {this.state.json_view_expanded ? this.renderJSONViewer(entity) : null}
      </CardText>
    </div>
  renderEntityCardExpandReduce = () => {
    if (this.state.entity_details_expanded) {
      return (
        <div className={`${styles.clearfix}`}>
          <div
            className={`${styles.entityCardReducenWrapper}`}
            onClick={this.handleReduce}
          >
            <EpandedLess
              style={{ color: '#9E9E9E', cursor: 'pointer' }}
            />
          </div>
        </div>
      );
    }
    return null;
  }
  renderEntityCardExpandButton = () => {
    if (!this.state.entity_details_expanded) {
      return (
        <div className={`${styles.clearfix}`}>
          <div
            className={`${styles.entityCardExpandWrapper}`}
            onClick={this.handleExpand}
            style={{ cursor: 'pointer' }}
          >
            <EpandedMore
              style={{ color: '#9E9E9E' }}
            />
          </div>
        </div>
      );
    }
    return null;
  }
  renderType(type) {
    return (
      <a
        className={`${styles.entityType}`}
        href={`${type}`}
      >
        {type.substring(type.indexOf('#') + 1, type.length)}
      </a>
    );
  }
  renderActor(actor) {
    return (
      <span
        className={`${styles.entityActor}`}
      >
        {actor}
      </span>
    );
  }
  renderTime(time) {
    const timeObject = new Date(time);
    function dayOfWeekAsString(dayIndex) {
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
    }
    return (
      <div
        className={`${styles.entityTimeWrapper}`}
      >
        <div className={`${styles.entityTime}`} >{timeObject.toLocaleTimeString()} </div>
        <div className={`${styles.entityDay}`}>{dayOfWeekAsString(timeObject.getDay())} </div>
        <div className={`${styles.entityDate}`}>{timeObject.toLocaleDateString()}</div>
      </div>
    );
  }
  renderTagsList = (entity) => {
    if (!entity.tags || entity.tags.length <= 0) {
      return null;
    }
    const notAutoTags = entity.tags.filter((tag) => !tag.auto);
    const autoTags = entity.tags.filter((tag) => tag.auto);
    return (
      <div
        className={`${styles.entityTagsListWrapper}`}
      >
        <TagsList
          entityID={entity.id}
          tags={autoTags}
          clickOnTag={this.props.clickOnEntityTag}
          className={`${styles.autoTag}`}
        />
        <TagsList
          entityID={entity.id}
          tags={notAutoTags}
          clickOnTag={this.props.clickOnEntityTag}
          className={`${styles.notAutoTag}`}
        />
      </div>
    );
  }
  renderAddToProfile = (entity) =>
    <div className={`${styles.addToProfileWrapper}`}>
      { this.state.profile_list_expanded ? null :
        <FloatingActionButton
          zDepth={0}
          backgroundColor={blue300}
          mini
          onTouchTap={(mouseEvent) => this.handleClickAdd(entity, mouseEvent)}
          style={{ marginLeft: '-3px' }}
          iconStyle={{ width: '25px', height: '25px' }}
        >
          <ContentAdd style={{ width: '18px' }} />
        </FloatingActionButton>
      }
      { this.state.profile_list_expanded ?
        <Paper
          style={{ display: 'inline-block' }}
        >
          <ul
            className={`${styles.profileListUL}`}
          >
            {this.props.profiles.map((profile) =>
              <li
                className={`${styles.profileListLI}`}
                key={profile.id}
                onTouchTap={(mouseEvent) => this.handleAddToProfile(entity, profile.id, mouseEvent)}
              >
                {profile.name}
              </li>)
            }
            <li
              className={`${styles.profileListLICancel}`}
              onTouchTap={(mouseEvent) => this.handleClickCancelAdd(mouseEvent)}
            >
              Cancel
            </li>
          </ul>
        </Paper>
      : null }
    </div>
  render() {
    const { entity } = this.props;
    return (
      <Row
        key={entity.id}
        className={`${styles.entityWrapper}`}
      >
        <Col xsOffset={0} xs={1} smOffset={2} sm={2} >
          {this.renderTime(entity.start == null ? entity.timeCreated : entity.start)}
        </Col>
        <Col xsOffset={1} xs={8} smOffset={0} sm={6} >
          <Card
            expanded={this.state.entity_details_expanded}
            onExpandChange={this.handleExpandChange}
          >
            {this.renderEntityCardHeader(entity)}
            {this.renderEntityCardExpandReduce()}
            {this.state.entity_details_expanded ? this.renderEntityCardBody(entity) : null}
            {this.renderEntityCardExpandButton(entity)}
          </Card>
        </Col>
        <Col xs={2} >
          {this.renderAddToProfile(entity)}
        </Col>
      </Row>
    );
  }
}

export default EntityCard;
