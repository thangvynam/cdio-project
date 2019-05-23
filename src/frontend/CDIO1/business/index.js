export const updateNode = (nodes, node) => {
  const root = [...nodes];

  const key = node.key;
  const index = indexRoot(key);
  const length = root.length;
  for (let i = index - 1; i < length; i++) {
    if (root[i].key === key) {
      root[i] = node;
      return root;
    }
    if (root[i].children) {
      updateNode(root[i].children, node);
    }
  }
  return root;
};

export const getMaxLevel = nodes => {
  if (nodes === undefined || nodes.length === 0) {
    return 0;
  } else {
    let depths = [];
    for (let i in nodes) {
      depths[i] = getMaxLevel(nodes[i].children);
    }

    let max = Math.max.apply(Math, depths);

    return max + 1;
  }
};

export const createExportData = (nodes, data, level) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpArr = [];
    for (let i in nodes) {
      let str = "" + nodes[i].key;
      if (str.length === 1) tmpArr[0] = parseInt(str.charAt(0));

      if (nodes[i].children !== undefined && nodes[i].children.length !== 0) {
        for (var j = 0; j < level - 1; j++) {
          if (str.length > 2 * j) tmpArr[j] = parseInt(str.charAt(2 * j));
        }
      }

      tmpArr[level - 1] = nodes[i].data.name;

      data.push(tmpArr);
      tmpArr = [];

      let children = nodes[i].children;
      createExportData(children, data, level);
    }
  }
};

export const convertTreeNodeToArrKeys = (nodes, data, level) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpArr = [];
    for (let i in nodes) {
      let str = "" + nodes[i].key;
      if (str.length === 1) tmpArr[0] = parseInt(str.charAt(0));

      if (nodes[i].children !== undefined && nodes[i].children.length !== 0) {
        for (var j = 0; j < level - 1; j++) {
          if (str.length > 2 * j) tmpArr[j] = parseInt(str.charAt(2 * j));
        }
      }

      tmpArr[level - 1] = nodes[i].key;

      data.push(tmpArr);
      tmpArr = [];

      let children = nodes[i].children;
      createExportData(children, data, level);
    }
  }
};

export const createSaveData = (nodes, data, id, level) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpObj = {};
    for (let i in nodes) {
      let length = level - nodes[i].key.length / 2 - 1;
      let KeyRow = nodes[i].key;
      for (var j = 0; j < length; j++) {
        KeyRow = KeyRow + ".";
      }
      let NameRow = nodes[i].data.name;
      tmpObj = { KeyRow, NameRow };

      data.push(tmpObj);
      tmpObj = {};

      let children = nodes[i].children;
      createSaveData(children, data, id, level);
    }
  }
};

// add

export const addRoot = (nodes, nameOut) => {
  let data = [...nodes];
  const key = data.length + 1;
  const root = {
    key: `${key}`,
    data: {
      name: nameOut,
      displayName: `${key}. ${nameOut}`
    },
    children: []
  };
  data.push(root);
  return data;
};

// add subnode last index
export const addChild = (data1, node, nameOut) => {
  const root = [...data1];
  const child = { ...node };

  const key = `${child.key}.${child.children.length + 1}`;
  const subNodeChild = {
    key: key,
    data: {
      name: nameOut,
      displayName: `${key}. ${nameOut}`
    },
    children: []
  };
  child.children.push(subNodeChild);
  return updateNode(root, child);
};

//add any index
export const addIndexRoot = (data1, node, index) => {
  let nodeBefore = findNodeByKey(data1, index);
  let root = node;
  if (nodeBefore) {
    root.key = nodeBefore.key;
  }

  data1 = [
    ...data1.slice(0, index - 1),
    ...[root],
    ...data1.slice(index - 1, data1.length)
  ];
  data1 = [...refreshTreeNodes(data1, Number(index) - 1)];
  return data1;
};

// add subnode any index
export const addAny = (nodes, node, keySwap) => {
  debugger;
  let root = [...nodes];
  const x = keySwap.split(".");
  const subNode = { ...node };
  subNode.key = keySwap;
  root = addAnyChild(root, subNode, Number(x[x.length - 1]) - 1);
  root = [...refreshTreeNodes(root, Number(x[0]) - 1)];
  return root;
};

// delete

