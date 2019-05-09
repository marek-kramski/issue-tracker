import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ListedIssue from './ListedIssue';

const styles = {
  container: {
    backgroundColor: '#FAFAFA',
    minHeight: '100vh',
    padding: '100px'
  },
  issuesContainer: {
    maxWidth: '1140px',
    minHeight: '40vh',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tableHeader: {
    width: '100%',
  },
  statusColumn: {
    border: '1px solid #FAFAFA',
  },
  statusName: {
    border: '1px solid #FAFAFA',
    padding: '10px 10px',
    textTransform: 'uppercase',
  }
};

class IssuesList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      issues: [],
      statuses: [
        'open',
        'pending',
        'closed',
      ]
    };
  }

  componentDidMount () {
    this.callBackendAPI()
      .then(res => this.setState({issues: res.data}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('http://localhost:5151/issues');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render () {
    const {classes} = this.props;

    const data = this.state.issues;
    const statuses = this.state.statuses;

    return (
      <div className={classes.container}>
        <Paper className={classes.issuesContainer}>
          <div className={classes.tableHeader}>
            <Grid container
                  direction='row'
                  justify="space-evenly">
              {statuses.map(status => (
                <Grid item xs={4} key={status}>
                  <div className={classes.statusName}>{status}</div>
                </Grid>
              ))}
            </Grid>
          </div>
          <Divider />

          <Grid container
                direction='row'
                justify="space-evenly">
            {statuses.map(status => (
              <Grid item xs={4}
                    key={status}
                    className={classes.statusColumn}>
                {
                  <List key={status}>
                    {data.map(issue => (
                      (issue.issueStatus === status) ?
                        <ListedIssue {...issue} key={issue.id} availableStatuses={statuses}/> : null
                    ))}
                  </List>
                }
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(IssuesList);