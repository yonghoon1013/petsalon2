"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../Context';

export default function Signup() {

    const {alertBoard} = useContext(myContext);
    const navigation = useRouter();

    const [pwType1, setPwType1] = useState('password'),
          [pwType2, setPwType2] = useState('password');

    let [idWarning, setIdWarning] = useState(''),
        [pwWarning, setPwWarning] = useState(''),
        [nickWarning, setNickWarning] = useState('');

    let idCheckedDo = useRef(false); //중복확인 점검여부

    let elAllInput = useRef(),  //모든 input태그)
        elSubmitBtn = useRef(); //submit 버튼)


    useEffect(()=>{
        elAllInput.current = document.querySelectorAll('section.signUpWrapper>form.signUpForm input');
    }, []);

    const idchecking = async () => {
        let idWarningStr = '';
        const regId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#%^&*]{8,20}$/; // 아이디는 8~20글자, 숫자, 문자를 포함해야 합니다.
        if(!regId.test(elAllInput.current[0].value)){
            idWarningStr = '* 아이디는 8~20글자여야 하며\n 숫자, 문자를 모두 포함해야 합니다.';
        }else{
            await axios.get(`/api/idcheck?id=${elAllInput.current[0].value}`)
            .then(res=>{
                //res.data가 true면 중복있음 //false면 중복없음
                // console.log(res.data);
    
                idCheckedDo.current = !res.data; 
                if(res.data){
                    idWarningStr = '* 중복되는 아이디가 있습니다.';
                }else{
                    alertBoard('해당 아이디는 사용 가능합니다.');
                }
            });
        }//else

        setIdWarning(idWarningStr);
    }//idchecking() 함수정의

    //다음으로 버튼)
    const signUpFun = (e) => {
        e.preventDefault();

        if(elSubmitBtn.current.classList.contains('active')){
            let formData = new FormData(e.target);
            formData.append("key", Date.now());
            let objData = Object.fromEntries(formData);

            // objData.key objData.id, objData.pw, objData.pwCheck, objData.nick

            let correctCheck = [];

            // Injection 때문에 일부 특수문자만 허용 (* 특히 {},[],(), ' ," , :, $ 제외))
            const regId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#%^&*]{8,20}$/, // 아이디는 8~20글자, 숫자, 문자를 포함해야 합니다.
                  regPw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#%^&*])[a-zA-Z\d!@#%^&*]{8,20}$/, // 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.
                  regNick = /^[^{}[\]():'"$]{5,}$/; // 5글자 이상, 특정 특수문자 제외

            correctCheck[0] = regId.test(objData.id) ? true : false; // 아이디 형식에 맞음
            correctCheck[1] = regPw.test(objData.pw) ? true : false; // 비번 형식에 맞음
            correctCheck[2] = regNick.test(objData.nick) ? true : false; // 닉네임 형식에 맞음

            correctCheck[3] = idCheckedDo.current ? true : false; // 아이디 중복확인 해봄
            correctCheck[4] = objData.pw == objData.pwCheck ? true : false; // 비번, 비번확인 같음
            
            let idWarningStr = '',
                pwWarningStr = '',
                nickWarningStr = '';

            if(!correctCheck[0] || !correctCheck[1]){// 아이디, 비번 형식 틀린 경우)
                if(!correctCheck[0] && !correctCheck[1]){
                    idWarningStr = '* 아이디는 8~20글자여야 하며\n 숫자, 문자를 모두 포함해야 합니다.';
                    pwWarningStr = '* 비밀번호는 8~20글자여야 하며\n 숫자, 문자, 특수문자를 모두 포함해야 합니다.';
                }else if(!correctCheck[0]){
                    idWarningStr = '* 아이디는 8~20글자여야 하며\n 숫자, 문자를 모두 포함해야 합니다.';

                    if(!correctCheck[3]){
                        if(!correctCheck[3]){
                            idWarningStr = '* 아이디 중복을 확인해주세요.';
                        }
                        pwWarningStr = '* 비밀번호가 서로 다릅니다.';
                    }

                }else{
                    pwWarningStr = '* 비밀번호는 8~20글자여야 하며\n 숫자, 문자, 특수문자를 모두 포함해야 합니다.';
                }//else

                if(!correctCheck[2]){
                    nickWarningStr = '* 닉네임은 5글자 이상이어야 합니다.\n* 일부 특수문자는 사용할 수 없습니다.';
                }//if(!correctCheck[2])
                
            }else if(!correctCheck[3] || !correctCheck[4]){// 아이디 비번 형식 다 맞으나, 중복확인 안 했거나, 비밀번호가 서로 다름
                
                if(!correctCheck[3] && !correctCheck[4]){
                    idWarningStr = '* 아이디 중복을 확인해주세요.';
                    pwWarningStr = '* 비밀번호가 서로 다릅니다.';
                }else if(!correctCheck[3]){
                    idWarningStr = '* 아이디 중복을 확인해주세요.';
                }else{
                    pwWarningStr = '* 비밀번호가 서로 다릅니다.';
                }

                if(!correctCheck[2]){
                    nickWarningStr = '* 닉네임은 5글자 이상이어야 합니다.\n* 일부 특수문자는 사용할 수 없습니다.';
                }//if(!correctCheck[2])
            }else{

                if(!correctCheck[2]){
                    nickWarningStr = '* 닉네임은 5글자 이상이어야 합니다.\n* 일부 특수문자는 사용할 수 없습니다.';
                }else{
                    // console.log(objData);
                    sessionStorage.setItem("signUpData", JSON.stringify(objData));

                    navigation.push('/pages/signuptype');
                }//else

            }//else
            
            setIdWarning(idWarningStr);
            setPwWarning(pwWarningStr);
            setNickWarning(nickWarningStr);
        }//if(elSubmitBtn.current.classList.contains('active'))

    }//signUpFun(e) 함수정의


    //모든 input태그에 값 다 넣으면, 다음으로 버튼 활성화 함수)
    const nextActiveFun = () => {
        let empty = false; // 모든 값이 안 채워져 있는가?

        elAllInput.current.forEach((ele, k)=>{
            if(ele.value == '') empty = true;
        })
        
        if(!empty){//전부 채워진 경우)
            elSubmitBtn.current.classList.add('active');
        }else{//전부 채워져있지 않은 경우)
            elSubmitBtn.current.classList.remove('active');
        }
    }//nextActiveFun() 함수정의

    //이전 버튼 함수)
    const prevFun = () => {
        navigation.push('/pages/signupterms');
    }//prevFun() 함수정의 

    const pwVisualFun = (e, type) => {
        e.target.classList.toggle('active');

        if(e.target.classList.contains('active')){
            type == 1 ? setPwType1('text') : setPwType2('text');
        }else{
            type == 1 ? setPwType1('password') : setPwType2('password');
        }
    }//pwVisualFun(e) 함수정의

        return (
        <>
            <div className='topWrapper'>
                <button type='button' className='prevBtn' onClick={prevFun} />
            </div>
            
            <div className='textWrapper'>
                <h2>가입 정보 입력</h2>
                <span>앞으로 우리가 만날 가입 정보를 입력해 주세요</span>
            </div>
            
            <form className='signUpForm' onSubmit={signUpFun}>
                <div className='idWrapper inputWrapper'>
                    <label className='inputLabel' htmlFor='id'>아이디</label>
                    <div className='idInputWrapper'>
                        <input type='text' name='id' className='idInput' id='id' placeholder='아이디' onChange={nextActiveFun}/>
                        <button type='button' className='idCheckBtn' onClick={idchecking}>
                            중복확인
                        </button>
                    </div>
                    
                    <span className= "idInfo">
                        {idWarning}
                    </span>
                </div>

                <div className='pwWrapper inputWrapper'>
                    <label className='pwLabel' htmlFor='pw'>비밀번호</label>
                    <div className='pwBoxWrapper'>
                        <input type={pwType1} name='pw' className='pwInput' id='pw' placeholder='비밀번호'  
                        onChange={nextActiveFun}/>
                        <button type='button' className='pwVisualBtn' onClick={(e) => {pwVisualFun(e, 1)}}/>
                    </div>
                </div>

                <div className='pwCheckWrapper inputWrapper'>
                    <label className='pwCheckLabel' htmlFor='pwCheck'>비밀번호 확인</label>
                    <div className='pwBoxWrapper'>
                        <input type={pwType2} name='pwCheck' className='pwCheckInput' id='pwCheck' placeholder='비밀번호 확인'
                        onChange={nextActiveFun}
                        />
                        <button type='button' className='pwVisualBtn' onClick={(e) => {pwVisualFun(e, 2)}}/>
                    </div>

                    <span className='pwInfo'>
                        {pwWarning}
                    </span>
                </div>

                <div className='nickWrapper inputWrapper'>
                    <label className='nickLabel' htmlFor='nick'>닉네임</label>
                    <input type='text' name='nick' className='nickInput' id='nick' placeholder='닉네임'
                    onChange={nextActiveFun}
                    />
                    <span className='nickInfo'>
                        {nickWarning}
                    </span>
                </div>

                <button className='submitBtn' ref={elSubmitBtn}>
                    다음으로
                </button>
            </form>    
        </>
  )
}
