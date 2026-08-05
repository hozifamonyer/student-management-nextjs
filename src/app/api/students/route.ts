
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const sort = searchParams.get("sort");

  const page = Number(searchParams.get("page")) || 1;

  const limit = 6;

  const skip = (page - 1) * limit;

  const students = await prisma.student.findMany({
    skip,
    take: limit,

    orderBy:
      sort === "name"
        ? { name: "asc" }
        : sort === "age"
        ? { age: "asc" }
        : { id: "desc" },
  });
     const totalStudents = await prisma.student.count();

return NextResponse.json({

    students,

    totalStudents,

    currentPage: page,

    totalPages: Math.ceil(totalStudents / limit)

});
}

// POST
export async function POST(req: Request){

    const body = await req.json();
     

    const student = await prisma.student.create({

        data:{
            name: body.name,
            age: body.age,
            department: body.department
        }

    });


    return NextResponse.json(
        student,
        {
            status:201
        }
    );

}
   
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const body = await req.json();

    const student = await prisma.student.update({

        where: {
            id: Number(id),
        },

        data: {
            name: body.name,
            age: body.age,
            department: body.department,
        },

    });

    return NextResponse.json(student);

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
