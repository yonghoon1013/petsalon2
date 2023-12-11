"use client";
import axios from 'axios';
import { useRef, useState } from 'react'

export default function Signup() {
    const [idChecked, setIdChecked] = useState(false);
    const elIdInput = useRef();

    const idchecking = async (e) => {
        e.preventDefault();

        // await axios.get(`/api/idcheck?id=${e.target.value}`)
        // .then(res=>{
        //     setIdChecked(res.data);
        //     console.log(res.data);
        // });
        // console.log(idChecked)
    }//idchecking() 함수정의


    const signUpFun = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);
        formData.append("key", Date.now());
        let objData = Object.fromEntries(formData);

        console.log(objData)

        if(objData.pw != objData.pwCheck) {alert("비번틀려")}
        else {
            await axios.post('/api/member', objData)
            .then(res=>{
                console.log(res.data)
            })    
        }
        

        }//signUpFun(e) 함수정의
        
        return (
        <section>
            <div className='titleWrapper'>
                <button type='button' className='prevBtn'>←</button>
                <h2>회원 가입</h2>
            </div>
            
            <form className='signUpForm' onSubmit={signUpFun}>
                <div className='inputWrapper'>
                    <label className='inputLabel' htmlFor='id'>아이디</label>
                    <input ref={elIdInput} type='text' name='id' className='input' id='id' placeholder='아이디'/>
                    <span className={idChecked ? "idInfo active" : "idInfo"}>중복됩니다.</span>
                </div>

                <div className='pwWrapper inputWrapper'>
                    <label className='pwLabel' htmlFor='pw'>비밀번호</label>
                    <input type='password' name='pw' className='pwInput' id='pw' placeholder='비밀번호'/>
                </div>

                <div className='pwCheckWrapper inputWrapper'>
                    <label className='pwCheckLabel' htmlFor='pwCheck'>비밀번호 확인</label>
                    <input type='password' name='pwCheck' className='pwCheckInput' id='pwCheck' placeholder='비밀번호 확인'/>
                    <span className='pwInfo'>* 영문, 숫자 포함 8자 이상</span>
                </div>

                <div className='nickWrapper inputWrapper'>
                    <label className='nickLabel' htmlFor='nick'>닉네임</label>
                    <input type='text' name='nick' className='nickInput' id='nick' placeholder='닉네임'/>
                    <span className='nickInfo'>* 최대 8자 까지</span>
                </div>

                <button className='submitBtn'>
                    다음으로
                </button>
            </form>    
        </section>
  )
}
