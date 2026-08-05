"use client";

import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

const [open,setOpen] = useState(false);


return (

<nav className="bg-white shadow-md">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="flex justify-between items-center h-16">


<h1 className="text-2xl font-bold text-blue-600">
Student App
</h1>



<div className="hidden md:flex gap-6">


<Link 
href="/"
className="text-gray-700 hover:text-blue-600"
>
Home
</Link>




<Link 
href="/about"
className="text-gray-700 hover:text-blue-600"
>
About
</Link>


<Link 
href="/contact"
className="text-gray-700 hover:text-blue-600"
>
Contact
</Link>


</div>



<button

className="md:hidden text-3xl"

onClick={()=>setOpen(!open)}

>

☰

</button>



</div>



{
open && (

<div className="md:hidden flex flex-col gap-4 pb-5">


<Link href="/">
Home
</Link>


<Link href="/students">
Students
</Link>


<Link href="/about">
About
</Link>


<Link href="/contact">
Contact
</Link>


</div>

)

}


</div>

</nav>


)

}