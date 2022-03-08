import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setVisibleDialogRename } from '../../../action';
import Typography from '@material-ui/core/Typography';

function RenameAction(props) {
  const { handleClick, selectedFiles } = props;
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <Typography variant='inherit'>Rename</Typography>
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
      dispatch(setVisibleDialogRename(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameAction);
