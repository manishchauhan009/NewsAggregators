// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// function Test() {
//     const [value, setValue] = useState('');
//     useEffect(()=>{
//         console.log(value)

//     },[value])
//     return <ReactQuill theme="snow" value={value} onChange={setValue} />;
// }

// export default Test


import React from 'react';

function Test() {
    const element = "<div><h1>hello</h1><h2>world</h2></div>";

    return (
        <div>
            <p>Testing Component Render</p>
            <div dangerouslySetInnerHTML={{ __html: element }} />
        </div>
        
    );
}

export default Test;
