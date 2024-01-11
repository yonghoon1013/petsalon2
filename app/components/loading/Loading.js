import React from 'react'
import './styles.scss'; 

export default function Loading() {
  return (
    <section className='loadingWrapper'>
        <div className='loadingContentsGroup'>
            <ul className='animagion_loading'>
                <li/>
                <li/>
                <li/>
                <li/>
            </ul>
            <strong>
                LOADING
            </strong>
        </div>
    </section>
  )
}
