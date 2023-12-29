import Splash from '@/app/components/splash/Splash';
import Intro from '@/app/components/intro/Intro';
import '../../components/intro/styles.scss'; 

export default function page() {
  return (
      <section className='introWrapper'>
        <Splash />

        <div className='headWrapper'>
          <h1>
              <img src='/LeeTest/img/logo.svg' alt='댕냥살롱'/>
          </h1>
          <strong>
              어떤 회원가입을 원하시나요?
          </strong>
        </div>
        <Intro />

      </section>
  )
}
