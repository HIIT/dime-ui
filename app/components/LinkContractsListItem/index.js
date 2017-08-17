/**
*
* LinkContractsListItem
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ActionSpeakerNotesIcon from './speaker-notes';
import { blue500, grey400, grey200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

const iconStyles = {
  marginRight: 32,
  width: 32,
  height: 32,
};

const buttonStyle = {
  margin: 6,
};

class LinkContractsListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    fromDid: React.PropTypes.string,
    fromName: React.PropTypes.string,
    fromAddress: React.PropTypes.string,
    toAddress: React.PropTypes.string,
    tags: React.PropTypes.array,
    data: React.PropTypes.object,
    acceptLinkRequest: React.PropTypes.func,
    declineLinkContract: React.PropTypes.func,
    deleteLinkContract: React.PropTypes.func,
  }

  listTags = (tags) => {
    const tagList = tags.map((tag) =>
      <span className={`${styles.tagItem}`}>{tag}</span>
    );
    return (
      <span>
        {tagList}
      </span>
    );
  }

  render() {
    const { id, type, fromName, fromDid, fromAddress, toAddress, tags, data,
      acceptLinkRequest, declineLinkContract, deleteLinkContract } = this.props;
    const color = (type === 'request') ? grey400 : blue500;

    return (
      <Card>
        <CardHeader
          className={`${styles.linkContractsListItem}`}
          title={(fromAddress ?
            <span>
              <span className={`${styles.fromToTitle}`}>From:</span>&nbsp;
              <span className={`${styles.fromToName}`}>{fromName}</span>&nbsp;
              <span className={`${styles.fromToDid}`}>{fromDid}</span>
            </span>
          : '')}
          subtitle={(tags ?
            <span>
              <span className={`${styles.fromToTitle}`}>tags:</span>&nbsp;
              <span className={`${styles.fromTagsList}`}>{this.listTags(tags)}</span>
            </span>
          : '')}
          actAsExpander
          showExpandableButton
          avatar={<ActionSpeakerNotesIcon color={color} style={iconStyles} />}
        />
        <CardActions>
          {type === 'request' ?
            <div>
              <RaisedButton
                label="Accept"
                primary
                style={buttonStyle}
                onClick={() => acceptLinkRequest(id)}
              />
              <RaisedButton
                label="Decline"
                secondary
                style={buttonStyle}
                onClick={() => declineLinkContract(id)}
              />
            </div>
          :
            <div>
              <RaisedButton
                label="Remove"
                secondary
                style={buttonStyle}
                onClick={() => deleteLinkContract(id)}
              />
            </div>
          }
        </CardActions>
        <CardText expandable>
          Raw data
          <TextField
            id={`${fromAddress}:${toAddress}`}
            hintText=""
            multiLine
            rows={5}
            rowsMax={12}
            fullWidth
            value={JSON.stringify(data, null, 6)}
            textareaStyle={{ backgroundColor: grey200 }}
          />
        </CardText>
      </Card>
    );
  }
}

export default LinkContractsListItem;
