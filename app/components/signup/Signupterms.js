import React from 'react'

export default function Signupterm() {
  return (
    <>
    <div className='titleWrapper'>
        <button type='button' className='prevBtn' />
        <h2>약관 동의</h2>
    </div>
    
    <strong className='welcomeText'>
      반가워요!<br />
      댕냥 살롱에 오신 것을 환영합니다.
    </strong>

    <form className='signUpTermForm'>
        
        <div className='termWrapper'>
          <strong className='allCheck'> 
            전체동의 <input type='checkbox' name='allTerm' id='allTerm'/>
            <label htmlFor='allTerm' className='allTerm_label'/>
          </strong>
          <ul>
            <li>
              댕냥 살롱 이용약관 동의(필수) 
              <input type='checkbox' name='mainTerm' id='mainTerm'/>
              <label htmlFor='mainTerm' className='mainTerm_label'/>
            </li>
            <li>
              개인정보 수집 및 이용 동의 (필수) 
              <input type='checkbox' name='privTerm' id='privTerm'/>
              <label htmlFor='privTerm' className='privTerm_label'/>
            </li>
            <li>
              위치기반 서비스 이용 동의(필수) 
              <input type='checkbox' name='locationTerm' id='locationTerm'/>
              <label htmlFor='locationTerm' className='locationTerm_label'/>
            </li>
            <li>
              만 14세 이상 확인(필수) 
              <input type='checkbox' name='teenagerTerm' id='teenagerTerm'/>
              <label htmlFor='teenagerTerm' className='teenagerTerm_label'/>
            </li>
            <li>
              마케팅정보 수신 동의(선택) 
              <input type='checkbox' name='marketingTerm' id='marketingTerm'/>
              <label htmlFor='marketingTerm' className='marketingTerm_label'/>
            </li>
          </ul>
        </div>

        <button className='submitBtn'>
            다음으로  
        </button>
    </form>    
</>
  )
}
