"use client";
import Link from "next/link";
import styles from "./list.module.scss";
import React, { useContext, useEffect, useState } from 'react';
import {myContext} from '../Context';

function List() {

    const {member} = useContext(myContext);

    const [data, setData] = useState([
        {
            "id": 1,
            "name": "김씨",
            "time": "09:00 ~ 18:00",
            "like": "10",
            "tel": "010-1052-9745",
            "addr": "서울 강남 어딘가",
            "lat": "37.5001",
            "lon": "127.029",
            "profileImg": "../asset/list/desiner.png",
            "portfolio": ["../asset/list/test1.png", "../asset/list/test2.png", "../asset/list/test4.png", "../asset/list/test4.png"]
        },
        {
            "id": 2,
            "name": "이씨",
            "time": "09:00 ~ 18:00",
            "like": "8",
            "tel": "010-0213-4785",
            "addr": "서울 강남 어딘가",
            "lat": "37.5035",
            "lon": "127.026",
            "profileImg": "../asset/list/desiner.png",
            "portfolio": ["../asset/list/test4.png", "../asset/list/test1.png", "../asset/list/test3.png", "../asset/list/test3.png"]
        },
        {
            "id": 3,
            "name": "정씨",
            "time": "09:00 ~ 18:00",
            "like": "6",
            "tel": "010-5551-1252",
            "addr": "서울 강남 어딘가",
            "lat": "37.5016",
            "lon": "127.0263",
            "profileImg": "../asset/list/desiner.png",
            "portfolio": ["../asset/list/test3.png", "../asset/list/test2.png", "../asset/list/test4.png", "../asset/list/test4.png"]
        },
        {
            "id": 4,
            "name": "박씨",
            "time": "09:00 ~ 18:00",
            "like": "21",
            "tel": "010-7756-6132",
            "addr": "서울 강남 어딘가",
            "lat": "37.49902",
            "lon": "127.0271",
            "profileImg": "../asset/list/desiner.png",
            "portfolio": ["../asset/list/test2.png", "../asset/list/test1.png", "../asset/list/test3.png", "../asset/list/test4.png"]
        },
        {
            "id": 5,
            "name": "조씨",
            "time": "09:00 ~ 18:00",
            "like": "17",
            "tel": "010-5321-3001",
            "addr": "서울 어딘가",
            "lat": "37.4895",
            "lon": "127.0075",
            "profileImg": "../asset/list/desiner.png",
            "portfolio": ["../asset/list/test3.png", "../asset/list/test1.png", "../asset/list/test4.png", "../asset/list/test2.png"]
        },
        {
            "id": 6,
            "name": "최씨",
            "time": "09:00 ~ 18:00",
            "like": "5",
            "tel": "010-2032-1354",
            "addr": "한국 어딘가",
            "lat": "37.4795",
            "lon": "127.0353",
            "profileImg": "../asset/list/desiner.png",
            "portfolio": ["../asset/list/test2.png", "../asset/list/test3.png", "../asset/list/test1.png", "../asset/list/test4.png"]
        },
    ])

    if(!member) return <>로딩중</>


    console.log(member);

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
                                <Link href={`/pages/detail/${item.id}`}>
                                <div className={styles.imgBox}>
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