import * as logicContent from "./logicEducationProgram";

export const onExportInfo = indata => {
  let data = [];
  const name = ["Tên chương trình", indata.nameEduProgram];
  const level = ["Trình độ đào tạo", indata.level.LevelName];
  const majorCode = ["Mã ngành", indata.major.MajorCode];
  const major = ["Ngành đào tạo", indata.major.MajorName];
  const program = ["Loại hình đào tạo", indata.program.ProgramName];
  const schoolYear = ["Khóa tuyển", indata.level.LevelName];
  const enrollmentTarget = ["Đối tượng tuyển sinh", indata.EnrollmentTarget];
  const eduProcess = ["Quy trình đào tạo", indata.EduProcess];
  const graduatedCon = ["Điều kiện tốt nghiệp", indata.GraduatedCon];
  data = [
    name,
    level,
    majorCode,
    major,
    program,
    schoolYear,
    enrollmentTarget,
    eduProcess,
    graduatedCon
  ];
  return data;
};

export const onExportPurpose = (nodes, data = []) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    for (let i in nodes) {
      const tmp = [nodes[i].key, nodes[i].data.name];
      data.push(tmp);
      let children = nodes[i].children;
      onExportPurpose(children, data);
    }
  }
  return data;
};

export const onExportEduArchi = (nodes, data = []) => {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    for (let i in nodes) {
      const tmp = [
        nodes[i].key,
        nodes[i].data.name,
        nodes[i].data.BBSum,
        nodes[i].data.TCSum,
        nodes[i].data.sum
      ];
      data.push(tmp);
      let children = nodes[i].children;
      onExportEduArchi(children, data);
    }
  }
  return data;
};

export const onExportContent = (nodes, data = []) => {
  const arr = logicContent.convertTreenodeToArr(nodes);
  return arr.reduce((arrExcel, item) => {
    // not table
    if (!item.data.isTable) {
      return [...arrExcel, [item.key, item.data.name]];
    } else {
      const space = [];
      const formatTable = [
        "Mã Học Phần",
        "Tên Học Phần",
        "Số Tín Chỉ",
        "Lý Thuyết",
        "Thực Hành",
        "Bài Tập",
        "Ghi Chú"
      ];
      const subjects = item.data.subjects;
      const groups = groupBy(subjects, item => {
        return item.nameBlock;
      });
      const table = groups.reduce((results, block) => {
        const nameBlock = ["Tên Khối", block[0].nameBlock];
        const subs = block.reduce((subs, sub) => {
          const subject = [
            sub.SubjectCode,
            sub.SubjectName,
            sub.Credit,
            sub.TheoryPeriod,
            sub.PracticePeriod,
            sub.ExercisePeriod,
            ""
          ];
          return [...subs, subject];
        }, []);
        return [nameBlock, ...subs];
      }, []);
      return [...arrExcel, space, formatTable, ...table, space];
    }
  }, []);
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

export const onExportSchedule = nodes => {
  const title = [
    "Id",
    "Mã môn học",
    "Tên môn học",
    "Tên tiếng Anh",
    "Tín chỉ",
    "Số chỉ lý thuyết",
    "Số chỉ thực hành",
    "Số chỉ bài tập",
    "Mô tả",
    "Ngày tạo",
    "Ngày sửa",
    "Ghi chú"
  ];
  const data = nodes.reduce((arrExcel, semester) => {
    const subjects = semester.subjects.reduce((arr, subject) => {
      const tmp = Object.values(subject);
      return [...arr, tmp];
    }, []);
    return [...arrExcel, ["Học kì", semester.semester], ...subjects];
  }, []);

  return [title, ...data];
};
