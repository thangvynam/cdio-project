import React from "react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import * as common from "./commonEducation";
import { list } from "postcss";

// Add root
export const addRoot = (data, name) => {
  let nodes = [...data];
  const length = nodes.length;
  const key = `${7}.${length + 1}`;
  const node = {
    key: key,
    data: {
      name: name,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodes.push(node);
  return nodes;
};

// Add Sub
export const addChildTitle = (data, nodeParent, name) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length + 1}`;

  const node = {
    key: key,
    data: {
      name: `${name}`,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodeParent.children.push(node);
  data = common.updateNode(data, nodeParent);
  return data;
};

export const addChildTitleForFreePartStudy = (data, nodeParent, name, nameKnowledge) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length + 1}`;
  name = `${name} (${nameKnowledge})`;
  const node = {
    key: key,
    data: {
      name: `${name}`,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  const nodeUpdate =  {...nodeParent}
  nodeUpdate.children.push(node);
  data = common.updateNode(data, nodeUpdate);
  return [data, node];
};

export const addChildFreePartStudy = (data, nodeParent, name, description, credit) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length + 1}`;

  const node = {
    key: key,
    data: {
      name: `${name}`,
      description: description,
      credit: credit,
      displayName: `${key}. ${name} ( ${description} Học ít nhất ${credit} chỉ)`
    },
    children: []
  };
  nodeParent.children.push(node);
  data = common.updateNode(data, nodeParent);
  return data;
};

// Delete Node
export const deleteNode = (nodes, node) => {
  let root = [...nodes];
  // index of root
  const idRoot = common.indexRoot(node.key);
  const index = common.indexNode(node.key);

  // ROOT
  if (common.getRank(node.key) === 2) {
    root.splice(index, 1);
    root = common.refreshTreeNodes(root, node.key, idRoot - 1);
    return root;
  }
  let parentKey = common.parentKey(node.key);
  let rootKey = common.keyRoot(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "7") {
    const firstDot = parentKey.indexOf(".");
    parentKey = parentKey.slice(firstDot + 1, parentKey.length);
  }
  const parentNode = common.findNodeByKey(root, parentKey);
  parentNode.children.splice(index, 1);
  root = common.updateNode(root, parentNode);
  root = common.refreshTreeNodes(root, rootKey, idRoot - 1);
  return root;
};

export const filterSubjects = (e, subjects) => {
  try {
    const re = new RegExp(e.query.toLowerCase());
    const results = subjects
      ? subjects.filter(item => {
        return re.test(item.SubjectCode.toLowerCase()+item.SubjectName.toLowerCase());
      })
      : [];
    return results;
  } catch (err) {
    return [];
  }
};

export const headerGroup = (
  <ColumnGroup>
    <Row>
      {/* <Column header="Loại Học Phần" rowSpan={2} /> */}
      <Column header="STT" rowSpan={2} style={{ width: "0.5em" }} />
      <Column header="Mã Học Phần" rowSpan={2} style={{ width: "3em" }} />
      <Column header="Tên Học Phần" rowSpan={2} style={{ width: "8em" }} />
      <Column header="Số TC" rowSpan={2} style={{ width: "0.5em" }} />
      <Column header="Số Tiết" colSpan={3} style={{ width: "5.5em" }} />
      <Column header="Ghi Chú" rowSpan={2} style={{ width: "3em" }} />
      <Column rowSpan={2} style={{ width: "2em" }} />
    </Row>
    <Row>
      <Column header="Lý Thuyết" />
      <Column header="Thực Hành" />
      <Column header="Bài Tập" />
    </Row>
  </ColumnGroup>
);

export const footerGroup = (
  <ColumnGroup>
    <Row>
      <Column footer="Totals:" colSpan={4} />
      <Column footer="48" />
    </Row>
  </ColumnGroup>
);

export const sortSubject = data => {
  return data.sort((a, b) => {
    const block1 = a.nameBlock;
    const block2 = b.nameBlock;
    if (block1 === block2) {
      const code1 = a.SubjectCode;
      const code2 = b.SubjectCode;
      return code1.localeCompare(code2);
    }
    return block1.localeCompare(block2);
  });
};

export const indexSubjects = data => {
  const results = data.reduce((acc, cur, index) => {
    cur.index = index + 1;
    return acc.concat(cur);
  }, []);
  return results;
};

export const toltalRequiredCredits = subjects => {
  return subjects.reduce((acc, cur) => {
    const isRequired = cur.nameBlock.startsWith("BB");
    if (isRequired && cur.Credit) {
      return acc + Number(cur.Credit);
    }
    return acc;
  }, 0);
};

const checkExistsSubject = (subjects, subject) => {
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].SubjectName === subject.SubjectName) {
      return true;
    }
  }
  return false;
};

export const addSubjectInOnchange = (subjects, subject) => {
  if (checkExistsSubject(subjects, subject)) {
    return subjects;
  }
  return [...subjects, subject];
};

export const convertTreenodeToArr = (nodes, arr = []) => {
  const length = nodes.length;
  for (let i = 0; i < length; i++) {
    const node = { ...nodes[i] };
    node.data.displayName = "";
    if (node.children && node.children.length) {
      node.children = [];
    }
    arr.push(node);
    if (nodes[i].children.length) {
      convertTreenodeToArr(nodes[i].children, arr);
    }
  }
  return arr;
};

export const deteleSubject = (subjects, subject) => {
  const indexSubject = subjects.indexOf(subject);
  return subjects.filter((subject, index) => {
    if (indexSubject !== index) {
      return subject;
    }
  });
};

// drag

const addIndexRoot = (nodes, node, index) => {
  const root = [...nodes];
  root.splice(index, 0, node);
  return root;
};

const previousKey = key => {
  const arr = key.split(".");
  const last = arr[arr.length - 1];
  const lastIndex = key.lastIndexOf(".");
  const pre = key.slice(0, lastIndex) + "." + (last - 1).toString();
  return pre;
};

const upSameLevelRoot = (nodes, node) => {
  const index = common.indexNode(node.key);
  if (index === 0) {
    alert("Vị trí không thay đổi");
    return nodes;
  }
  const preKey = previousKey(node.key);
  let data = [...nodes];
  data = deleteNode(data, node);
  data = addIndexRoot(data, node, index - 1);
  data = common.refreshTreeNodes(data, preKey, index - 1);
  return data;
};

const downSameLevelRoot = (nodes, node) => {
  const index = common.indexNode(node.key);
  if (index === nodes.length - 1) {
    alert("Vị trí không thay đổi");
    return nodes;
  }
  let data = [...nodes];
  data = deleteNode(data, node);
  data = addIndexRoot(data, node, index + 1);
  data = common.refreshTreeNodes(data, node.key, index);
  return data;
};

const upSameLevelSub = (nodes, node) => {
  let root = [...nodes];
  const keyRoot = common.keyRoot(node.key);
  const indexRoot = common.indexNode(keyRoot);
  let keyParent = common.parentKey(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "7") {
    const firstDot = keyParent.indexOf(".");
    keyParent = keyParent.slice(firstDot + 1, keyParent.length);
  }
  let nodeParent = common.findNodeByKey(root, keyParent);
  let arr = nodeParent.children;
  const index = common.indexNode(node.key);
  if (index === 0) {
    alert("Vị trí không thay đổi");
    return root;
  }
  arr.splice(index, 1);
  arr.splice(index - 1, 0, node);
  nodeParent.children = arr;
  root = common.updateNode(root, nodeParent);
  root = common.refreshTreeNodes(root, keyRoot, indexRoot);
  return root;
};

const downSameLevelSub = (nodes, node) => {
  let root = [...nodes];
  const keyRoot = common.keyRoot(node.key);
  const indexRoot = common.indexNode(keyRoot);
  let keyParent = common.parentKey(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "7") {
    const firstDot = keyParent.indexOf(".");
    keyParent = keyParent.slice(firstDot + 1, keyParent.length);
  }
  let nodeParent = common.findNodeByKey(root, keyParent);
  let arr = nodeParent.children;
  const index = common.indexNode(node.key);
  if (index === nodeParent.children.length - 1) {
    alert("Vị trí không thay đổi");
    return root;
  }
  arr.splice(index, 1);
  arr.splice(index + 1, 0, node);
  nodeParent.children = arr;
  root = common.updateNode(root, nodeParent);
  root = common.refreshTreeNodes(root, keyRoot, indexRoot);
  return root;
};

export const upSameLevel = (nodes, node) => {
  if (common.getRank(node.key) === 2) {
    return upSameLevelRoot(nodes, node);
  }
  return upSameLevelSub(nodes, node);
};

export const downSameLevel = (nodes, node) => {
  if (common.getRank(node.key) === 2) {
    return downSameLevelRoot(nodes, node);
  }
  return downSameLevelSub(nodes, node);
};

export const deleteSubjectTable = (nodes, subject) => {
  let root = [...nodes];
  let keyParent = subject.parentKey;
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "7") {
    const firstDot = keyParent.indexOf(".");
    keyParent = keyParent.slice(firstDot + 1, keyParent.length);
  }
  const parentNode = common.findNodeByKey(root, keyParent);
  parentNode.data.subjects = deteleSubject(parentNode.data.subjects, subject);
  parentNode.data.totalCredits = totalCreditsOfTable(parentNode.data.subjects);
  root = common.updateNode(root, parentNode);
  return root;
};

export const blocksOfTable = node => {
  const groups = groupBy(node.data.subjects, item => {
    return item.nameBlock;
  });
  const results = groups.reduce((arr, cur) => {
    const block = cur[0].nameBlock;
    if (block.includes("(")) {
      return arr.concat(
        block.slice(block.indexOf("(") + 2, block.indexOf(")") - 1)
      );
    }
    return arr;
  }, []);
  return results;
};

const groupBy = (array, f) => {
  let groups = {};
  array.forEach(subject => {
    let group = JSON.stringify(f(subject));
    groups[group] = groups[group] || [];
    groups[group].push(subject);
  });
  return Object.keys(groups).map(group => {
    return groups[group];
  });
};

export const updateBlocks = (subjects, ...agru) => {
  return subjects.reduce((arr, subject) => {
    if (subject.nameBlock.startsWith("BB") && agru[0].length) {
      subject.nameBlock += `( ${agru[0]} )`;
      subject.isAccumulation = agru[2];
    } else if (subject.nameBlock.startsWith("TC") && agru[1].length) {
      subject.nameBlock += `( ${agru[1]} ) : Học ${agru[4]} chỉ`;
      subject.nameBlock += !agru[3] ? ` -- Không tích lũy` : ``;
      subject.isAccumulation = agru[3];
      subject.optionCredit = agru[4];
    } else if (subject.nameBlock.startsWith("TC")) {
      subject.nameBlock += ` : Học ${agru[4]} chỉ`;
      subject.isAccumulation = agru[3];
      subject.optionCredit = agru[4];
    } else {
      subject.isAccumulation = agru[2];
    }
    if (subject.nameBlock.startsWith("BB") && !agru[2]) {
      subject.nameBlock += ` -- Không tích lũy`;
    }
    if (subject.nameBlock.startsWith("TC") && !agru[3]) {
      subject.nameBlock += ` -- Không tích lũy`;
    }
    return arr.concat(subject);
  }, []);
};

export const checkExistsBlock = (nameBlock, listBlocks) => {
  return listBlocks.find(block => {
    return block === nameBlock;
  });
};

export const updateAccumulationAndCredit = (subjects, ...agru) => {
  return subjects.map(subject => {
    const description = subject.nameBlock.slice(
      subject.nameBlock.indexOf("(") + 2,
      subject.nameBlock.indexOf(")") - 1
    );
    if (subject.nameBlock.startsWith("TC") && description === agru[0]) {
      return {
        ...subject,
        isAccumulation: agru[1],
        optionCredit: agru[2]
      };
    }
    return { ...subject };
  });
};

export const totalCreditsOfTable = subjects => {
  const groups = groupBy(subjects, item => {
    return item.nameBlock;
  });

  const x = groups.reduce((total, blocks) => {
    if (blocks[0].nameBlock.startsWith("BB") && blocks[0].isAccumulation) {
      return (total += blocks.reduce((totalCredit, subject) => {
        return (totalCredit += +subject.Credit);
      }, 0));
    }
    return blocks[0].isAccumulation
      ? (total += +blocks[0].optionCredit)
      : (total += 0);
  }, 0);
  return x;
};

export const addFreePartStudies = (nodes, listKnowledges, nodeFreePartStudy) => {
  let data = [...nodes];
  const length = listKnowledges.length;
  for (let i = 0; i < length; i++) {
    const nameRow = listKnowledges[i].NameRow;
    const children = listKnowledges[i].children;
    const nameKnowledge = listKnowledges[i].EduName;
    // add title
    const title = addChildTitleForFreePartStudy(data, nodeFreePartStudy, nameRow, nameKnowledge);
    data = title[0];
    const nodeCur = title[1];
    const x = children.length;
    // add table
    if (x) {
      const nodeParent = nodeCur;
      const table = addChildTableForFreePartStudy(data, nodeParent);
      data = table[0];
      const nodeTable = table[1];
      const blocks = children[0].block;
      const length2 = blocks.length;
      // add subjects
      for(let j=0 ;j< length2; j++){
        const block = blocks[j];
        const length3 = block.subjects.length;
        for(let k=0 ;k < length3; k++){
          const subject = {...block.subjects[k]};
          subject.nameBlock = block.NameBlock;
          subject.isAccumulation = block.isAccumulated;
          if (block.NameBlock.startsWith("TC")) {
            subject.optionCredit = block.Credit;
          }
          subject.parentKey = nodeTable.key;
          nodeTable.data.subjects.push(subject);
        }
      }
      nodeTable.data.totalCredits = totalCreditsOfTable(nodeTable.data.subjects);
      data = common.updateNode(data, nodeTable)
    }
  }
  return data;
}

export const convertDbToTreeNodes = (data, subjects) => {
  if (!data.eduContents) {
    return [];
  }
  const contentPro = sortKeyRow([...data.eduContents]);
  const blocks = [...data.subjectBlocks];
  const detailBlocks = [...data.detailBlocks];
  // convert -> nodes
  const nodes = contentPro.reduce((nodes, row) => {
    const rank = common.getRank(row.KeyRow);
    if (rank === 2) {
      return (nodes = addRoot(nodes, row.NameRow));
    }
    const parentNode = findParentNode(nodes, row.KeyRow);
    // is add free study
    if(row.Credit){
      return (nodes = addChildFreePartStudy(nodes, 
        parentNode, 
        "Kiến thức tự chọn tự do",
        row.Description,
        row.Credit
      ));
    }
    else if (!row.Type) {
      return (nodes = addChildTitle(nodes, parentNode, row.NameRow));
    }
    return (nodes = addChildTable(nodes, parentNode));
  }, []);

  // add subjects and block
  return blocks.reduce((nodes, block) => {
    const idSubjectsOfDetailBlock = idDetailSubjectsOfBlock(
      block,
      detailBlocks
    );
    const subjectsOfBlock = subjectsOfDetailBlock(
      idSubjectsOfDetailBlock,
      subjects
    );
    const node = findNode(nodes, block.KeyRow);
    subjectsOfBlock.map(subject => {
      subject.nameBlock = block.NameBlock;
      subject.isAccumulation = block.isAccumulated;
      if (block.NameBlock.startsWith("TC")) {
        subject.optionCredit = block.Credit;
      }
      subject.parentKey = block.KeyRow;
      node.data.subjects.push(subject);
      node.data.totalCredits = totalCreditsOfTable(node.data.subjects);
    });
    return (nodes = common.updateNode(nodes, node));
  }, nodes);
};

const findParentNode = (nodes, key) => {
  let parentKey = common.parentKey(key);
  // case root = 7.1.... => 1.1...
  if (key[0] === "7") {
    const firstDot = parentKey.indexOf(".");
    parentKey = parentKey.slice(firstDot + 1, parentKey.length);
  }
  return common.findNodeByKey(nodes, parentKey);
};

const sortKeyRow = arr => {
  return arr.sort((a, b) => {
    const key1 = a.KeyRow;
    const key2 = b.KeyRow;
    if (key1 === key2) {
      return key1.localeCompare(key2);
    }
    return key1.length - key2.length;
  });
};

const findNode = (nodes, key) => {
  // case root = 7.1.... => 1.1...
  if (key[0] === "7") {
    const firstDot = key.indexOf(".");
    key = key.slice(firstDot + 1, key.length);
  }
  return common.findNodeByKey(nodes, key);
};

const addChildTable = (nodes, nodeParent) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length + 1}`;
  let node = {
    key: key,
    data: {
      isTable: true,
      optionalCredit: 0,
      totalCredits: 0,
      subjects: [],
      displayName: ""
    },
    children: []
  };
  nodeParent.children.push(node);
  nodes = common.updateNode(nodes, nodeParent);
  return nodes;
};

