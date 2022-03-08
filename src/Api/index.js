/**
 * Calculate available actions for a file
 * @param {Object} file
 * @returns {Array<String>}
 */
export const getActionsByFile = (file, acts = []) => {
  if (file.type === 'folder') {
    acts.push('add file');
    acts.push('add folder');
    acts.push('paste');
    if (file.parentId !== '-1') {
      acts.push('cut');
      acts.push('copy');
      acts.push('delete');
    }
  }
  if (file.type === 'file') {
    acts.push('delete');
    acts.push('cut');
    acts.push('copy');
  }

  acts.push('rename');
  return acts;
};

/**
 * Calculate available actions for selected files
 */

export const getActionsByMultipleFiles = (files, acts = []) => {
  files.forEach((file) => {
    const fileActs = getActionsByFile(file);
    acts = acts.length
      ? acts.filter((value) => fileActs.indexOf(value) !== -1)
      : fileActs;
  });
  return acts;
};

export const getInitialFileContent = (createFolderName) => {
  let value;
  if (createFolderName.endsWith('.js')) {
    value = `
    import React, { Component } from "react";

    export default class FileTest extends Component {
      render() {
        return <h1 style={{ background: "red", color: "#fff" }}>This is a test</h1>;
      }
    }
    `;
  } else if (createFolderName.endsWith('.ts')) {
    value = `
    function greeter(person) {
      return 'Hello, ' + person;
    }

    let user = 'Jane User';

    document.body.innerHTML = greeter(user);
    `;
  } else if (createFolderName.endsWith('.json')) {
    value = `
     {
       "name": "hh",
       "age": 20
     }`;
  } else if (createFolderName.endsWith('.txt')) {
    value = 'test';
  } else {
    value = '';
  }
  return value
};

//递归
export const treeToList = (tree, result = [], level = 0) => {
  tree.forEach((node) => {
    result.push(node);
    node.level = level + 1;
    node.children && treeToList(node.children, result, level + 1);
  });
  return result;
};

export const handleCopyFiles = (copyFiles, curFile) => {
  copyFiles.map((item) => {
    item.id = Date.now().toString();
    item.parentId = curFile.id;
    item.name = `${item.name} copy`;
    if (item.children) {
      handleCopyFiles(item.children, item);
    }
  });
  return copyFiles;
};

export const listToTree = (list = []) => {
  let tree = [];
  let map = {};
  list.forEach((item) => {
    const newItem = { ...item, children: [] };
    map[item.id] = newItem; //对象的引用
    //判断是否是根节点
    if (item.parentId === '-1') {
      tree.push(newItem);
    } else {
      map[newItem.parentId].children.push(newItem);
    }
  });
  return tree;
};

// let result = treeFind(tree, node=> node.key === '0-0')

export const findNode = function (tree, id, files) {
  const list = [...tree];
  let p = list.shift();
  while (p) {
    if (p.id === id) {
      p = [...files];
    }
    if (p.children) {
      list.push(...p.children);
    }
    p = list.shift();
  }
  return tree;
};

export const filterDelTree = (tree, copyOrCutFiles) => {
  tree.map((item, index) => {
    const selectFile = copyOrCutFiles.find((el) => el.id === item.id);
    const id = selectFile && selectFile.id;
    if (item.id === id) {
      tree.splice(index, 1);
      return tree;
    }
    if (item.children) {
      filterDelTree(item.children, copyOrCutFiles);
    }
  });
  return tree;
};
