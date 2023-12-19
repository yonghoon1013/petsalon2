"use client";
import Link from "next/link";
import styles from "./list.module.scss";
import React, { useContext, useEffect, useState } from 'react';
import {myContext} from '../Context';
import axios from "axios";
// import { useRouter } from "next/navigation";

function List() {

    const {member} = useContext(myContext);
    const [view, setView] = useState([]);


    const portLoading = async () =>{
        await axios.get(`/api/portPic/dd`)
        .then(res=>{
            setView(res.data);
        })
    }


    useEffect(()=>{
        portLoading();
    },[])

    useEffect(()=>{
        // console.log(view);
    },[view])

    console.log(member);
    if(!member) return <>로딩중</>
    return (
        <section>

            <div className={styles.topBox}>
                <div className={styles.location}>
                    <p>역삼동</p>
                </div>
            </div>

            <div className={styles.orderBox}>
                <div>
                    <p className={styles.space}>거리순</p>
                    <p className={styles.rank}>인기순</p>
                </div>

                <p>반경 15km</p>
            </div>
            <div className={styles.designerListBox}>
                <ul>
                    {
                        member.map((item, index) => (
                            <li key={index}>
                                <Link href={`/pages/detail?key=${item.key}`}>
                                <div className={styles.imgBox}>
                                        {
                                            view.filter(obj=>obj.sKey == item.key).map(p=>(
                                                <img src={p.imgUrl}></img>
                                            ))
                                            }
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.info}>
                                    <p className={styles.name}>{item.nickname} (2.1Km)</p>
                                    <p className={styles.like}>0</p>
                                    <span className={styles.time}>{item.dTime1} ~ {item.dTime2}</span>
                                </div>
                                <div className={styles.profileImg}>
                                    <img src={item.imgUrl}></img>
                                </div>
                            </div>
                                </Link>
                        </li>
                        
                        ))
                    }
                </ul>
            </div>


        </section>
    )
}

export default List