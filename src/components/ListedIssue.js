import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import IssueDialog from './IssueDialog';

const styles = {
  singleIssueCard: {
    margin: '10px',
    padding: '10px',
  },
  cardContent: {
    height: '140px',
    display: '-webkit-box',
    overflow: 'hidden',
    lineClamp: '6',
    boxOrient: 'vertical',
  },
  issueTitle: {
    fontWeight: '600',
  },
  issueDescription: {},
};

class ListedIssue extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogOpen: false,
    }
  }

  handleDialogOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  render () {
    const {classes, ...rest} = this.props;

    return (
      <Card className={classes.singleIssueCard}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.issueTitle} paragraph>{this.props.issueTitle}</Typography>
          <Typography className={classes.issueDescription}>{this.props.issueDescription}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button color="secondary" size="small" onClick={this.handleDialogOpen}>Show issue</Button>
        </CardActions>
        <IssueDialog {...rest} open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
      </Card>
    );
  }
}

export default withStyles(styles)(ListedIssue);