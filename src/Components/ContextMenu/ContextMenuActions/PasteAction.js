import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { pasteItems } from '../../../action';
import Typography from '@material-ui/core/Typography';

function PasteAction(props) {
  const { handleClick, selectedFiles } = props;
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <Typography variant='inherit'>Paste</Typography>
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
      dispatch(pasteItems(selectedFiles));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasteAction);
