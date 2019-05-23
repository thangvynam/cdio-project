export const filterSubjects = (e, subjects) => {
  const re = new RegExp(e.query.toLowerCase());
  const results = subjects
    ? subjects.filter(item => {
        return re.test(item.SubjectName.toLowerCase());
      })
    : [];
  return results;
};

export const addSubjectInOnchange = (subjects, subject) => {
  if (checkExistsSubject(subjects, subject)) {
    return subjects;
  }
  return [...subjects, subject];
};

const checkExistsSubject = (subjects, subject) => {
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].SubjectName === subject.SubjectName) {
      return true;
    }
  }
  return false;
};

const getUnique = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
};

const sortSemester = (a, b) => {
  if (a.semester > b.semester) return 1;
  if (a.semester < b.semester) return -1;
  return 0;
};

export const addSemester = (semester, subjects, semesters) => {
  let data = [...semesters];

  const newSubjects = subjects.map(ele => {
    ele.note = ele.note ? ele.note : "";
    return ele;
  });

  const index = data.findIndex(ele => ele.semester === semester);
  if (index > -1) {
    data[index].subjects = getUnique(
      [...data[index].subjects, ...newSubjects],
      "Id"
    );
  } else {
    let newSemester = { semester, subjects: newSubjects };
    data = [...data, newSemester];
  }
  data.sort(sortSemester);
  return data;
};

export const deleteSubject = (semesters, semester, subject) => {
  const data = [...semesters];

  const index = data.findIndex(ele => ele.semester === semester);
  data[index].subjects = data[index].subjects.filter(
    ele => ele.Id !== subject.Id
  );
  return data;
};

export const editorValueChange = (props, value, semester, semesters) => {
  const data = [...semesters];
  const index = data.findIndex(ele => ele.semester === semester);
  data[index].subjects[props.rowIndex][props.field] = value;
  return data;
};

export const onRowSubjectReorder = (subjects, semester, semesters) => {
  const data = [...semesters];
  const index = data.findIndex(ele => ele.semester === semester);
  data[index].subjects = [...subjects];
  return data;
};

export const mapSubjectsToScheduleNodes = (scheduleNodes, subjects) => {
  console.error(scheduleNodes)
  const tmpNodes = scheduleNodes
    .filter(row => row.semester > 0)
    .map(row => {
      const newSubjects = row.subjects.map(subject => {
        for (let i in subjects) {
          if (subject.IdSubject === subjects[i].Id) {
            const { Id, ...rest } = subjects[i];
            return { ...subject, ...rest };
          }
        }
      });
      return { semester: row.semester, subjects: newSubjects };
    });
  tmpNodes.sort(sortSemester);
  return tmpNodes;
};
