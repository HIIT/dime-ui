/**
*
* LinkContractRequestsListItem
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ActionSpeakerNotesIcon from './speaker-notes';
import { blue500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './styles.css';

const iconStyles = {
  marginRight: 32,
  width: 32,
  height: 32,
};

const buttonStyle = {
  margin: 6,
};

class LinkContractRequestsListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: React.PropTypes.string,
    from: React.PropTypes.string,
    direction: React.PropTypes.string,
    tags: React.PropTypes.array,
    data: React.PropTypes.object,
    acceptLinkContractRequest: React.PropTypes.func,
    declineLinkContractRequest: React.PropTypes.func,
  }

  listTags = (tags, id) => {
    const tagList = tags.map((tag) =>
      <span id={`${tag}:${id}`} key={`${tag}:${id}`} className={`${styles.tagItem}`}>{tag}</span>
    );
    return (
      <span id={`tagcontainer:${id}`} key={`tagcontainer:${id}`}>
        {tagList}
      </span>
    );
  }

  render() {
    const { id, from, direction, tags, data,
      acceptLinkContractRequest, declineLinkContractRequest } = this.props;
    const color = blue500;
    const dataJsonString = JSON.stringify(data, null, 2);

    return (
      <Card id={`${id}`} key={`${id}`}>
        {direction === 'incoming' ?
          <CardHeader
            className={`${styles.linkContractRequestsListItem}`}
            style={{ paddingBottom: 0 }}
            title={(from ?
              <span>
                <span className={`${styles.did}`}>{from}</span>&nbsp;
                <span className={`${styles.title}`}>requested profile from you</span>
              </span>
            : '')}
            actAsExpander
            showExpandableButton
            avatar={<ActionSpeakerNotesIcon color={color} style={iconStyles} />}
          />
        : ''}
        <CardText expandable style={{ paddingBottom: 0 }}>
          <div>
            {(tags ?
              <div>
                <div>
                  <span className={`${styles.title}`}>Tags</span>&nbsp;
                  <div className={`${styles.tagsList}`}>{this.listTags(tags, id)}</div>
                </div>
                <div>&nbsp;</div>
              </div>
            : '')}

            <div>Raw data</div>
            <code className={`${styles.jsonCode}`}>
              {dataJsonString}
            </code>
          </div>
        </CardText>
        <CardActions>
          <div>
            <RaisedButton
              label="Accept"
              primary
              style={buttonStyle}
              onClick={() => acceptLinkContractRequest(id)}
            />
            <RaisedButton
              label="Decline"
              secondary
              style={buttonStyle}
              onClick={() => declineLinkContractRequest(id)}
            />
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default LinkContractRequestsListItem;
