"use client"
<<<<<<< HEAD
import React, { useContext } from 'react'
import styles from './mypage.module.scss'
import { myContext } from '../Context'

function Mypage() {
  const {profView} = useContext(myContext);

  return (
    <section className={styles.mypageSec}>
      <div className={styles.profile}>
        <div className={styles.title}>마이페이지</div>
        <div className={styles.titleBox}>
          <figure className={styles.profPic}>
            <img src={profView}/>
          </figure>
          <div className={styles.profName}><strong>김아무개</strong><button className={styles.nameSett}><figure><img src='../asset/mypage/pensil.png'/></figure></button></div>          
          <span className={styles.profEmail}>sdfgsf@naver.com</span>         
          <p className={styles.profDesc}>설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들</p>         
        </div>
=======
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './mypage.module.scss'
import { myContext } from '../Context'
import axios from 'axios';

function Mypage() {
  const {portLd, portPic, setPortPic} = useContext(myContext);
  const [data, setData] = useState([]);
  const [memView, setMemView] = useState([]);
  const [view, setView] = useState([]);
  const [mode, setMode] = useState("list");
  const [infoMode, setInfoMode] = useState("list");
  const [picMode, setPicMode] = useState("list");
  const memMdProf = useRef([]);
  const memMdNickname = useRef([]);
  const memMdPassword = useRef([]);
  const memMdInfo = useRef([]);
  const infMdDesc = useRef([]);
  const infMddPrice = useRef([]);
  const infMddTime1 = useRef([]);
  const infMddTime2 = useRef([]);
  const infMddAddress = useRef([]);
  const infMddNumber1 = useRef([]);
  const infMddNumber2 = useRef([]);
  const infMddNumber3 = useRef([]);
  
  const dataLd = async () => {
    const sKey = sessionStorage.getItem("key");
    await axios.get(`/api/member?key=${sKey}`)
    .then(res=>{
      setData(res.data);
      memMdNickname.current.value = res.data[0].nickname;
      memMdPassword.current.value = res.data[0].nickname;
      memMdInfo.current.value = res.data[0].nickname;
      infMdDesc.current.value = res.data[0].dDesc;
      infMddPrice.current.value = res.data[0].dPrice;
      infMddTime1.current.value = res.data[0].dTime1;
      infMddTime2.current.value = res.data[0].dTime2;
      infMddAddress.current.value = res.data[0].dAddress;
      infMddNumber1.current.value = res.data[0].dNumber1;
      infMddNumber2.current.value = res.data[0].dNumber2;
      infMddNumber3.current.value = res.data[0].dNumber3;
      });
  };

  const profUpload = async (e) => {
		e.preventDefault();
		const sKey = sessionStorage.getItem("key");
		const formData = new FormData(e.target);
		const objData = Object.fromEntries(formData);
    if (objData.upload.size == 0) {
      axios.put(`/api/infoModify/${sKey}`, { key: sKey, imgUrl: e.target.oldProf.value, item: objData})
      .then(res=>{
        setData(res.data);
      });
    } else {
      const fr = new FileReader();
      fr.readAsDataURL(objData.upload);
      fr.onload = (e) => {
        axios.put(`/api/infoModify/${sKey}`, { key: sKey, imgUrl: e.target.result, item: objData})
        .then(res=>{
          setData(res.data);
        });
      };
    }
    setMode("list");
	}



  const portPicUpload = async (e) => {
    e.preventDefault();
    const sKey = sessionStorage.getItem("key");
    const formData = new FormData(e.target);
    formData.append("key", Date.now());
    formData.append("sKey", sKey);
    const objData = Object.fromEntries(formData);
    const fr = new FileReader();
    fr.readAsDataURL(objData.upload);
    fr.onload = async (e) => {
      axios.post(`/api/portPic`, {item: objData, imgUrl: e.target.result})
      .then(res=>{
        setPortPic(res.data);
      });
      setPicMode("list");
    }
  }

  const infoModify = async (e) => {
    e.preventDefault();
    const sKey = sessionStorage.getItem("key");
    const formData = new FormData(e.target);
    formData.append("key", sKey);
    const objData = Object.fromEntries(formData);

    await axios.put(`/api/infoModify`, objData)
    .then(res=>{
      setData(res.data);
      // e.target.dDesc.value = res.data[0].dDesc;
      // e.target.dPrice.value = res.data[0].dPrice;
      // e.target.dTime1.value = res.data[0].dTime1;
      // e.target.dTime2.value = res.data[0].dTime2;
      // e.target.dAddress.value = res.data[0].dAddress;
      // e.target.dNumber1.value = res.data[0].dNumber1;
      // e.target.dNumber2.value = res.data[0].dNumber2;
      // e.target.dNumber3.value = res.data[0].dNumber3;
    })
  };

  const portDel = async (e, item) => {
    e.preventDefault();
    const sKey = sessionStorage.getItem("key");
    await axios.delete(`/api/portPic?key=${item.key}&sKey=${sKey}`)
    .then(res=>{
      setPortPic(res.data)
    })
  }

  useEffect(()=>{
    dataLd();
    portLd();
  }, [])

  if(!data[0]) return <>로딩중</>

  return (
    <section className={styles.mypageSec}>

      <div className={styles.profile}>
        <div className={styles.title}>
          <strong>마이페이지</strong>
          <button className={styles.memSetting} onClick={()=>{setMode("modify")}}>
            <figure><img src='../asset/mypage/setting.png'/></figure>
          </button>
        </div>
        <div className={`${styles.titleBox} ${mode == "list" ? styles.active : ""}`}>
          <figure className={styles.profPic}>
            <img src={data[0].imgUrl}/>
          </figure>
          <div className={styles.profName}>
            <strong>{data[0].nickname}</strong>
            <button className={styles.nameSett}>
              <figure><img src='../asset/mypage/pensil.png'/></figure>
            </button>
          </div>          
          <span className={styles.profEmail}></span>         
          <p className={styles.profDesc}>{data[0].info}</p>         
        </div>
        <form onSubmit={profUpload} className={`${styles.titleBoxMod} ${mode == "modify" ? styles.active : ""}`}>
          <input ref={memMdProf} name='upload' type='file' onChange={(e)=>{
            e.preventDefault();
            let pic = e.target.files[0];
            pic && setMemView(URL.createObjectURL(pic));
          }}/>
          <figure className={styles.profPic}>
            <img src={memView}/>
          </figure>
          <input value={data[0].imgUrl} name='oldProf'/>
          <input ref={memMdNickname} name="nickname" type='text'/>
          <input ref={memMdPassword} name='password' type='password'/>
          <input name='password2' type='password'/>
          <input ref={memMdInfo} name="info"/>
          <button>저장</button>
          <button onClick={()=>{setMode("list")}} type='button'>취소</button>
        </form>
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
        <div className={styles.working}>
          <div><strong>영업시작</strong></div>
          <div><input type='checkbox'/></div>
        </div>
      </div>
<<<<<<< HEAD
      <div className={styles.workpics}>
        <div className={styles.title}>나의 포트폴리오</div>
        <div className={styles.pics}>
          <ul className={styles.picBox}>
            <li className={styles.picAdd}>
              <figure><img/></figure>
            </li>
            <li>
              <figure><img/></figure>
            </li>
            <li>
              <figure><img/></figure>
            </li>
            <li>
              <figure><img/></figure>
            </li>
            <li>
              <figure><img/></figure>
            </li>
            <li>
              <figure><img/></figure>
            </li>
            <li>
              <figure><img/></figure>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <strong>나의 영업정보</strong>
          <button className={styles.infoSetting}>
            <figure><img src='../asset/mypage/setting.png'/></figure>
          </button>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.dDesc}>
            <span>안내사항</span>
            <span>설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들</span>
          </div>
          <div className={styles.dPrice}>
            <span>가격정보</span>
            <span>설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들설명들</span>
          </div>
          <div className={styles.dTime}>
            <span>영업시간</span>
            <span>21:23 ~ 13:42</span>
          </div>
          <div className={styles.dAddress}>
            <span>주소</span>
            <span>어디어디어쩌구저쩌구</span>
          </div>
          <div className={styles.dNumber}>
            <span>H.P</span>
            <span>010-1111-2222</span>
          </div>
        </div> 
      </div>
=======

      <div className={styles.workpics}>
        <div className={styles.title}>나의 포트폴리오</div>
        <div className={styles.pics}>
          <ul className={`${styles.picBox} ${picMode == "list" ? styles.active : ""}`}>
            <li onClick={()=>{setPicMode("write")}} className={styles.picAdd}>
              <figure><img/></figure>
            </li>
            {
              portPic.map(item=>(
                <li>
                  <figure><img src={item.imgUrl}/><button onClick={(e)=>{portDel(e, item)}}>삭제</button></figure>
                </li>
              ))
            }
          </ul>
          <form onSubmit={portPicUpload} className={`${styles.picBoxModi} ${picMode == "write" ? styles.active : ""}`}>
            <figure><img src={view}/></figure>
            <input required onChange={(e)=>{
              e.preventDefault();
              const pic = e.target.files[0];
              pic && setView(URL.createObjectURL(pic));
            }}
            name='upload' type='file'/>
            <button>업로드</button>
            <button onClick={()=>{setPicMode("list")}} type='button'>취소</button>
          </form>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <strong>나의 영업정보</strong>
          <button className={styles.infoSetting} onClick={()=>{setInfoMode("modify")}}>
            <figure><img src='../asset/mypage/setting.png'/></figure>
          </button>
        </div>
        <div className={`${styles.infoBox} ${infoMode == "list" ? styles.active : ""}`}>
          <div className={styles.dDesc}>
            <span>안내사항</span>
            <span>{data[0].dDesc}</span>
          </div>
          <div className={styles.dPrice}>
            <span>가격정보</span>
            <span>{data[0].dPrice}</span>
          </div>
          <div className={styles.dTime}>
            <span>영업시간</span>
            <span>{`${data[0].dTime1} ~ ${data[0].dTime2}`}</span>
          </div>
          <div className={styles.dAddress}>
            <span>주소</span>
            <span>{data[0].dAddress}</span>
          </div>
          <div className={styles.dNumber}>
            <span>H.P</span>
            <span>{`${data[0].dNumber1} - ${data[0].dNumber2} - ${data[0].dNumber3}`}</span>
          </div>
        </div>
        <form onSubmit={infoModify} className={`${styles.infoBoxModi} ${infoMode == "modify" ? styles.active : ""}`}>
          <div className={styles.dDesc}>
            <span>안내사항</span>
            <input ref={infMdDesc} name='dDesc'/>
          </div>
          <div className={styles.dPrice}>
            <span>가격정보</span>
            <input ref={infMddPrice} name='dPrice'/>
          </div>
          <div className={styles.dTime}>
            <span>영업시간</span>
            <input ref={infMddTime1} type='time' name='dTime1'/>
            <input ref={infMddTime2} type='time' name='dTime2'/>
          </div>
          <div className={styles.dAddress}>
            <span>주소</span>
            <input ref={infMddAddress} name='dAddress'/>
          </div>
          <div className={styles.dNumber}>
            <span>H.P</span>
            <input ref={infMddNumber1} maxLength={3} name='dNumber1'/>
            <input ref={infMddNumber2} maxLength={4} name='dNumber2'/>
            <input ref={infMddNumber3} maxLength={4} name='dNumber3'/>
          </div>
          <button onClick={()=>{setInfoMode("list")}}>수정완료</button>
          <button type='button' onClick={()=>{setInfoMode("list")}}>취소</button>
        </form>
      </div>

>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    </section>
  )
}

export default Mypage