export const deleteNode = (nodes, node) => {
  let data = [...nodes];
  const idRoot = indexRoot(node.key);
  // ROOT
  if (getRank(node.key) === 1) {
    data.splice(Number(node.key) - 1, 1);
    data = refreshTreeNodes(data, idRoot - 1);
    return data;
  }
  const index = indexNode(node.key);
  const parentNode = findNodeByKey(data, parentKey(node.key));
  parentNode.children.splice(index, 1);
  data = updateNode(data, parentNode);
  data = refreshTreeNodes(data, idRoot - 1);
  return data;
};

// update sub node after delete
export const refreshTreeNodes = (nodes, indexRefresh) => {
  const data = [...nodes];
  const length = data.length;

  for (let i = indexRefresh; i < length; i++) {
    data[i].key = (i + 1).toString();
    data[i].data.displayName = `${i + 1}. ${data[i].data.name}`;
    updateSubNode(data[i].key, data[i]);
  }

  return data;
};

export const findNodeByKey = (nodes, key) => {
  let path = [...key];
  if (key.length > 1) {
    path = key.split(".");
  }
  let node;

  while (path.length) {
    let list = node ? node.children : nodes;
    node = list[Number(path[0]) - 1];
    if (!node) {
      return undefined;
    }
    path.shift();
  }
  return { ...node };
};

// import
export const convertArrToTreeNode = arr => {
  let data1 = [];
  let keyParentNode;
  let count = 0;
  arr.forEach(el => {
    const keyAndName = getKeyAndName(el);
    let key;
    if (keyAndName[0]) {
      keyParentNode = el;
      count = 0;
      key = keyAndName[0].toString();
    } else {
      count++;
      key = getKeyAndName(keyParentNode)[0] + "." + count.toString();
    }
    const name = keyAndName[1];
    const subNode = {
      key: key,
      data: {
        name: name,
        displayName: `${key}. ${name}`
      },
      children: []
    };
    if (subNode.data.name) {
      if (key && key.length <= 1) {
        data1 = addRootImport(data1, subNode);
      } else {
        data1 = addImport(data1, subNode);
      }
    }
  });
  return data1;
};

export const convertArrToKeys = arr => {
  let keys = [];
  let key;
  keys = arr.reduce((acc, cur) => {
    key = itemToKey(cur);
    if (key) {
      return acc.concat(key);
    }
    return acc;
  }, []);
  return keys;
};

export const convertDBToTreeNode = arrDB => {
  let data1 = [];
  arrDB.forEach(el => {
    const key = getFormatKey(el.KeyRow);
    const name = el.NameRow;
    const subNode = {
      key: key,
      data: {
        name: name,
        displayName: `${key}. ${name}`
      },
      children: []
    };
    if (getRank(key) <= 1) {
      data1 = addRootImport(data1, subNode);
    } else {
      data1 = addImport(data1, subNode);
    }
  });
  return data1;
};

export const formatDate = date => {
  const d = new Date(date);
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
};

// Drag
export const checkKeyDrap = keyDrag => {
  let regex1 = /\D/;
  let regex2 = /(\d-\d)+/i;
  if (!regex1.test(keyDrag) || regex2.test(keyDrag)) {
    return true;
  }
  return false;
};

export const checkIndexInsert = (currentKey, keyInsert) => {
  return keyInsert.startsWith(currentKey);
};

// drag

export const dragIntoAny = (data, node, index) => {
  if (index.length <= 1) {
    return (data = [...dragIntoRoot(data, node, index)]);
  } else {
    return (data = [...dragIntoSubNode(data, node, index)]);
  }
};

export const upSameLevel = (data, node) => {
  const lastKeyBro = Number(node.key[node.key.length - 1]);
  if (lastKeyBro > 1) {
    const keyBro =
      node.key.slice(0, node.key.length - 1) + (lastKeyBro - 1).toString();
    return (data = [...dragIntoAny(data, node, keyBro)]);
  } else {
    alert("Vị trí không thay đổi");
  }
  return data;
};

export const downSameLevel = (data, node) => {
  const lastKeyBro = Number(node.key[node.key.length - 1]);
  let keyParent = node.key;
  let nodeParent = node;
  if (node.key.length === 1) {
    nodeParent = data;
    if (lastKeyBro < nodeParent.length) {
      const keyBro =
        node.key.slice(0, node.key.length - 1) + (lastKeyBro + 1).toString();
      return (data = [...dragIntoAny(data, node, keyBro)]);
    } else {
      alert("Vị trí không thay đổi");
    }
  }
  if (node.key.length > 1) {
    keyParent = node.key.slice(0, node.key.length - 2);
    nodeParent = findNodeByKey(data, keyParent);
    if (lastKeyBro < nodeParent.children.length) {
      const keyBro =
        node.key.slice(0, node.key.length - 1) + (lastKeyBro + 1).toString();
      return (data = [...dragIntoAny(data, node, keyBro)]);
    } else {
      alert("Vị trí không thay đổi");
    }
  }
  return data;
};

