/**
*
* EntitiesList
*
*/

import React from 'react';
import ReactList from 'react-list';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { blue300 } from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TagsList from 'components/TagsList';
import EntityCard from 'components/EntityCard';
import styles from './styles.css';

export class EntitiesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initEntitiesList: React.PropTypes.func,
    search: React.PropTypes.func,
    entities: React.PropTypes.array,
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    clickOnEntityCard: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
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
  rednerLoadingIndicator = () => (this.props.loading ? <CircularProgress size={0.5} /> : null)
  renderEntity = (entity) => {
    // const entity = this.props.entities[entityIndex];
    const notAutoTags = entity.tags.filter((tag) => !tag.auto);
    const autoTags = entity.tags.filter((tag) => tag.auto);
    return (
      <Row
        key={entity.id}
        className={styles.entityWrapper}
      >
        <Col xsOffset={0} xs={1} smOffset={2} sm={2} >
          <TagsList
            entityID={entity.id}
            tags={autoTags}
            clickOnTag={this.props.clickOnEntityTag}
            className={`label-default ${styles.autoTag}`}
          />
          <TagsList
            entityID={entity.id}
            tags={notAutoTags}
            clickOnTag={this.props.clickOnEntityTag}
            className={`label-sucess ${styles.notAutoTag}`}
          />
        </Col>
        <Col xsOffset={1} xs={8} smOffset={0} sm={6} >
          <EntityCard
            entity={entity}
            clickOnEntityCard={this.props.clickOnEntityCard}
            clickOnEntityDelete={this.props.clickOnEntityDelete}
          />
        </Col>
        <Col xs={1} >
          <FloatingActionButton
            zDepth={0}
            backgroundColor={blue300}
            mini
          >
            <ContentAdd />
          </FloatingActionButton>
        </Col>
      </Row>
    );
  }
  renderSearchBox = () => {
    const hint = 'Search';
    const floatedHint = 'Keyword';
    return (
      <Row>
        <Col
          smOffset={3}
          xs={1}
          sm={1}
        >
          <div className={styles.loadingIndicatorWrapper}>
            {this.rednerLoadingIndicator()}
          </div>
        </Col>
        <Col xsOffset={1} xs={8} smOffset={0} sm={6} >
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
      <Grid
        className={styles.entitiesListWrapper}
      >
        {this.renderSearchBox()}
        <ReactList
          itemRenderer={(index) => this.renderEntity(this.props.entities[index])}
          length={this.props.entities.length}
          pageSize={12}
          threshold={450}
          useTranslate3d // TODO:check browsers support for Translate3d
        />
      </Grid>
    );
  }
}

export default EntitiesList;
