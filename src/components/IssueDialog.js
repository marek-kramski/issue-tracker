import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  issueDialog: {},

  dialogTitle: {
    padding: '24px 0'
  },
  saveAndClose: {},
  iconButton: {
    padding: '0'
  },
  bottomContainer: {
    paddingTop: '20px',
  },
  button: {
    margin: '5px',
  },
  menuItem: {
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  statusLabel: {
    fontSize: '10px',
  }
};

class IssueDialog extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isTitleNowEdited: false,
      isDescriptionNowEdited: false,
      hasFieldsChanged: false,
      issueId: props.id,
      issueTitle: props.issueTitle,
      issueDescription: props.issueDescription,
      issueStatus: props.issueStatus,
      availableStatuses: props.availableStatuses,
      anchorEl: null,
    };
  }

  toggleEditState = isFieldEdited => event => {
    this.setState({
      [isFieldEdited]: !this.state[isFieldEdited],
    });
  };

  handleChange = issueTitle => event => {
    this.setState({
      [issueTitle]: event.target.value,
    });
  };

  handleStatusChange = issueTitle => event => {
    this.setState({
      [issueTitle]: event.target.textContent,
    });
    this.handleMenuClose();
  };

  saveText = isTitleNowEdited => event => {
    this.setState({
      [isTitleNowEdited]: !this.state[isTitleNowEdited],
      haveFieldsChanged: this.haveFieldsChanged,
    });
  };

  cancelEdit = (fieldToCancel, isFieldNowEdited) => event => {
    this.setState({
      [fieldToCancel]: this.props[fieldToCancel],
      [isFieldNowEdited]: !this.state[isFieldNowEdited],
    });
  };

  haveFieldsChanged = () => {
    let hasIssueTitleChanged = this.state.issueTitle !== this.props.issueTitle;
    let hasIssueDescriptionChanged = this.state.issueDescription !== this.props.issueDescription;
    let hasStatusChanged = this.state.issueStatus !== this.props.issueStatus;

    return !(hasIssueTitleChanged || hasIssueDescriptionChanged || hasStatusChanged);
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  checkStatusChangeAvailability = (status) => {
    switch (this.props.issueStatus) {
      case 'closed':
        return true;
      case 'open':
        return false;
      case 'pending':
        if (status === 'open') {
          return true;
        }
        break;
      default:
        return;
    }
  };

  handleSubmit = event => {
    let updateBody = {
      issueTitle: this.state.issueTitle,
      issueDescription: this.state.issueDescription,
      issueStatus: this.state.issueStatus,
    };
    fetch(`http://localhost:5151/issues/${this.state.issueId}`, {
      method: 'put',
      body: JSON.stringify(updateBody),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
    this.props.onClose();
  };

  render () {
    const {classes} = this.props;

    return (
      <Dialog open={this.props.open}
              onClose={this.props.onClose}
              maxWidth='sm'
              fullWidth>
        <DialogContent className={classes.issueDialog}>
          <form>
            { this.state.isTitleNowEdited ? <Grid container
                                                  direction="row"
                                                  className={classes.dialogTitle}>
              <TextField value={this.state.issueTitle}
                         onChange={this.handleChange('issueTitle')}></TextField>
              <div className={classes.saveAndClose}>
                <IconButton className={classes.iconButton}
                            onClick={this.saveText('isTitleNowEdited')}>
                  <CheckIcon/>
                </IconButton>
                <IconButton className={classes.iconButton}
                            onClick={this.cancelEdit('issueTitle', 'isTitleNowEdited')}>
                  <CloseIcon/>
                </IconButton>
              </div>
            </Grid>
              : <DialogTitle className={classes.dialogTitle}
                             onClick={this.toggleEditState('isTitleNowEdited')}>{this.state.issueTitle}</DialogTitle>
            }
            { this.state.isDescriptionNowEdited ?
              <Grid item xs="12">
                <TextField multiline
                           fullWidth
                           value={this.state.issueDescription}
                           onChange={this.handleChange('issueDescription')}>

                </TextField>
                <div className={classes.saveAndClose}>
                  <IconButton className={classes.iconButton}
                              onClick={this.saveText('isDescriptionNowEdited')}>
                    <CheckIcon/>
                  </IconButton>
                  <IconButton className={classes.iconButton}
                              onClick={this.cancelEdit('issueDescription', 'isDescriptionNowEdited')}>
                    <CloseIcon/>
                  </IconButton>
                </div>
              </Grid>
              :
              <Typography className={classes.issueDescription}
                            onClick={this.toggleEditState('isDescriptionNowEdited')}>{this.state.issueDescription}</Typography>
            }
            <Grid container
                  justify="space-between"
                  alignItems="flex-end"
                  direction="row"
                  className={classes.bottomContainer}>
              <div>
                <Typography className={classes.statusLabel}
                            variant="overline">STATUS</Typography>
                <Button variant="contained"
                        aria-owns={this.state.anchorEl ? 'statuses-menu' : undefined}
                        color="primary"
                        onClick={this.handleMenu}>{this.state.issueStatus}</Button>
                <Menu
                  id="statuses-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleMenuClose}>
                  {this.state.availableStatuses.map(status => (
                    <MenuItem className={classes.menuItem}
                              key={status}
                              disabled={this.checkStatusChangeAvailability(status)}
                              onClick={this.handleStatusChange('issueStatus')}>{status}</MenuItem>
                  ))}
                </Menu>
              </div>
              <Grid item>
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!this.state.haveFieldsChanged}
                        onClick={this.handleSubmit}>Save</Button>
                <Button onClick={this.props.onClose}
                        className={classes.button}>Close</Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(IssueDialog);