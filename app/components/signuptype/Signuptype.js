"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { myContext } from '../Context';

export default function Signuptype() {
    const {alertBoard} = useContext(myContext);
    const navigation = useRouter();

    const elAllInput = useRef(),
          elSubmitBtn = useRef();

    useEffect(()=>{
        elAllInput.current = document.querySelectorAll('section.signUpTypeWrapper>form.signUpTypeForm>div.typeWrapper>figure>input');
    }, []);
    
    const nextActiveFun = () => {
        let empty = true; 

        elAllInput.current.forEach((ele)=>{
            if(ele.checked) empty = false;
        })

        if(!empty){//미용사, 댕냥이 중 하나라도 선택한 경우)
            elSubmitBtn.current.classList.add('active');
        }else{
            elSubmitBtn.current.classList.remove('active');
        }
    }//nextActiveFun() 함수정의

    const prevFun = () => {
        const signUpMode = sessionStorage.getItem("signUpMode");

        if(signUpMode == 'normal'){//일반 회원가입 경우)
            navigation.push('/pages/signup');

        }else{//카카오 회원가입 경우
            navigation.push('/pages/signupterms');
        }

    }//prevFun() 함수정의

    const signUpFun = async (e) => {
        e.preventDefault();
        
        if(elSubmitBtn.current.classList.contains('active')){
            let signUpData = JSON.parse(sessionStorage.getItem("signUpData"));
            signUpData = {...signUpData, mode: e.target.type.value}
            
            let error = false;

            //해당 값('id', 'pw', 'nick', 'mode', 'key', 'pwCheck')중 하나여야 함
            const regErrCheck = /\b(?:id|pw|nick|mode|key|pwCheck)\b/; 

            const signUpMode = sessionStorage.getItem("signUpMode");

            for(let item in signUpData){
                if(signUpData[item] == '' || signUpData[item] == null || signUpData[item] == undefined || !regErrCheck.test(item)){
                    if(signUpMode == 'kakao' && item == 'pw'){
                        // console.log('됬나오?', signUpData, item);
                        continue;
                    }
                    error = true;  
                }
            }//for(let item in signUpData)

            //'id', 'pw', 'nick', 'mode', 'key'는 꼭 들어가서 최소 5개 이상 나와야 함
            if(Object.keys(signUpData).length < 5){
                error = true;
            }

            if(error){//에러
                alertBoard('가입에 오류가 생겼습니다.');
                
                sessionStorage.removeItem('signUpData');
                sessionStorage.removeItem('signUpMode');

                navigation.push('/pages/intro');
            }else{
                await axios.post('/api/member', signUpData);
                sessionStorage.removeItem('signUpData');
                sessionStorage.removeItem('signUpMode');

                navigation.push('/pages/login');

                alertBoard('가입이 완료되었습니다.');
            }
        }//if(elSubmitBtn.current.classList.contains('active'))
    }//signUpFun() 함수정의

  return (
    <>
        <div className='topWrapper'>
            <button type='button' className='prevBtn' onClick={prevFun} />
        </div>
        
        <div className='textWrapper'>
            <h2>어떤 분이 사용하시나요?</h2>
            <span>사용자를 선택해주세요</span>
        </div>  

        <form className='signUpTypeForm' onSubmit={signUpFun}>
            <div className='typeWrapper'>
                <figure className='groomerWrapper'>
                    <input type='radio' name='type' value='designer' id='groomer' onChange={nextActiveFun}/>
                    <label htmlFor='groomer'/>

                    <figcaption>미용사</figcaption>
                </figure>   

                <figure className='petOwnerWrapper'>
                    <input type='radio' name='type' value='user' id='petOwner' onChange={nextActiveFun}/>
                    <label htmlFor='petOwner'/>

                    <figcaption>댕냥이</figcaption>
                </figure>      
            </div>
            

            <button className='submitBtn' ref={elSubmitBtn}>
                시작하기      
            </button>
        </form>  
    </>
  )
}