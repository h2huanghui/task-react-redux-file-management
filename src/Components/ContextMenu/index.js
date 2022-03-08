import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';
import { getActionsByMultipleFiles } from '../../Api';
import Menu from '@material-ui/core/Menu';
import OpenAction from './ContextMenuActions/OpenAction';
import AddAction from './ContextMenuActions/AddAction';
import CreateFolderAction from './ContextMenuActions/CreateFolderAction';
import CopyAction from './ContextMenuActions/CopyAction';
import CutAction from './ContextMenuActions/CutAction';
import PasteAction from './ContextMenuActions/PasteAction';
import RenameAction from './ContextMenuActions/RenameAction';
import DeleteAction from './ContextMenuActions/DeleteAction';

const ContextMenu = (props) => {
  const { acts, visible, x, y } = props;
  const actionsComp = acts.map((act, key) => {
    let componenent;
    if (act === 'open') {
      componenent = <OpenAction key={key} />;
    }
    if (act === 'add file') {
      componenent = <AddAction key={key} />;
    }
    if (act === 'add folder') {
      componenent = <CreateFolderAction key={key} />;
    }
    if (act === 'copy') {
      componenent = <CopyAction key={key} />;
    }

    if (act === 'cut') {
      componenent = <CutAction key={key} />;
    }

    if (act === 'rename') {
      componenent = <RenameAction key={key} />;
    }

    if (act === 'delete') {
      componenent = <DeleteAction key={key} />;
    }
    if (act === 'paste') {
      componenent = <PasteAction key={key} />;
    }
    return componenent;
  });
  return (
    <div>
      <Menu
        anchorReference='anchorPosition'
        anchorPosition={{ top: y, left: x }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={visible}
        onClose={() => {}}
        PaperProps={{ style: { width: 170 } }}
      >
        {actionsComp}
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    x: state.contextMenuPosition[0] || 0,
    y: state.contextMenuPosition[1] || 0,
    visible: !!state.contextMenuVisible,
    acts: getActionsByMultipleFiles(state.selectedFiles),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
