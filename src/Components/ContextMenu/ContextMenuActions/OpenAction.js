import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

function OpenAction(props) {
  const { handleClick, selectedFiles } = props;
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <Typography variant='inherit'>Open</Typography>
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
      if (selectedFiles[0].type === 'folder') {
        // dispatch(enterToDirectory(selectedFiles[0].name));
        return;
      }
      // dispatch(getFileContent(selectedFiles[0].name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAction);
