/**
*
* EntityCard
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { Tabs, Tab } from 'material-ui/Tabs';
import JSONTree from 'leonaves-react-json-tree';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EpandedMore from 'material-ui/svg-icons/navigation/expand-more';
import EpandedLess from 'material-ui/svg-icons/navigation/expand-less';
import FlatButton from 'material-ui/FlatButton';
import { grey300, blue300, red400 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
    removeFromProfile: React.PropTypes.func,
    entity: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      entity_details_expanded: false,
      profile_list_expanded: false,
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
              valueRenderer={raw => (raw.length > 1000 ? <em>text lenth > 3000, hiden</em> : raw)}
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
    const notAutoTags = entity.tags.filter((tag) => !tag.auto);
    const autoTags = entity.tags.filter((tag) => tag.auto);
    return (
      <Row
        key={entity.id}
        className={styles.entityWrapper}
      >
        <Col xsOffset={0} xs={1} smOffset={2} sm={2} >
          <div
            className={styles.entityWrapper}
          >
            <TagsList
              entityID={entity.id}
              tags={autoTags}
              clickOnTag={this.props.clickOnEntityTag}
              className={styles.autoTag}
            />
            <TagsList
              entityID={entity.id}
              tags={notAutoTags}
              clickOnTag={this.props.clickOnEntityTag}
              className={styles.notAutoTag}
            />
          </div>
        </Col>
        <Col xsOffset={1} xs={8} smOffset={0} sm={6} >
          <Card
            expanded={this.state.entity_details_expanded}
            onExpandChange={this.handleExpandChange}
          >
            {this.renderEntityCardHeader(entity)}
            {this.state.entity_details_expanded ? this.renderEntityCardBody(entity) : null}
            {this.renderEntityCardActions(entity)}
          </Card>
        </Col>
        <Col xs={2} >
          { this.state.profile_list_expanded ? null :
            <FloatingActionButton
              zDepth={0}
              backgroundColor={blue300}
              mini
              onTouchTap={(mouseEvent) => this.handleClickAdd(entity, mouseEvent)}
            >
              <ContentAdd />
            </FloatingActionButton>
          }
          { this.state.profile_list_expanded ?
            <Paper
              style={{ display: 'inline-block' }}
            >
              <ul
                className={styles.profileListUL}
              >
               {this.props.profiles.map((profile) =>
                 <li
                   className={styles.profileListLI}
                   key={profile.id}
                   onTouchTap={(mouseEvent) => this.handleAddToProfile(entity, profile.id, mouseEvent)}
                 >
                    {profile.name}
                 </li>)
               }
                <li
                  className={styles.profileListLICancel}
                  onTouchTap={(mouseEvent) => this.handleClickCancelAdd(mouseEvent)}
                >
                  Cancel
                </li>
              </ul>
            </Paper>
          : null }
        </Col>
      </Row>
    );
  }
}

export default EntityCard;
