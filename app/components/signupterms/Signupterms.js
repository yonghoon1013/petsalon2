"use client";

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';

import termItems from './terms.json'; //'\n' 인식하라고 json에 넣고 불러옮


export default function Signupterm() {
    const navigation = useRouter();

    let elAllLi, // 모든 약관 동의 묶어논 li태그
        elAllInputCheck = [], // 모든 li태그의 체크박스
        elSubmitBtn = useRef(); // 다음으로 버튼

    useEffect(()=>{

        //모든 li 가져오기 (아코디언에 쓸 거임)
        elAllLi = document.querySelectorAll('section.signUpTearmsWrapper>form.signUpTermForm>div.termWrapper>ul>li');

        //모든 li의 체크박스 가져오기)
        elAllLi.forEach((li, k) => {
            elAllInputCheck[k] = li.querySelector("input[type='checkbox']");
        });
    })


    //아코디언 작동 함수)
    const accordionFun = (num) => {
        elAllLi[num].classList.toggle('active');
    }//accordionFun(num = 0) 함수정의

    //전체동의 체크박스 onChange 함수)
    const allCheckFun = (e) => {
        elAllInputCheck.forEach((ele)=>{
            ele.checked = e.target.checked;
        });

        if(e.target.checked){
            elSubmitBtn.current.classList.add('active');
        }else{
            elSubmitBtn.current.classList.remove('active');
        }
    }//allCheckFun() 함수정의

    //li 체크박스 onChange 함수)
    const checkFun = () => {
        let allCheck = true;

        elAllInputCheck.forEach((ele)=>{
            //하나라도 체크 안되면 false로 바뀜
            if(!(ele.checked)) allCheck = false; 
        })

        allTerm.checked = allCheck; //allTerm(전체동의 체크박스 id)

        if(elAllInputCheck[0].checked&elAllInputCheck[1].checked&elAllInputCheck[2].checked&elAllInputCheck[3].checked){
            elSubmitBtn.current.classList.add('active');
        }else{
            elSubmitBtn.current.classList.remove('active');
        }

    }//checkFun() 함수정의

    //submit 함수)
    const submitFun = (e) => {
        e.preventDefault();

        if(elSubmitBtn.current.classList.contains('active')){
            // let form = new FormData(e.target);
            // let data = Object.fromEntries(form);

            const signUpMode = sessionStorage.getItem('signUpMode');
            if(signUpMode == 'normal'){// 일반 회원가입인 경우)
                // console.log('일반 회원가입');
                navigation.push('/pages/signup');
            }else{// 카카오 회원가입인 경우)
                // console.log('카카오 회원가입');
                navigation.push('/pages/signuptype');
            }
            
        }

    }//submitFun() 함수정의

    //이전 버튼 함수)
    const prevFun = () => {

        sessionStorage.removeItem('signUpMode');
        sessionStorage.removeItem('signUpData');

        navigation.push('/pages/intro');
    }//prevFun() 함수정의

  return (
    <>
    <div className='topWrapper'>
        <button type='button' className='prevBtn' onClick={prevFun} />
    </div>
    
    <div className='textWrapper'>
      <h2>약관 동의하기</h2>
      <span>우리 만난 적은 없지만 동의가 필요해요</span>
    </div>

    <form className='signUpTermForm' onSubmit={(e) => {submitFun(e)}}>
        
        <div className='termWrapper'>
          <strong className='allCheck'> 
            전체동의 
            <input type='checkbox' name='allTerm' id='allTerm' 
            onChange={(e) => {allCheckFun(e)}}/>
            <label htmlFor='allTerm' className='allTerm_label'/>
          </strong>

          <ul>
            <li>
                <h3 onClick={() => {accordionFun(0)}}>
                    <strong className='titleText'>
                        댕냥 살롱 이용약관 동의(필수)
                    </strong>
                    <i className='arrowIcon'/>
                </h3>
                <div className='accordionWrapper'>
                    <p className='detailTxt'>
                        {termItems[0]}
                    </p>
                    <div className='agreeWrapper'>
                        <span>동의합니다.</span>
                         
                        <input type='checkbox' name='salonTerm' id='salonTerm' onChange={checkFun}/>
                        <label htmlFor='salonTerm'/>
                    </div>
                </div>
            </li>

            <li>
                <h3 onClick={() => {accordionFun(1)}}>
                    <strong className='titleText'>
                        개인정보 수집 및 이용 동의 (필수)
                    </strong>
                    <i className='arrowIcon'/>
                </h3>
                <div className='accordionWrapper'>
                    <p className='detailTxt'>
                        {termItems[1]}
                    </p>
                    <div className='agreeWrapper'>
                        <span>동의합니다.</span>
                         
                        <input type='checkbox' name='privTerm' id='privTerm' onChange={checkFun}/>
                        <label htmlFor='privTerm'/>
                    </div>
                </div>
            </li>

            <li>
                <h3 onClick={() => {accordionFun(2)}}>
                    <strong className='titleText'>
                        위치기반 서비스 이용 동의(필수)
                    </strong>
                    <i className='arrowIcon'/>
                </h3>
                <div className='accordionWrapper'>
                    <p className='detailTxt'>
                        {termItems[2]}
                    </p>
                    <div className='agreeWrapper'>
                        <span>동의합니다.</span>
                         
                        <input type='checkbox' name='locationTerm' id='locationTerm' onChange={checkFun}/>
                        <label htmlFor='locationTerm'/>
                    </div>
                </div>
            </li>

            <li>
                <h3 onClick={() => {accordionFun(3)}}>
                    <strong className='titleText'>
                        만 14세 이상 확인(필수)
                    </strong>
                    <i className='arrowIcon'/>
                </h3>
                <div className='accordionWrapper'>
                    <p className='detailTxt'>
                        {termItems[3]} 
                    </p>
                    <div className='agreeWrapper'>
                        <span>동의합니다.</span>
                         
                        <input type='checkbox' name='teenagerTerm' id='teenagerTerm' onChange={checkFun}/>
                        <label htmlFor='teenagerTerm'/>
                    </div>
                </div>
            </li>

            <li>
                <h3 onClick={() => {accordionFun(4)}}>
                    <strong className='titleText'>
                        마케팅정보 수신 동의(선택)
                    </strong>
                    <i className='arrowIcon'/>
                </h3>
                <div className='accordionWrapper'>
                    <p className='detailTxt'>
                        {termItems[4]}
                    </p>
                    <div className='agreeWrapper'>
                        <span>동의합니다.</span>
                         
                        <input type='checkbox' name='marketingTerm' id='marketingTerm' onChange={checkFun}/>
                        <label htmlFor='marketingTerm'/>
                    </div>
                </div>
            </li>
          </ul>
        </div>   

        <button className='submitBtn' ref={elSubmitBtn}>
            다음으로  
        </button>
    </form>    
</>
  )
}
