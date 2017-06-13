/**
*
* LinkContractsListItem
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ActionAccountCircleIcon from 'react-material-icons/icons/action/account-circle';
import { blue500, green500, grey200 } from 'material-ui/styles/colors';
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
    type: React.PropTypes.string,
    fromDid: React.PropTypes.string,
    fromName: React.PropTypes.string,
    toAddress: React.PropTypes.string,
    toDid: React.PropTypes.string,
    toName: React.PropTypes.string,
    data: React.PropTypes.object,
    acceptLinkRequest: React.PropTypes.func,
    declineLinkContract: React.PropTypes.func,
    deleteLinkContract: React.PropTypes.func,
  }

  render() {
    const { type, fromName, fromDid, toAddress, toName, toDid, data,
      acceptLinkRequest, declineLinkContract, deleteLinkContract } = this.props;
    const color = (type === 'request') ? green500 : blue500;

    return (
      <Card>
        <CardHeader
          className={styles.linkContractsListItem}
          title={
            <span>
              <span className="fromToTitle">From:</span>&nbsp;
              <span className="fromToName">{fromName}</span>&nbsp;
              <span className="fromToDid">{fromDid}</span>
            </span>}
          subtitle={
            <span>
              <span className="fromToTitle">To:</span>&nbsp;
              <span className="fromToName">{toName}</span>&nbsp;
              <span className="fromToDid">{toDid}</span>
            </span>}
          actAsExpander
          showExpandableButton
          avatar={<ActionAccountCircleIcon color={color} style={iconStyles} />}
        />
        <CardActions>
          {type === 'request' ?
            <div>
              <RaisedButton
                label="Accept"
                primary
                style={buttonStyle}
                onClick={() => acceptLinkRequest(fromDid, toAddress)}
              />
              <RaisedButton
                label="Decline"
                secondary
                style={buttonStyle}
                onClick={() => declineLinkContract(fromDid, toAddress)}
              />
            </div>
          :
            <div>
              <RaisedButton
                label="Remove"
                secondary
                style={buttonStyle}
                onClick={() => deleteLinkContract(fromDid, toAddress)}
              />
            </div>
          }
        </CardActions>
        <CardText expandable>
          <TextField
            id={`${fromDid}:${toAddress}`}
            hintText=""
            multiLine
            rows={3}
            rowsMax={5}
            fullWidth
            value={JSON.stringify(data)}
            textareaStyle={{ backgroundColor: grey200 }}
          />
        </CardText>
      </Card>
    );
  }
}

export default LinkContractsListItem;
