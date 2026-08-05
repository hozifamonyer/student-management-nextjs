"use client";

import { useState } from "react";
import toast from "react-hot-toast";
type Student = {
  id: number;
  name: string;
  age: number;
  department: string;
};

type Props = {
  editingStudent: Student | null;
  onUpdated: () => void;
};

export default function Forms({
  
  editingStudent,
  onUpdated,
}: Props) {
  const [name, setName] = useState(
    editingStudent?.name ?? ""
  );

  const [age, setAge] = useState(
    editingStudent ? String(editingStudent.age) : ""
  );

  const [department, setDepartment] = useState(
    editingStudent?.department ?? ""
  );
  const [submitting, setSubmitting] = useState(false);
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    let response: Response;
       if (!name.trim()) {
  toast.error("Name is required");
  return;
}

if (!department.trim()) {
  toast.error("Department is required");
  return;
}

if (!age || Number(age) <= 0) {
  toast.error("Age must be greater than 0");
  return;
}
    if (editingStudent) {
      setSubmitting(true);
      response = await fetch(
        `/api/students/${editingStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            age: Number(age),
            department,
          }),
        }
      );
    } else {
      response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          department,
        }),
      });
    }

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    await response.json();

    if (editingStudent) {
      toast.success("Student updated successfully!");
    } else {
      toast.success("Student added successfully!");
    }

    setName("");
    setAge("");
    setDepartment("");

    onUpdated();

  } catch (error) {
    console.log(error);

    toast.error(
      editingStudent
        ? "Failed to update student!"
        : "Failed to add student!"
    );
  }
  finally{
    setSubmitting(false);
}
}
  return (

    <form
    
    onSubmit={handleSubmit}
    
    className="
    space-y-5
    "
    
    >
       
    
    <input
    
    type="text"
    
    placeholder="Student Name"
    
    value={name}
    
    onChange={(e)=>setName(e.target.value)}
    
    className="
    w-full
    border
    rounded-lg
    p-3
    outline-none
    focus:ring-2
    focus:ring-blue-500
    "
    
    />
    
    
    
    <input
    
    type="number"
    
    placeholder="Student Age"
    
    value={age}
    
    onChange={(e)=>setAge(e.target.value)}
    
    className="
    w-full
    border
    rounded-lg
    p-3
    outline-none
    focus:ring-2
    focus:ring-blue-500
    "
    
    />
    
    
    
    <input
    
    type="text"
    
    placeholder="Department"
    
    value={department}
    
    onChange={(e)=>setDepartment(e.target.value)}
    
    className="
    w-full
    border
    rounded-lg
    p-3
    outline-none
    focus:ring-2
    focus:ring-blue-500
    "
    
    />
    
    <button
type="submit"
disabled={submitting}
className="
w-full
bg-green-600
text-white
rounded-lg
py-3
disabled:bg-gray-400
"
>

{submitting ? (

<div className="flex justify-center">

<div className="
w-5
h-5
border-2
border-white
border-t-transparent
rounded-full
animate-spin
"/>

</div>

) : editingStudent ?

"Update Student"

:

"Add Student"

}

</button>
    
    
    
    </form>
    
    )
}