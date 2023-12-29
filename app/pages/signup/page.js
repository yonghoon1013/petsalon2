import Signup from '@/app/components/signup/Signup'
import '../../components/signup/styles.scss'; 
// import styles from './styles.module.scss';

import React from 'react'

function page() {
  return (
    <section className='signUpWrapper'>
      <Signup/>
    </section>
  )
}

export default page