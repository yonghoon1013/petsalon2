"use client"

import axios from 'axios'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react'
import { myContext } from '../Context';

function Login() {

  const {alertBoard} = useContext(myContext);
    const navigation = useRouter();

    const paramsData = useSearchParams();
    const detailLink = paramsData.get("detailNum");
    const elPwInput = useRef();
    const [type, setType] = useState('password');
    const kakaoLogout = () => {
        if(Kakao.Auth.getAccessToken()) {
            Kakao.API.request({
              url: '/v1/user/unlink',
              success: function (response) {
                console.log(response)
              },
              fail: function (error) {
                console.log(error)
              }
            })
            Kakao.Auth.setAccessToken(undefined)
        }  
    }//kakaoLogout() 함수정의

    const loginFn = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const objData = Object.fromEntries(formData);

      axios.get(`/api/login?id=${objData.id}&pw=${objData.pw}`)
      .then(res=>{

        if(res.data.length > 0) {//가입한 아이디가 있을 때)
          const loginObj = {
              id: res.data[0].id,
              key: res.data[0].key,
              nickname: res.data[0].nickname
              }//loginObj 객체

          //local에서 session으로 고친 구간
          sessionStorage.setItem("loginBool", true);
          sessionStorage.setItem("key", res.data[0].key);
          sessionStorage.setItem("loginObj", JSON.stringify(loginObj));
          if(detailLink){
            navigation.push(detailLink);
          } else{
            navigation.push('/pages/list');
          }

        } else {
          alertBoard("아이디 또는 비밀번호를 다시 확인해주세요."); //"응 실패 그거"
        }
      })
    }//loginFn(e) 함수정의
    const kakaoLoginBtn = () => {
        
      if(!Kakao.isInitialized()) {//초기화(init)이 되있는지 여부에 따라 true, false
        Kakao.init(process.env.NEXT_PUBLIC_KJSKEY) //초기화는 한 번만 //이미 된 상태에서 또 하면 오류라서 이렇게 함
      }
      //발급받은 키 중 javascript키를 사용해준다.

      Kakao.Auth.login({
        success: function (response) {
          Kakao.API.request({
            url: '/v2/user/me',
            success: async function (response) {
              kakaoLogout();

              axios.get(`/api/login?id=${'kakao_' + response.id}&pw=`)
              .then(res=>{
                
                if(res.data.length > 0) {//가입한 적이 있을 때)
                  const loginObj = {
                    id: res.data[0].id,
                    key: res.data[0].key,
                    nickname: res.data[0].nickname
                  }//loginObj 객체
                  
                  //local에서 session으로 고친 구간
                  sessionStorage.setItem("loginBool", true);
                  sessionStorage.setItem("key", res.data[0].key);
                  sessionStorage.setItem("loginObj", JSON.stringify(loginObj));
                  if(detailLink){
                    navigation.push(detailLink);
                  } else{
                    navigation.push('/pages/list');
                  }
                } else {
                  alertBoard("아직 카카오로 가입하신 적이 없는 회원입니다."); //"응 실패 그거"
                }
              })//.then

            },//success: async function (response)
            fail: function (error) {
              console.log(error);
            },
          })//Kakao.API.request
        },//success(response)
  
        fail: function (error) {
          console.log(error);
        },//fail(error)
      })

    }//kakaoLoginBtn() 함수정의

    const pwVisualFun = (e) => {
      e.target.classList.toggle('active');

      if(e.target.classList.contains('active')){
        setType('text');
      }else{
        setType('password');
      }
    }//pwVisualFun(e) 함수정의

  return (
        <form className='contentsWrapper' onSubmit={loginFn}>
            <input type='text' className='idInput' name="id" placeholder='아이디'/>
            <div className='pwInputWrapper'>
                <input type={type} className='pwInput' name="pw" placeholder='비밀번호' ref={elPwInput}/>
                <button type='button' className='pwVisualBtn' onClick={pwVisualFun}/>
            </div> 
            <button className='loginBtn'>
                로그인
            </button>
            <nav>
                <button type='button' className='kakaoLoginBtn' onClick={kakaoLoginBtn}>
                    카카오로 로그인
                </button>   
                <Link href='./intro' className="signUpLink">
                    회원가입 하기
                </Link>
            </nav>
        </form>
  )
}

export default Login
