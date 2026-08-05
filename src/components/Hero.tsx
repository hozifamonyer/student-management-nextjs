'use client'

import { useState } from "react";

export default function Hero(){
  const [Name, setName] = useState("");
  const [show, setShow] = useState(false);  
  
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    

    e.preventDefault();
    if(Name){
      setShow(true);
      console.log(Name);
     }else{
      console.log("name:");

     }
    
    }
    
return(
<div>
<form onSubmit={handleSubmit}>

<label>
Name:

<input
value={Name}
onChange={(e)=>setName(e.target.value)}
placeholder="Please enter your name"
/>

</label>


<button type="submit">
Click
</button>

</form>
{
show ?

<h1>Welcome {Name}</h1>

:

<h1>Please Login</h1>
}
</div>
)

}