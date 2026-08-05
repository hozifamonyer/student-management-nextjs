"use client";

import { Student } from "@prisma/client";

type Props = {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
};

export default function StudentCard({
  student,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      hover:shadow-xl
      transition
      p-6
      flex
      flex-col
      justify-between
      "
    >
      <div>
        <h3
          className="
          text-2xl
          font-bold
          text-gray-800
          mb-4
          "
        >
          {student.name}
        </h3>

        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Age:</span> {student.age}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold">Department:</span>{" "}
            {student.department}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onEdit}
          className="
          flex-1
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2
          rounded-lg
          transition
          "
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="
          flex-1
          bg-red-600
          hover:bg-red-700
          text-white
          py-2
          rounded-lg
          transition
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}