import * as ActionTypes from './actionTypes.js';
import {
  listToTree,
  filterDelTree,
  treeToList,
  handleCopyFiles,
  getInitialFileContent,
} from '../Api';
import _ from 'lodash';

export const setTreeData = (treeData) => {
  return {
    type: ActionTypes.SET_TREE_DATA,
    value: treeData,
  };
};

export const setFilterData = (filterData) => {
  return {
    type: ActionTypes.SET_FILTER_DATA,
    value: filterData,
  };
};

export const setVisibleDialogCreateFolder = (visible) => {
  return {
    type: ActionTypes.SET_VISIBLE_DIALOG_CREATE_FOLDER,
    value: !!visible,
  };
};

export const setVisibleDialogRename = (visible) => {
  return {
    type: ActionTypes.SET_VISIBLE_DIALOG_RENAME,
    value: !!visible,
  };
};

export const setContextMenuVisible = (visible) => {
  return {
    type: ActionTypes.SET_CONTEXT_MENU_VISIBLE,
    value: !!visible,
  };
};

export const setContextMenuPosition = (x, y) => {
  return {
    type: ActionTypes.SET_CONTEXT_MENU_POSITION,
    value: [x, y],
  };
};

export const setSelectedFolderSublist = (file) => {
  return {
    type: ActionTypes.SET_SELECTED_FOLDER_SUB_LIST,
    value: file,
  };
};

export const setSelectedFiles = (files) => {
  return {
    type: ActionTypes.SET_SELECTED_FILES,
    value: files,
  };
};

export const setCopyOrCutFiles = (files) => {
  return {
    type: ActionTypes.SET_COPY_FILES,
    value: files,
  };
};

export const setIsCopy = (value) => {
  return {
    type: ActionTypes.SET_IS_COPY,
    value: value,
  };
};

export const setFileContent = (createFolderName) => {
  return {
    type: ActionTypes.SET_FILE_CONTENT,
    value: getInitialFileContent(createFolderName),
  };
};

export const setFileContentVisi = (createFolderName) => {
  const value =
    createFolderName.endsWith('.js') ||
    createFolderName.endsWith('.ts') ||
    createFolderName.endsWith('.txt') ||
    createFolderName.endsWith('.json');
  return {
    type: ActionTypes.SET_FILE_CONTENT_VISI,
    value: value,
  };
};

export const createNewFolder = (createFolderName) => (dispatch, getState) => {
  const type =
    createFolderName.endsWith('.js') ||
    createFolderName.endsWith('.ts') ||
    createFolderName.endsWith('.txt') ||
    createFolderName.endsWith('.json')
      ? 'file'
      : 'folder';

  let { filterData, selectedFiles } = getState();
  // console.log('selectedFiles===', selectedFiles);
  const files = filterData.find((item) =>
    selectedFiles.find((selectedFile) => item.id === selectedFile.id)
  );
  // console.log('files===', files);
  //新建的文件夹对象
  const newChild = {
    name: createFolderName,
    id: Date.now().toString(),
    type: type,
    parentId: files.id,
  };
  selectedFiles.map((item) => {
    if (item.children && item.children.length > 0) {
      const sameFolder = item.children.find(
        (el) => el.name === createFolderName
      );
      if (sameFolder) {
        //TODO报错
        return;
      } else {
        filterData.push(newChild);
      }
    } else {
      filterData.push(newChild);
    }
  });
  const newTreeData = listToTree(filterData);
  dispatch(setFilterData(filterData));
  dispatch(setTreeData(newTreeData));
  dispatch(setVisibleDialogCreateFolder(false));
  dispatch(setContextMenuVisible(false));
  dispatch(setFileContent(createFolderName));
  dispatch(setFileContentVisi(createFolderName));
};

export const rightClickOnFile = (file) => (dispatch, getState) => {
  const { selectedFiles } = getState();
  const isSelected =
    selectedFiles.indexOf(selectedFiles.find((f) => f.name === file.name)) !==
    -1;
  console.log('rightClickOnFile isSelected===', isSelected);
  !isSelected && dispatch(setSelectedFiles([file]));
};

export const addItems = (files) => (dispatch, getState) => {};

export const copyItems = (files) => (dispatch, getState) => {
  console.log('copy files===', files);
  dispatch(setIsCopy(true));
  dispatch(setCopyOrCutFiles(files));
  dispatch(setContextMenuVisible(false));
};

export const cutItems = (files) => (dispatch, getState) => {
  console.log('cut files===', files);
  dispatch(setIsCopy(false));
  dispatch(setCopyOrCutFiles(files));
  dispatch(setContextMenuVisible(false));
};

export const pasteItems = (files) => (dispatch, getState) => {
  console.log('paste files===', files);
  const { treeData, filterData, copyOrCutFiles, selectedFiles, isCopy } =
    getState();
  let newCopyOrCutFiles = _.cloneDeep(copyOrCutFiles);
  console.log('selectedFiles==', selectedFiles);

  const newFiles = filterData.find((item) =>
    files.find((selectedFile) => item.id === selectedFile.id)
  );
  // console.log('paste files===', newFiles);
  //只能在一个目录下粘贴
  newCopyOrCutFiles.map((item) => {
    item.id = Date.now().toString();
    item.parentId = newFiles.id;
    item.name = `${item.name} copy`;
    return item;
  });

  // newCopyOrCutFiles = handleCopyFiles(newCopyOrCutFiles, newFiles);

  console.log('copyOrCutFiles==', newCopyOrCutFiles);

  files.map((file) => {
    if (file.children && file.children.length > 0) {
      file.children = [...file.children, ...newCopyOrCutFiles];
    } else {
      file.children = [...newCopyOrCutFiles];
    }
    return file;
  });

  let newTreeData;
  if (isCopy) {
    newTreeData = _.cloneDeep(treeData);
  } else {
    newTreeData = _.cloneDeep(filterDelTree(treeData, copyOrCutFiles));
  }

  const newFilterData = treeToList(newTreeData);
  console.log('newTreeData==', newTreeData);
  dispatch(setTreeData(newTreeData));
  dispatch(setFilterData(newFilterData));
  dispatch(setContextMenuVisible(false));
};

/**
 *  @param {String} fileName
 */
export const renameItem = (fileName, newFileName) => (dispatch, getState) => {
  const { filterData } = getState();
  const curFile = filterData.find((item) => item.name === fileName);
  curFile.name = newFileName; //赋最新的值
  const newTreeData = listToTree(filterData);
  dispatch(setVisibleDialogRename(false));
  dispatch(setContextMenuVisible(false));
  dispatch(setTreeData(newTreeData));
};

export const deleteItems = (files) => (dispatch, getState) => {
  console.log('files===', files);
  const { filterData } = getState();
  const newFilterData = filterData.filter((item) =>
    files.find((file) => item.id !== file.id && item.parentId !== file.id)
  );

  console.log('newFilterData===', newFilterData);
  const newTreeData = listToTree(newFilterData);
  dispatch(setFilterData(newFilterData));
  dispatch(setTreeData(newTreeData));
  dispatch(setContextMenuVisible(false));
};
