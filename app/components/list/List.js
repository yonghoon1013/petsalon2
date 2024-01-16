"use client";
// import Footer from "@/app/Footer";
import Footer from "@/app/components/footer/Footer"; //수정)
import Loading from "@/app/components/loading/Loading"; //수정)
import Link from "next/link";
import styles from "./list.module.scss";
import React, { useContext, useEffect, useState } from 'react';
import {myContext} from '../Context';
import axios from "axios";
// import { useRouter } from "next/navigation";

function List() {

    const {member, memberLd, location, geolocation, lgChecking} = useContext(myContext);
    const [view, setView] = useState([]);
    const [filterMatcheData,setFilterMatcheData] = useState([]);

    const kakaoApiKey = process.env.NEXT_PUBLIC_KRSKEY;

    const portLoading = async () =>{
        await axios.get(`/api/portPic/dd`)
        .then(res=>{
            setView(res.data);
        });
    }



    const likeRank = async () =>{
        setFilterMatcheData([...filterMatcheData].sort((a, b) => parseInt(b.like) - parseInt(a.like)));
    }

      //현재위치 거리변환 및 계산,
    const locationCompute = async () => {
        if (location && location.latitude && location.longitude) {
            const filteredMatches = member.filter((item) => {
                const distance = getDistanceFromLatLonInKm(location.latitude, location.longitude, item.lat, item.lng);
                return distance <= 15; // 거리가 800m 이내인지 확인
            });

            filteredMatches.sort((a, b) => {
                const distanceA = getDistanceFromLatLonInKm(location.latitude, location.longitude, a.lat, a.lng);
                const distanceB = getDistanceFromLatLonInKm(location.latitude, location.longitude, b.lat, b.lng);
                return distanceA - distanceB;
            });

            setFilterMatcheData(filteredMatches);
            getFormattedAddress( location.latitude, location.longitude);
        }
    }

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구의 반지름 (단위: km)
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // 두 지점 사이의 거리 (단위: km)
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };


    useEffect(()=>{
        geolocation();
        portLoading();
        memberLd();
        lgChecking();
        locationCompute();
    },[])
    
    useEffect(()=>{
        locationCompute();
    },[member])


    const [threeAddr,setThreeAddr] = useState([]);

    const getFormattedAddress = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${kakaoApiKey}`, // 여기에 발급받은 REST API 키를 넣어주세요.
                    },
                }
            );
            if (response.data.documents.length > 0) {
                setThreeAddr(response.data.documents[0].address.region_3depth_name);
            } else {
                setAddress('주소를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('주소를 불러오는 중 오류 발생:', error);
        }
    };




    if(!member && !filterMatcheData) return (<Loading/>) 

    // return (
    //     <Loading/>
    // )
    return (
        <section className={styles.listSection}>

            <div className={styles.topBox}>
                <div className={styles.location}>
                    <p>{threeAddr}</p>
                    <img src="../asset/list/reload.svg" onClick={()=>{geolocation()}}></img>
                </div>
            </div>

            <div className={styles.orderBox}>
                <div>
                    <p onClick={()=>{locationCompute()}} className={styles.space}>거리순</p>
                    <p onClick={()=>{likeRank()}} className={styles.rank}>인기순</p>
                </div>

                <p>반경 15km</p>
            </div>
            <div className={styles.designerListBox}>
                <ul>
                    {
                        filterMatcheData.map((item, index) => (
                            <li key={index}>
                                <Link href={`/pages/detail?key=${item.key}`}>
                                <div className={styles.imgBox}>
                                        {
                                            view.filter(obj=>obj.sKey == item.key).slice(0,3).map((p,index2)=>(
                                                <img key={index2} src={p.imgUrl}></img>
                                            ))
                                            }
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.info}>
                                    <p className={styles.name}>{item.nickname} ({getDistanceFromLatLonInKm(location.latitude, location.longitude, item.lat, item.lng).toFixed(1)} km)</p>
                                    <p className={styles.like}>{item.like}</p>
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

            {/* home around myList myPage  */}
			<Footer currentLink = 'home'/>
        </section>
    )
}

export default List