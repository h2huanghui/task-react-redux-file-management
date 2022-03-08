import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import blue from '@material-ui/core/colors/blue';

import {
  rightClickOnFile,
  setContextMenuVisible,
  setContextMenuPosition,
  setSelectedFiles,
  setSelectedFolderSublist,
} from '../../../../../action';

class File extends Component {
  render() {
    const {
      isSelected,
      name,
      type,
      id,
      children,
      handleClick,
      handleContextMenu,
    } = this.props;
    console.log('isSelected===', isSelected);
    console.log('name===', name);
    console.log('name===', id);

    const avatarStyle = {
      backgroundColor: isSelected ? blue['A200'] : null,
    };
    return (
      <Fragment>
        <div onContextMenu={handleContextMenu} onClick={handleClick}>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={avatarStyle}>
                {type === 'folder' ? <FolderIcon /> : <FileIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        </div>
        {/* {children &&
          children.length > 0 &&
          children.map((item) => (
            <div
              key={item.key}
              id={item.key}
              onContextMenu={(e) => handleContextMenu(e, item)}
              onClick={(e) => handleClick(e, item)}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={avatarStyle}>
                    {type === 'folder' ? <FolderIcon /> : <FileIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItem>
            </div>
          ))} */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSelected: !!state.selectedFiles.find((f) => f.name === ownProps.name),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /**
     *  @param {Object} e
     *  @returns {undefined}
     */
    handleContextMenu: (event, item) => {
      event.preventDefault();
      event.stopPropagation();
      const x = event.clientX || (event.touches && event.touches[0].pageX);
      const y = event.clientY || (event.touches && event.touches[0].pageY);
      //用户是否按住shift键
      if (event.shiftKey) {
      } else {
        dispatch(rightClickOnFile(item ? item : ownProps));
      }
      dispatch(setContextMenuVisible(true));
      dispatch(setContextMenuPosition(x, y));
    },
    /**
     *  @param {Object} event
     *  @returns {undefined}
     */
    handleClick: (event, item) => {
      event.stopPropagation();
      console.log('item===', item);
      console.log('ownProps==', ownProps);
      if (event.ctrlKey) {
        console.log('test ctrlKey==', event.ctrlKey);
      } else if (event.shiftKey) {
        console.log('test shiftKey==', event.shiftKey);
      } else {
        dispatch(setSelectedFiles([item ? item : ownProps]));
        // dispatch(setSelectedFolderSublist(ownProps));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(File);
