/**
*
* LinkContractsListItem
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ActionSpeakerNotesIcon from './speaker-notes';
import { grey400 } from 'material-ui/styles/colors';
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

class LinkContractsListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: React.PropTypes.string,
    authorizingAuthority: React.PropTypes.string,
    requestingAuthority: React.PropTypes.string,
    direction: React.PropTypes.string,
    name: React.PropTypes.string,
    username: React.PropTypes.string,
    email: React.PropTypes.string,
    attributes: React.PropTypes.object,
    tags: React.PropTypes.array,
    data: React.PropTypes.object,
    deleteLinkContract: React.PropTypes.func,
  }

  listTags = (tags) => {
    const tagList = tags.map((tag) =>
      <span key={`${tag}`} className={`${styles.tagItem}`}>{tag}</span>
    );
    return (
      <span>
        {tagList}
      </span>
    );
  }

  listAttributes = (attrs) => {
    const attrList = Object.keys(attrs).map((key) =>
      <div key={`${key}:${attrs[key]}`} className={`${styles.attributeItem}`}>
        <span className={`${styles.attributeItemKey}`}>{key}</span>:&nbsp;
        <span className={`${styles.attributeItemValue}`}>{attrs[key]}</span>
      </div>
    );
    return (
      <div>
        {attrList}
      </div>
    );
  }

  render() {
    const { id, authorizingAuthority, requestingAuthority, direction,
      name, username, email, attributes, tags, data, deleteLinkContract } = this.props;
    const color = grey400;
    const dataJsonString = JSON.stringify(data, null, 2);

    return (
      <Card id={`${authorizingAuthority}:${requestingAuthority}`}>
        ({direction === 'incoming' ?
          <CardHeader
            className={`${styles.linkContractsListItem}`}
            style={{ paddingBottom: 0 }}
            title={(authorizingAuthority ?
              <span>
                <span className={`${styles.did}`}>{authorizingAuthority}</span>&nbsp;
                <span className={`${styles.title}`}>shared profile to you</span>
              </span>
            : '')}
            subtitle={
              <div className={`${styles.subtitle}`}>
                <div>
                  {(name ?
                    <span>
                      <span className={`${styles.title}`}>name:</span>&nbsp;
                      <span className={`${styles.email}`}>{name}</span>&nbsp;
                    </span>
                  : '')}
                  {(email ?
                    <span>
                      <span className={`${styles.title}`}>e-mail:</span>&nbsp;
                      <span className={`${styles.email}`}>{email}</span>&nbsp;
                    </span>
                  : '')}
                  {(username ?
                    <span>
                      <span className={`${styles.title}`}>username:</span>&nbsp;
                      <span className={`${styles.username}`}>{username}</span>
                    </span>
                  : '')}
                </div>
              </div>}
            actAsExpander
            showExpandableButton
            avatar={<ActionSpeakerNotesIcon color={color} style={iconStyles} />}
          />
          : ''
        }
        {direction === 'outgoing' ?
          <CardHeader
            className={`${styles.linkContractsListItem}`}
            style={{ paddingBottom: 0 }}
            title={(requestingAuthority ?
              <span>
                <span className={`${styles.title}`}>You shared profile to</span>&nbsp;
                <span className={`${styles.did}`}>{requestingAuthority}</span>
              </span>
            : '')}
            subtitle={(tags ?
              <span>
                <span className={`${styles.title}`}>tags:</span>&nbsp;
                <span className={`${styles.tagsList}`}>{this.listTags(tags)}</span>
              </span>
            : '')}
            actAsExpander
            showExpandableButton
            avatar={<ActionSpeakerNotesIcon color={color} style={iconStyles} />}
          />
          : ''
        }
        <CardText expandable style={{ paddingBottom: 0 }}>
          {(attributes ?
            <div>
              <div>
                <span className={`${styles.title}`}>Attributes</span>&nbsp;
                <div className={`${styles.attributesList}`}>{this.listAttributes(attributes)}</div>
              </div>
              <div>&nbsp;</div>
            </div>
          : '')}

          {(tags ?
            <div>
              <div>
                <span className={`${styles.title}`}>Tags</span>&nbsp;
                <div className={`${styles.tagsList}`}>{this.listTags(tags)}</div>
              </div>
              <div>&nbsp;</div>
            </div>
          : '')}

          <div>
            <div>Raw data</div>
            <code className={`${styles.jsonCode}`}>
              {dataJsonString}
            </code>
          </div>
        </CardText>
        <CardActions>
          <div>
            <RaisedButton
              label="Remove"
              secondary
              style={buttonStyle}
              onClick={() => deleteLinkContract(id)}
            />
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default LinkContractsListItem;
