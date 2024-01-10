"use client";

import Link from 'next/link';
// import f_s from './styles.module.scss'; // f_s = footer_scss
import './styles.scss'; 

export default function Footer({currentLink = ''}) {

  return (
    <div className={`footerWrapper_only ${currentLink}`}>

        <Link href="/pages/list" className='homeLink'>
            <figure className='linkWrapper'>
                <i className='iconImg'/>
                <figcaption>
                    홈
                </figcaption>
            </figure>
        </Link>
        

        <Link href="/pages/favorite" className='myListLink'>
            <figure className='linkWrapper'>
                <i className='iconImg'/>
                <figcaption>
                    찜
                </figcaption>
            </figure>
        </Link>

        <Link href="/pages/mypage" className='myPageLink'>
            <figure className='linkWrapper'>
                <i className='iconImg'/>
                <figcaption>
                    마이
                </figcaption>
            </figure>
        </Link>

    </div>
  )
}
