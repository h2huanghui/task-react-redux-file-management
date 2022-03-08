import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setVisibleDialogCreateFolder } from '../../../action';
import Typography from '@material-ui/core/Typography';



function CreateFolderAction(props) {
  const { handleClick } = props;

  const handleCloseAfter = (callback) => (event) => {
    callback();
  };
  return (
    <MenuItem onClick={handleCloseAfter(handleClick)}>
      <Typography variant='inherit'>Create folder</Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: (event, selectedFiles) => {
      console.log('event===', event);
      dispatch(setVisibleDialogCreateFolder(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolderAction);
