"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react'

export const myContext = createContext();

function Context({children}) {
  const [member, setMember] = useState([]);
  const [Fav, setFav] = useState([]);
  const [portPic, setPortPic] = useState([]);
  const [location, setLocation] = useState(null);
  const [userMode, setUserMode] = useState("designer");
  const navi = useRouter();

  const lgChecking = () => {
    const key = sessionStorage.getItem("key");
    if (!key) {
      navi.push(`/pages/login`);
      console.log("로그인 하세요");
    }
  };

  const memberLd = async () => {
    await axios.get(`/api/list`)
    .then(res=>{
      setMember(res.data);
    });
  };

  const favoriteLd = async () => {
    const sKey = sessionStorage.getItem("key");
		await axios.get(`/api/favorite?sKey=${sKey}`)
			.then(res => {
				setFav(res.data);
			});
	};

  const portLd = async () =>{
    const sKey = sessionStorage.getItem("key");
    await axios.get(`/api/portPic?sKey=${sKey}`)
    .then(res=>{
      setPortPic(res.data);
    });
  };

  const geolocation = async () => {
    const sKey = JSON.parse(sessionStorage.getItem("loginObj")).key;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
                // 위치 정보 가져오기 성공
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                await axios.put(`/api/list?key=${sKey}&&lat=${latitude}&&lng=${longitude}`)
                .then(res=>{

                })
            },
            (error) => {
                // 위치 정보 가져오기 실패
                console.error('Error getting geolocation:', error);
            }
        );
    }

}



  const alertBoard = (txt = '') => {
		Swal.fire({
		  text: txt,
		  confirmButtonColor: '#FF8500',
		  confirmButtonText: '확인',
      
		})
	}//alertBoard() 함수정의

  return (
    <myContext.Provider value={{member, memberLd, favoriteLd, Fav, portLd, portPic, setPortPic, alertBoard, userMode, lgChecking, location, geolocation}}>
        {children}
    </myContext.Provider>
  )
}

export default Context
