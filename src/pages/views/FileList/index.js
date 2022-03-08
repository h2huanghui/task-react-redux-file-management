import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {
  rightClickOnFile,
  setContextMenuVisible,
  setContextMenuPosition,
  setSelectedFiles,
  setSelectedFolderSublist,
  setFileContent,
  setFileContentVisi
} from '../../../action';

class FileList extends Component {
  render() {
    const { initailData, handleClick, handleContextMenu } = this.props;
    console.log('treeData==', initailData);

    const renderTree = (nodes) => (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        onContextMenu={(e) => handleContextMenu(e, nodes)}
        onClick={(e) => handleClick(e, nodes)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => {
              return <div key={node.id}>{renderTree(node)}</div>;
            })
          : null}
      </TreeItem>
    );

    return (
      <TreeView
        defaultExpanded={['0-0']}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {initailData.map((data, index) => {
          return <div key={index}>{renderTree(data)}</div>;
        })}
      </TreeView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initailData: state.treeData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /**
     *  @param {Object} e
     *  @returns {undefined}
     */
    handleContextMenu: (event, node) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('rightClick node===', node);
      const x = event.clientX || (event.touches && event.touches[0].pageX);
      const y = event.clientY || (event.touches && event.touches[0].pageY);
      //用户是否按住shift键
      if (event.shiftKey) {
      } else {
        dispatch(rightClickOnFile(node));
      }
      dispatch(setContextMenuVisible(true));
      dispatch(setContextMenuPosition(x, y));
    },

    /**
     *  @param {Object} event
     *  @returns {undefined}
     */
    handleClick: (event, node) => {
      event.stopPropagation();
      console.log(' click node===', node);
      console.log('ownProps==', ownProps);
      if (event.ctrlKey) {
        console.log('test ctrlKey==', event.ctrlKey);
      } else if (event.shiftKey) {
        console.log('test shiftKey==', event.shiftKey);
      } else {
        dispatch(setSelectedFiles([node]));
        dispatch(setFileContent(node.name));
        dispatch(setFileContentVisi(node.name))
       
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
