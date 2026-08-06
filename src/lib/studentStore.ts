export interface Student {
  id: number;
  name: string;
  age: number;
  department: string;
}

const students: Student[] = [
  { id: 1, name: "Hozifa", age: 23, department: "IT" },
  { id: 2, name: "Ali", age: 25, department: "CS" },
  { id: 3, name: "Omer", age: 22, department: "CSS" },
  { id: 4, name: "Adwqi", age: 22, department: "CS3" },
  { id: 5, name: "Adwqwqai", age: 30, department: "Css" },
];

let nextId = students.length + 1;

export function getStudentsPage(page = 1, limit = 6, sort: string | null = null) {
  const sorted = [...students].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "age") return a.age - b.age;
    return b.id - a.id;
  });

  const start = (page - 1) * limit;
  return sorted.slice(start, start + limit);
}

export function getTotalStudents() {
  return students.length;
}

export function createStudent(data: Omit<Student, "id">) {
  const student: Student = {
    id: nextId++,
    ...data,
  };

  students.push(student);
  return student;
}

export function findStudentById(id: number) {
  return students.find((student) => student.id === id) ?? null;
}

export function updateStudent(id: number, data: Omit<Student, "id">) {
  const student = findStudentById(id);
  if (!student) {
    return null;
  }

  student.name = data.name;
  student.age = data.age;
  student.department = data.department;

  return student;
}

export function deleteStudent(id: number) {
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    return false;
  }

  students.splice(index, 1);
  return true;
}
