"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { myContext } from '../Context';

export default function Intro() {

  const { alertBoard } = useContext(myContext);
  const navigation = useRouter();

  const kakaoLogout = () => {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {

        },
        fail: function (error) {
          console.log(error)
        }
      })
      Kakao.Auth.setAccessToken(undefined)
    }
  }//kakaoLogout() 함수정의

  const signUpFun = (normal) => {

    if (normal) {// 일반 회원가입인 경우)
      //'normal'이면 일반 회원가입, 
      //'kakao'면 카카오로 회원가입
      sessionStorage.setItem("signUpMode", "normal");
      navigation.push(`/pages/signupterms`);

    } else {// 카카오 회원가입인 경우)
      //console.log(Kakao.isInitialized()); // sdk초기화여부판단
      if (!Kakao.isInitialized()) {//초기화(init)이 되있는지 여부에 따라 true, false
        Kakao.init(process.env.NEXT_PUBLIC_KJSKEY) //초기화는 한 번만 //이미 된 상태에서 또 하면 오류라서 이렇게 함
      }

      //발급받은 키 중 javascript키를 사용해준다.
      Kakao.Auth.login({
        success: function (response) {
          Kakao.API.request({
            url: '/v2/user/me',
            success: async function (response) {

              axios.get(`/api/idcheck?id=${'kakao_' + response.id}`)
                .then(res => {
                  if (!res.data) {//카카오로 회원가입한 적이 없음
                    //'id', 'pw', 'nick', 'mode', 'key', 'pwCheck'
                    const objData = {
                      key: Date.now(),
                      id: 'kakao_' + response.id,
                      pw: '',
                      nick: response.kakao_account.profile.nickname
                    }
                    kakaoLogout();
                    sessionStorage.setItem("signUpData", JSON.stringify(objData));
                    sessionStorage.setItem("signUpMode", "kakao");
                    navigation.push('/pages/signupterms');

                  } else {//카카오로 회원가입한 적이 있음
                    kakaoLogout();
                    alertBoard('이미 카카오 계정이 있는 회원입니다.');
                  }

                });//.then

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
    }//else

  }//signUpFun() 함수정의


  return (
    <>
      <ul className='imgSlideAni'>
        <li>
          <img src='/LeeTest/img/slide_ani.svg' alt='강아지와 고양이 슬라이드 이미지' />
        </li>
        <li>
          <img src='/LeeTest/img/slide_ani.svg' alt='강아지와 고양이 슬라이드 이미지' />
        </li>
      </ul>
      <div className='btnWrapper'>
        <button type='button' className='kakaoSignUpBtn'
          onClick={() => { signUpFun(false) }}>
          카카오로 회원가입
        </button>
        <button type='button' className='normalSignUpBtn'
          onClick={() => { signUpFun(true) }}>
          일반 회원가입
        </button>
        <Link href='/pages/login'>이미 계정이 있어요</Link>
      </div>
    </>
  )
}
