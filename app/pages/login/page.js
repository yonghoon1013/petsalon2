import Login from '@/app/components/login/Login'
import '../../components/login/styles.scss'; 
import React from 'react'

function page() {
  return (
    <section className='loginWrapper'>
        <h1>
            <img src='/LeeTest/img/logo.svg' alt='댕냥살롱'/>
        </h1>

        <div className='descriWrapper'>
          <span>
            세상에서 가장 가까운 반려동물 미용실
          </span>
          <strong>
            지금 시작해보세요!
          </strong>
        </div>

        <Login />
    </section>
  )
}

export default page
