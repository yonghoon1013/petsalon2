"use client"
import axios from 'axios'
import React from 'react'

function Login() {
    const loginFn = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const objData = Object.fromEntries(formData);

        console.log(Date.now())

        axios.get(`/api/login?id=${objData.id}&pw=${objData.pw}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.length > 0) {
                sessionStorage.setItem("key", res.data[0].key);
                sessionStorage.setItem("nick", res.data[0].nickname);
            } else {
                alert("응 실패");
            }
        })
    }

  return (
    <section>
        <form onSubmit={loginFn}>
            <input name='id' type='text'/>
            <input name='pw' type='text'/>
            <button>로그인</button>
        </form>
    </section>
  )
}

export default Login