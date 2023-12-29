"use client";

import axios from "axios";
import styles from "./page.module.scss";

import React, { useEffect, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// // import required modules
// import { Pagination } from "swiper/modules";

export default function Home() {
    const [designers, setDesigners] = useState([]);
    const StarIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path d="M12 2l2.6 8.4h8.4l-7 5.4 2.6 8.4-7-5.4-7 5.4 2.6-8.4-7-5.4h8.4z" />
        </svg>
    );

    useEffect(() => {
        const famousDesigners = [
            {
                id: 1,
                name: "김한성 디자이너",
                grade: "5",
                type: "소형견,중형견,고양이",
                hours: "12:00~20:00",
                img: "./kimhansung.png", // 이미지 경로 설정 예시
            },
            {
                id: 2,
                name: "이은성 디자이너",
                grade: "5",
                type: "소형견,중형견,고양이",
                hours: "12:00~20:00",
                img: "./leeeunsung.png", // 이미지 경로 설정 예시
            },
            {
                id: 3,
                name: "김은지 디자이너",
                grade: "5",
                type: "소형견,중형견,고양이",
                hours: "12:00~20:00",
                img: "./kimenjii.png", // 이미지 경로 설정 예시
            },
            // 다른 디자이너들을 추가해주세요
        ];
        setDesigners(famousDesigners);
    }, []);

    function KakaoMap({ lat, lng, setMap, draggable, zoomable }) {
        useEffect(() => {
            const script = document.createElement("script");
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${"b03af3865fb67ef929f3f6d0c5b0d83c"}&libraries=services,clusterer&autoload=false`;
            document.head.appendChild(script);

            script.addEventListener("load", () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new window.kakao.maps.LatLng(lat, lng),
                        level: 3,
                    };
                    const map = new window.kakao.maps.Map(container, options);
                    const markerPosition = new kakao.maps.LatLng(lat, lng);

                    // 해당 위치를 사용하여 마커 생성
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                    });
                    marker.setMap(map); // 지도에 마커 표시
                    map.setDraggable(draggable);
                    // zoomable 값에 따라 지도의 확대 기능을 설정
                    map.setZoomable(zoomable);
                    setMap(map); // setMap 함수를 사용하여 map 상태를 설정
                });
            });
        }, [lat, lng, setMap, draggable, zoomable]);
        return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
    }

    const geo = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <section className={styles.main}>
            <div className={styles.titWrapper}>
                <span className={styles.location}>
                    <img src="./spot.png"></img>
                    <p className="name">역삼동</p>
                    <span className={styles.arrow}>
                        <img src="./bottom.png"></img>
                    </span>
                </span>
                <div className={styles.icon}>
                    <button className={styles.serch}>
                        <img src="../serch.png"></img>
                    </button>
                    <button className={styles.notice}>
                        <img src="../notice.png"></img>
                    </button>
                </div>
            </div>
            <div className="addWrapper">{/* slide 삽입예정 오류 문제*/}</div>

            <h2 className={styles.title}>오늘의 인기 디자이너</h2>
            <div className={styles.famousWrapper}>
                <ul className={styles.famousList}>
                    {designers.map((designer, index) => (
                        <li key={index}>
                            <img src={designer.img} alt={designer.name} />
                            <div className={styles.wrap}>
                                <p className={styles.name}>{designer.name}</p>
                                <span className={styles.grade}>
                                    <StarIcon className="starIcon" />
                                    {designers.grade}
                                    {designer.grade}
                                </span>
                                <p className={styles.type}>{designer.type}</p>
                                <p className={styles.hours}>{designer.hours}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