export const createExportSubject = subjects => {
  let data = [];
  data[0] = [
    "Mã học phần",
    "Tên học phần",
    "Số tín chỉ",
    "Số tiết lý thuyết",
    "Số tiết thực hành",
    "Số tiết bài tập",
    "Mô tả"
  ];

  let tmp = subjects.map(row => {
    return [
      row.SubjectCode,
      row.SubjectName,
      row.Credit,
      row.TheoryPeriod,
      row.PracticePeriod,
      row.ExercisePeriod,
      row.Description
    ];
  });
  data.push(...tmp);
  return data;
};

export const convertToSubjects = data => {
  let subjects = data.map(row => {
    return {
      subjectcode: row[0],
      subjectname: row[1],
      credit: row[2],
      theoryperiod: row[3],
      practiceperiod: row[4],
      exerciseperiod: row[5],
      description: row[6] ? row[6] : "",
      subjectengname: "",
      datecreated: new Date().toISOString(),
      dateedited: new Date().toISOString()
    };
  });
  subjects.splice(0, 1);
  return subjects;
};

// private

const indexRoot = key => {
  if (getRank(key) === 1) {
    return Number(key);
  }
  return key.split(".")[0];
};

const getKeyAndName = element => {
  let key, name;
  key = element[0];
  if (element[1]) key += `.${element[1]}`;
  if (element[2]) key += `.${element[2]}`;
  if (element[3]) name = `${element[3]}`;
  return [key, name];
};

const addAnyChild = (nodes, node, index) => {
  const root = [...nodes];
  const keyParent = parentKey(node.key);
  const nodeParent = findNodeByKey(root, keyParent);
  nodeParent.children.splice(index, 0, node);
  return updateNode(root, nodeParent);
};

const indexNode = key => {
  if (getRank(key) === 1) {
    return Number(key) - 1;
  }
  const arr = key.split(".");
  return Number(arr[arr.length - 1]) - 1;
};

const parentKey = key => {
  const lastIndexDot = key.lastIndexOf(".");
  return key.slice(0, lastIndexDot);
};

const itemToKey = item => {
  const length = item.length;
  let result = item.reduce((acc, cur, index) => {
    if (cur && index !== length - 1) {
      return (acc += cur + ".");
    }
    return acc;
  }, "");
  if (result[result.length - 1] === ".") {
    return result.slice(0, result.length - 1);
  }
  return result;
};

const updateSubNode = (iParent, node) => {
  if (node.children) {
    const length = node.children.length;
    for (let i = 0; i < length; i++) {
      node.children[i].key = `${iParent}.${i + 1}`;
      node.children[i].data.displayName = `${node.children[i].key}. ${
        node.children[i].data.name
      }`;
      if (node.children[i].children)
        updateSubNode(node.children[i].key, node.children[i]);
    }
  }
};

const addImport = (nodes, node) => {
  const root = [...nodes];
  const keyParent = parentKey(node.key);
  const nodeParent = findNodeByKey(root, keyParent);
  nodeParent.children.push(node);
  return updateNode(root, nodeParent);
};

const addRootImport = (nodes, node) => {
  const root = [...nodes];
  root.push(node);
  return root;
};

const getRank = key => {
  let countDot = 0;
  for (let i = 0; i < key.length; i++) {
    if (key[i] === ".") {
      countDot++;
    }
  }
  return countDot + 1;
};

const lastNumberOfKey = str => {
  const length = str.length;
  for (let i = length - 1; i >= 0; i--) {
    if (Number.isInteger(Number(str[i]))) return i;
  }
};

const getFormatKey = key => {
  return key.slice(0, lastNumberOfKey(key) + 1);
};

const dragIntoRoot = (data, node, index) => {
  data = [...deleteNode(data, node)];
  data = [...addIndexRoot(data, node, index)];
  return data;
};

const dragIntoSubNode = (data, node, index) => {
  data = [...deleteNode(data, node)];
  data = [...addAny(data, node, index)];
  return data;
};

export const filterToArrays = (array1, array2) => {
  let result = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].Id === array2[j].IdEduProg) {
        result.push(array1[i]);
      }
    }
  }
  return result;
};
