"use client";

import { useCallback, useEffect, useState } from "react";
import Forms from "@/components/Forms";
import toast from "react-hot-toast";
import StudentCard from "@/components/StudentCard";


interface Student {
  id: number;
  name: string;
  age: number;
  department: string;
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
const [loading, setLoading] = useState(true);
const [sort, setSort] = useState("id");
const [page,setPage]=useState(1);

const [totalPages,setTotalPages]=useState(1);
const getStudents = useCallback(async () => {
  try {
    setLoading(true);

const response=await fetch(

`/api/students?page=${page}&sort=${sort}`

);
    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    const data = await response.json();

setStudents(data.students);

setTotalPages(data.totalPages);
  } catch (error) {
    console.log(error);
  } finally {
  setTimeout(() => {
    setLoading(false);
  }, 1000); // 5000ms = 5 seconds
}
}, [page, sort]);
async function deleteStudent(id: number) {
  if (!window.confirm("Are you sure you want to delete this student?")) {
    return;
  }

  try {
    const response = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    await getStudents();

    toast.success("Student deleted successfully!");

  } catch (error) {
    console.log(error);

    toast.error("Failed to delete student!");
  }
}

  useEffect(() => {
    getStudents();
  }, [getStudents]);
  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold text-blue-600">
        Loading...
      </p>
    </div>
  );
}
  return (
    <>
  
  
  
      <main className="min-h-screen bg-gray-100 py-10">
  
        <div className="max-w-6xl mx-auto px-5">
  
  
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Students Management
          </h1>
  
  
  
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
                
            <Forms
              key={editingStudent?.id ?? "new"}
              editingStudent={editingStudent}
              onUpdated={async () => {
  
                await getStudents();
  
                setEditingStudent(null);
  
              }}
            />
  
          </div>
  
  
  <div className="flex justify-end mb-5">

    <select

        value={sort}

        onChange={(e)=>setSort(e.target.value)}

        className="
        border
        rounded-lg
        p-2
        "

    >

        <option value="id">
            Latest
        </option>

        <option value="name">
            Name
        </option>

        <option value="age">
            Age
        </option>

    </select>

</div>
          <h2 className="text-2xl font-semibold mb-5">
            Students List
          </h2>
  
  
  
          <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3 
          gap-6
          ">
  
  
          {students.map((student)=>(
  
  
          <StudentCard

key={student.id}

student={student}

onEdit={()=>setEditingStudent(student)}

onDelete={()=>deleteStudent(student.id)}

/>
    
  
          ))}
  <div

className="

flex

justify-center

items-center

gap-4

mt-10

"

>

<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="

px-5

py-2

bg-gray-800

text-white

rounded

disabled:bg-gray-400

"

>

Previous

</button>

<span

className="font-semibold"

>

Page {page} of {totalPages}

</span>

<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="

px-5

py-2

bg-blue-600

text-white

rounded

disabled:bg-gray-400

"

>

Next

</button>

</div>
  
          </div>
  
  
  
        </div>
  
  
      </main>
  
  
  
  
    </>
  );
}