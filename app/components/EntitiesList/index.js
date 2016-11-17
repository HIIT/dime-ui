/**
*
* EntitiesList
*
*/

import React from 'react';
import ReactList from 'react-list';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';
import EntityCard from 'components/EntityCard';
import styles from './styles.css';

export class EntitiesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initEntitiesList: React.PropTypes.func,
    loadMoreEntities: React.PropTypes.func,
    search: React.PropTypes.func,
    entities: React.PropTypes.array,
    error: React.PropTypes.object,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityCard: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnAdd: React.PropTypes.func,
    profiles: React.PropTypes.array,
    loadProfiles: React.PropTypes.func,
    addToProfile: React.PropTypes.func,
    removeFromProfile: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentWillMount() {
    this.props.initEntitiesList();
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.search(this.state.value);
    }
  }
  handleScroll = () => {
    const [lastVisibleIndex] = this.entitiesList.getVisibleRange();
    // const whenAtMiddle = ((lastVisibleIndex % 24) >= 4 && (lastVisibleIndex % 24) <= 6);
    const whenAtBottom = (lastVisibleIndex % 24 >= 23);
    if (whenAtBottom || isNaN(lastVisibleIndex)) { // 24 = number of entities load per "page" of GET API.
      const nextPageNumber = Math.floor(this.entitiesList.props.length / 24) + 1;
      if (nextPageNumber) {
        this.props.loadMoreEntities(nextPageNumber);
      }
    }
  }
  renderEntity = (entity) =>
    <EntityCard
      key={entity.id}
      entity={entity}
      clickOnEntityCard={this.props.clickOnEntityCard}
      clickOnEntityDelete={this.props.clickOnEntityDelete}
      clickOnEntityTag={this.props.clickOnEntityTag}
      profiles={this.props.profiles}
      loadProfiles={this.props.loadProfiles}
      addToProfile={this.props.addToProfile}
      removeFromProfile={this.props.removeFromProfile}
    />
  renderSearchBox = () => {
    const hint = 'Enter Keywords';
    const floatedHint = 'Search';
    return (
      <Row>
        <Col xsOffset={2} xs={8} smOffset={4} sm={6} >
          <TextField
            hintText={hint}
            floatingLabelText={floatedHint}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            fullWidth
          />
        </Col>
      </Row>
    );
  }
  render() {
    return (
      <Grid>
        {this.renderSearchBox()}
        <div
          className={styles.entitiesListOutterWrapper}
        >
          <div
            className={styles.entitiesListInnerWrapper}
            onScroll={this.handleScroll}
          >
            <ReactList
              itemRenderer={(index) => this.renderEntity(this.props.entities[index])}
              length={this.props.entities.length}
              pageSize={12}
              threshold={450}
              ref={(reactList) => { this.entitiesList = reactList; }}
            />
          </div>
        </div>
      </Grid>
    );
  }
}

export default EntitiesList;