const addChildTableForFreePartStudy = (nodes, nodeParent) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length + 1}`;
  let node = {
    key: key,
    data: {
      isTable: true,
      optionalCredit: 0,
      totalCredits: 0,
      subjects: [],
      displayName: ""
    },
    children: []
  };
  nodeParent.children.push(node);
  nodes = common.updateNode(nodes, nodeParent);
  return [nodes, node];
};

const idDetailSubjectsOfBlock = (block, detailSubjects) => {
  return detailSubjects.reduce((results, row) => {
    return row.IdSubjectBlock === block.Id
      ? results.concat(row.IdSubject)
      : results;
  }, []);
};

const subjectsOfDetailBlock = (idDetailBlock, subjects) => {
  return subjects.reduce((results, subject) => {
    return idDetailBlock.includes(subject.Id)
      ? results.concat(subject)
      : results;
  }, []);
};

export const findCreditByNameBlock = (node, nameBlock) => {
  const subjects = node.data.subjects;
  const groups = groupBy(subjects, item => {
    return item.nameBlock;
  });

  for (let i = 0; i < groups.length; i++) {
    const blocks = groups[i];
    const name = blocks[0].nameBlock;
    if (name.startsWith("TC") && name.includes(nameBlock)) {
      return blocks[0].optionCredit;
    }
  }
  return 0;
};

export const listSubjects = (nodes, arr = []) =>{
  const length = nodes.length;
  let node = {};
  for (let i = 0; i < length; i++) {
    node = nodes[i];
    if(node.data.credit){
      return arr;
    }
    if(node.data.isTable){
      node.data.subjects.map(subject =>{
        arr.push(subject);
      })
    }
    if (node.children.length) {
      listSubjects(node.children, arr);
    }
  }
  return arr;
}