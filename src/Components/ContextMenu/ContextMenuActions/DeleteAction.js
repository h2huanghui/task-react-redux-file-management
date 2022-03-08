import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { deleteItems } from '../../../action';
import Typography from '@material-ui/core/Typography';

function DeleteAction(props) {
  const { handleClick, selectedFiles } = props;
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <Typography variant='inherit'>Delete</Typography>
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
      dispatch(deleteItems(selectedFiles));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAction);
