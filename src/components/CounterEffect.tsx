/*'use client'

import { useEffect, useState } from "react";

export default function CounterEffect(){

const [count, setCount] = useState(0);


function handleClick(){
    setCount(count + 1);
}


useEffect(()=>{

console.log(`You clicked ${count} times`);

},[count]);


return(
<>
<button onClick={handleClick}>
Click
</button>

<p>{count}</p>
</>
)

}*/