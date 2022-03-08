import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import FileManage from '../../pages/views/FileManage';
import ContextMenu from '../ContextMenu';
import Dialogs from '../Dialogs';
import CodeMirrors from '../CodeMirrors';
import { setContextMenuVisible } from '../../action';

const Content = (props) => {
  const fileContentVisi = useSelector((state) => state.fileContentVisi);

  return (
    <div className='content' onClick={props.handleHideContextMenu}>
      <div className='content-left'>
        <FileManage />
        <ContextMenu />
        <Dialogs />
      </div>

      {fileContentVisi && (
        <div className='content-right'>
          <CodeMirrors />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleHideContextMenu: (event) => {
      if (
        !(
          event.target.tagName === 'INPUT' ||
          /label/i.test(event.target.className)
        )
      ) {
        event.preventDefault();
      }
      dispatch(setContextMenuVisible(false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
