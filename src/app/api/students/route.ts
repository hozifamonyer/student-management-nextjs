
import { NextRequest, NextResponse } from "next/server";
import { createStudent, getStudentsPage, getTotalStudents } from "@/lib/studentStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;
  const limit = 6;

  const students = getStudentsPage(page, limit, sort);
  const totalStudents = getTotalStudents();

  return NextResponse.json({
    students,
    totalStudents,
    currentPage: page,
    totalPages: Math.ceil(totalStudents / limit),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const student = createStudent({
    name: body.name,
    age: body.age,
    department: body.department,
  });

  return NextResponse.json(student, {
    status: 201,
  });
}

   
   /*
    
    import { NextResponse } from "next/server";


export async function GET(){

    return NextResponse.json([

        {
        id:1,
        name:"Hozifa",
        age:23,
        department:"IT"
        },
        
        {
        id:2,
        name:"Ali",
        age:25,
        department:"CS"
        },
        
        {
            id:3,
            name:"omer",
            age:22,
            department:"CsS"
            },
            
        {
            id:4,
            name:"Adwqi",
            age:22,
            department:"CS3"
            },
            {
                id:5,
                name:"Adwqwqai",
                age:30,
                department:"Css"
                }
        
        
        ]);
    }
    
    */
