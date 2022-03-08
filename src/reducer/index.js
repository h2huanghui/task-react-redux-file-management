import * as ActionTypes from '../action/actionTypes';

const initValues = {
  path: [],
  pathSublist: [],
  contextMenuVisible: false,
  contextMenuPosition: [],
  treeData: [
    {
      id: '0-0',
      name: 'root-folder',
      type: 'folder',
      isRoot: true, //根
      isOpen: false, //是否默认展开
      canRename: true, //是否可重命名
      canCopy: false, //是否可拷贝
      canCut: false, //是否可剪切
      canDelete: false, //是否可删除
      parentId: '-1',
    },
  ],
  filterData: [
    {
      name: 'root-folder',
      id: '0-0',
      type: 'folder',
      parentId: '-1',
      children: [],
    },
  ],
  selectedFiles: [],
  copyOrCutFiles: [],
  isCopy: false,
  selectedFolderSublist: null,
  visibleDialogCreateFolder: false,
  visibleDialogCreateFile: false,
  visibleDialogRename: false,
  fileContent: '',
  fileContentVisi: false,
};
const reducer = (state = initValues, action) => {
  console.log('reducer:', state, action);
  switch (action.type) {
    case ActionTypes.SET_TREE_DATA:
      return { ...state, treeData: action.value };
    case ActionTypes.SET_FILTER_DATA:
      return { ...state, filterData: action.value };
    case ActionTypes.SET_CONTEXT_MENU_VISIBLE:
      return { ...state, contextMenuVisible: action.value };
    case ActionTypes.SET_CONTEXT_MENU_POSITION:
      return { ...state, contextMenuPosition: action.value };
    case ActionTypes.SET_SELECTED_FILES:
      return { ...state, selectedFiles: action.value };
    case ActionTypes.SET_COPY_FILES:
      return { ...state, copyOrCutFiles: action.value };
    case ActionTypes.SET_IS_COPY:
      return { ...state, isCopy: action.value };
    case ActionTypes.SET_SELECTED_FOLDER_SUB_LIST:
      return { ...state, selectedFolderSublist: action.value };
    case ActionTypes.SET_VISIBLE_DIALOG_CREATE_FOLDER:
      return { ...state, visibleDialogCreateFolder: !!action.value };
    case ActionTypes.SET_VISIBLE_DIALOG_RENAME:
      return { ...state, visibleDialogRename: !!action.value };
    case ActionTypes.SET_FILE_CONTENT:
      return {
        ...state,
        fileContent: action.value,
      };
    case ActionTypes.SET_FILE_CONTENT_VISI:
      return {
        ...state,
        fileContentVisi: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
