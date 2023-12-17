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





    // const router = useRouter();

    // const go = (item) =>{
    //     router.push(`/pages/detail/${item.id}`);
    //     console.log(item.id);
    // }


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
            {/* &item=${JSON.stringify(item)} */}
            <div className={styles.designerListBox}>
                <ul>
                    {
                        member.map((item, index) => (
                            <li key={index}>
                                <Link href={`/pages/detail?key=${item.key}`}>
                                <div className={styles.imgBox}>
                                <div>
                                        {
                                            view.filter(obj=>obj.sKey == item.key).map(p=>(
                                                <img src={p.imgUrl}></img>
                                            ))
                                            }
                                </div>
                                {/* <img src={item.portfolio[0]}></img>
                                <img src={item.portfolio[1]}></img>
                                <img src={item.portfolio[2]}></img> */}
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