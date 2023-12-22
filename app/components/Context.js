"use client"
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const myContext = createContext();

function Context({children}) {
  const [member, setMember] = useState([]);
  const [Fav, setFav] = useState([]);
  const [portPic, setPortPic] = useState([]);

  const memberLd = async () => {
    await axios.get(`/api/list`)
    .then(res=>{
      setMember(res.data);
    });
  };

  const favoriteLd = async () => {
		await axios.get(`/api/favorite`)
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

  useEffect(()=>{
    memberLd();
  }, []);

  const alertBoard = (txt = '') => {
		Swal.fire({
		  text: txt,
		  confirmButtonColor: '#FF8500',
		  confirmButtonText: '확인',
		})
	}//alertBoard() 함수정의

  return (
    <myContext.Provider value={{member, memberLd, favoriteLd, Fav, portLd, portPic, setPortPic, alertBoard}}>
        {children}
    </myContext.Provider>
  )
}

export default Context
