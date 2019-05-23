export const updateNode = (data, node) => {
  const key = node.key;
  const index = indexRoot(key);
  const length = data.length;
  for (let i = index - 1; i < length; i++) {
    if (data[i].key === key) {
      data[i] = node;
      return data;
    }
    if (data[i].children) {
      updateNode(data[i].children, node);
    }
  }
  return data;
};

export const indexRoot = key => {
  return key.split(".")[1];
};

export const getRank = key => {
  let countDot = 0;
  for (let i = 0; i < key.length; i++) {
    if (key[i] === ".") {
      countDot++;
    }
  }
  return countDot + 1;
};

export const updateKeyParentOfSubjects = (subjects, idParent) => {
  return subjects.map(subject => {
    return { ...subject, parentKey: idParent };
  });
};

export const updateSubNode = (iParent, node) => {
  if (node.children) {
    const length = node.children.length;
    for (let i = 0; i < length; i++) {
      node.children[i].key = `${iParent}.${i + 1}`;
      if (!node.children[i].data.isTable) {
        node.children[i].data.displayName = `${node.children[i].key}. ${
          node.children[i].data.name
        }`;
      }
      if (node.children[i].data.isTable) {
        node.children[i].data.subjects = updateKeyParentOfSubjects(
          node.children[i].data.subjects,
          node.children[i].key
        );
      }
      if (node.children[i].children)
        updateSubNode(node.children[i].key, node.children[i]);
    }
  }
};

export const increaseKey = (key, index) => {
  const lastDot = key.lastIndexOf(".");
  let result = key.slice(0, lastDot) + "." + index.toString();
  return result;
};

export const refreshTreeNodes = (nodes, key, indexRefresh) => {
  const data = [...nodes];
  const length = data.length;

  for (let i = indexRefresh; i < length; i++) {
    const keyIncrease = increaseKey(key, i + 1);
    data[i].key = keyIncrease;
    data[i].data.displayName = `${keyIncrease}. ${data[i].data.name}`;
    updateSubNode(data[i].key, data[i]);
  }

  return data;
};

export const indexNode = key => {
  if (getRank(key) === 1) {
    return Number(key) - 1;
  }
  const arr = key.split(".");
  return Number(arr[arr.length - 1]) - 1;
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

export const parentKey = key => {
  const lastIndexDot = key.lastIndexOf(".");
  return key.slice(0, lastIndexDot);
};

export const keyRoot = key => {
  const arr = key.split(".");
  let result = "";
  result = arr[0] + "." + arr[1];
  return result;
};

export const hoverUpLevel = node => {
  const child = { ...node };
  const lastDot = child.key.lastIndexOf(".");
  const length = child.key.length;
  const key = child.key;

  const index = Number(key.slice(lastDot + 1, length));
  return index === 1
    ? child.key
    : key.slice(0, lastDot + 1) + (index - 1).toString();
};

// error
export const hoverDownLevel = (nodes, node) => {
  const root = [...nodes];
  const child = { ...node };
  const lastDot = child.key.indexOf(".");
  const length = child.key.length;
  const key = child.key;

  let keyParent = parentKey(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "7") {
    const firstDot = keyParent.indexOf(".");
    keyParent = keyParent.slice(firstDot + 1, keyParent.length);
  }
  const parentNode = findNodeByKey(root, keyParent);
  const count = parentNode.children.length;

  const index = Number(key.slice(lastDot + 1, length));
  return index === count
    ? child.key
    : key.slice(0, lastDot + 1) + (index - 1).toString();
};

export const createSaveDataForTarget = (nodes, outData, level) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpObj = {};
    for (let i in nodes) {
      let length = level - nodes[i].key.length / 2 - 1;
      let KeyRow = nodes[i].key;
      for (var j = 0; j < length; j++) {
        KeyRow = KeyRow + ".";
      }
      let KeyName = nodes[i].data.name;
      let OSUsed = nodes[i].OSUsed ? nodes[i].OSUsed : false;
      tmpObj = { KeyRow, KeyName, OSUsed };

      outData.push(tmpObj);
      tmpObj = {};

      let children = nodes[i].children;
      createSaveDataForTarget(children, outData, level);
    }
  }
};

export const createSaveDataForContent = (nodes, outData, level) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpObj = {};
    for (let i in nodes) {
      let length = level - nodes[i].key.length / 2 - 1;
      let KeyRow = nodes[i].key;
      for (var j = 0; j < length; j++) {
        KeyRow = KeyRow + ".";
      }
      let data = nodes[i].data;

      if (data.isTable) {
        tmpObj = { KeyRow, Type: true, subjects: [...data.subjects] };
      } else {
        tmpObj = { KeyRow, NameRow: data.name, Type: false };
      }

      outData.push(tmpObj);
      tmpObj = {};

      if (!data.isTable) {
        let children = nodes[i].children;
        createSaveDataForContent(children, outData, level);
      }
    }
  }
};

const groupBy = (xs, key) => {
  return xs.reduce((previous, current) => {
    previous[current[key]] && previous[current[key]].length !== 0
      ? previous[current[key]].push(current)
      : (previous[current[key]] = new Array(current));
    return previous;
  }, {});
};

const createArrayFor8 = (nodes, outData) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    for (let i in nodes) {
      let data = nodes[i].data;
      if (data.isTable) {
        const subjects = data.subjects.map(subject => {
          subject.nameBlock[0].indexOf("BB") === 0
            ? (subject.option = "BB")
            : (subject.option = "TC");
          return subject;
        });
        outData.value = outData.value
          ? [...outData.value, ...subjects]
          : [...subjects];
      }
      if (!data.isTable) {
        let children = nodes[i].children;
        createArrayFor8(children, outData);
      }
    }
  }
};

export const createDataFor8 = nodes => {
  const data = {};
  data.value = [];
  createArrayFor8(nodes, data);
  const groupSubjects = groupBy(data.value, "nameBlock");
  return { groupSubjects, subjects: data.value };
};

export const calculateSumCredit = nodes => {
  const data = {};
  data.value = [];
  createArrayFor8(nodes, data);
  const groupSubjects = groupBy(data.value, "nameBlock");
  let sum = 0;
  let TCSum = 0;
  let BBSum = 0;
  for (let key in groupSubjects) {
    if (groupSubjects.hasOwnProperty(key)) {
      if (groupSubjects[key][0].optionCredit && key.indexOf("TC") === 0) {
        sum += groupSubjects[key][0].optionCredit;
        TCSum += groupSubjects[key][0].optionCredit;
      } else {
        for (let j in groupSubjects[key]) {
          sum += groupSubjects[key][j].Credit;
          BBSum += groupSubjects[key][j].Credit;
        }
      }
    }
  }
  const outdata = { sum, TCSum, BBSum };
  return outdata;
};

export const createDataFor6 = (nodes, sumCredit) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    for (let i in nodes) {
      let tmp = [];
      tmp.push(nodes[i]);
      let credits = calculateSumCredit(tmp);
      let newChildren = nodes[i].key.length === 5 ? [] : [...nodes[i].children];
      let key = nodes[i].key;
      let data = {
        name: nodes[i].data.name,
        sum: credits.sum,
        TCSum: credits.TCSum,
        BBSum: credits.BBSum,
        sumCredit
      };
      nodes[i] = {
        children: newChildren,
        key,
        data
      };
      tmp = [];
      credits = {};
      newChildren = [];
      key = "";
      data = {};

      let children = nodes[i].children;
      createDataFor6(children, sumCredit);
    }
  }
};
