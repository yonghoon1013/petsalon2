"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import './styles.scss'; 

export default function Splash() {
  const elSplash = useRef();
  const navigation = useRouter();

  const autoFun = async () => {
    const loginBool = sessionStorage.getItem("loginBool"); //없으면 null값 나옴
    
    setTimeout(() => {
      if(loginBool == 'true'){//이전에 로그인 하고 로그아웃 안한 경우(바로 메인화면으로 가기)
          navigation.push('/pages/list');
      }else{//로그인 한 적 없을 때 바로 intro(회원가입 화면)화면으로
        elSplash.current.classList.add('noVisual');
      }
    }, 2000);

  }//autoFun(); 함수정의

  useEffect(()=>{
    autoFun();
    return clearTimeout(autoFun);
  })

  return (
    <div className='splashWrapper' ref={elSplash}>
      <div className='contentsWrapper'>
        <figure className='logoWrapper'>
            <ul className='catAndDog'>
                <li/>
                <li/>
            </ul>
            <figcaption />
        </figure>

        <span className='introduction'>
            세상에서 가장 가까운 반려동물 미용실
        </span>
      </div>
    </div>
  )
}
