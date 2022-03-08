import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setVisibleDialogCreateFolder } from '../../../action';
import Typography from '@material-ui/core/Typography';

function AddAction(props) {
  const { handleClick, selectedFiles } = props;
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <Typography variant='inherit'>Add File</Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedFiles: state.selectedFiles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: (event, selectedFiles) => {
      console.log('event===', event);
      dispatch(setVisibleDialogCreateFolder(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAction);
