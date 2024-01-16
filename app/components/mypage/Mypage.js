"use client"
import Footer from "@/app/components/footer/Footer"; //수정)
import Loading from "@/app/components/loading/Loading"; //수정)
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './mypage.module.scss'
import { myContext } from '../Context'
import axios from 'axios';
import { useRouter } from "next/navigation";

function Mypage() {
  const { portLd, portPic, setPortPic, userMode, lgChecking, alertBoard } = useContext(myContext);
  const [data, setData] = useState([]);
  const [memView, setMemView] = useState([]);
  const [view, setView] = useState([]);
  const [mode, setMode] = useState("list");
  const [infoMode, setInfoMode] = useState("list");
  const [picMode, setPicMode] = useState("list");
  const router = useRouter();


  let sKey;
  if (typeof window !== "undefined") {
    sKey = sessionStorage.getItem("key");
  };


  useEffect(() => {
    lgChecking();
  }, [data]);


  const dataLd = async () => {
    await axios.get(`/api/member?key=${sKey}`)
      .then(res => {
        setData(res.data);
        console.log(res.data);
      });
  };

  const profUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objData = Object.fromEntries(formData);
    if (objData.password == objData.password2) {
      if (objData.upload.size == 0) {
        axios.put(`/api/infoModify/${sKey}`, { key: sKey, imgUrl: e.target.oldProf.value, item: objData })
          .then(res => {
            if(res.data == "checkfail") {
              alertBoard("현재 비밀번호를 확인해주세요");
            } else {
              setData(res.data);
            }
          });
      } else {
        const fr = new FileReader();
        fr.readAsDataURL(objData.upload);
        fr.onload = (e) => {
          axios.put(`/api/infoModify/${sKey}`, { key: sKey, imgUrl: e.target.result, item: objData })
            .then(res => {
              if(res.data == "checkfail") {
                alertBoard("현재 비밀번호를 확인해주세요");
              } else {
                setData(res.data);
              }
                });
        };
      }
    } else {
      alertBoard("비밀번호 확인이 틀렸습니다.");
    }
    setMode("list");
  }


  const portPicUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("key", Date.now());
    formData.append("sKey", sKey);
    const objData = Object.fromEntries(formData);
    const fr = new FileReader();
    fr.readAsDataURL(objData.upload);
    fr.onload = async (e) => {
      axios.post(`/api/portPic`, { item: objData, imgUrl: e.target.result })
        .then(res => {
          setPortPic(res.data);
        });
      setPicMode("list");
    }
  }


  const infoModify = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("key", sKey);
    const objData = Object.fromEntries(formData);

    await axios.put(`/api/infoModify`, objData)
      .then(res => {
        setData(res.data);
      });
  };

  const portDel = async (e, item) => {
    e.preventDefault();
    await axios.delete(`/api/portPic?key=${item.key}&sKey=${sKey}`)
      .then(res => {
        setPortPic(res.data)
      })
  }

  const workingChange = async () => {
    if (data[0].working) {
      await axios.put(`/api/working`, { key: sKey, working: false })
        .then(res => {
          setData(res.data);
        });
    } else {
      await axios.put(`/api/working`, { key: sKey, working: true })
        .then(res => {
          setData(res.data);
        });
    };
  };

  useEffect(() => {
    dataLd();
    portLd();
  }, []);

  if (!data[0]) return (<Loading />)
  return (
    <>
      <section className={`footerPlus ${styles.mypageSec} ${userMode == "user" ? styles.active : ""}`}>
        <button onClick={() => {
          sessionStorage.clear();
          router.push(`/pages/login`);
        }}>로그아웃</button>
        <div className={styles.profile}>
          <div className={styles.title}>
            <strong>마이페이지</strong>
            <button className={styles.memSetting} onClick={() => { setMode("modify") }}>
              <figure><img src='../asset/mypage/setting.png' /></figure>
            </button>
          </div>
          <div className={`${styles.titleBox} ${mode == "list" ? styles.active : ""}`}>
            <figure className={styles.profPic}>
              <img src={data[0].imgUrl} />
            </figure>
            <div className={styles.profName}>
              <strong>{data[0].nickname}</strong>
              <button className={styles.nameSett}>
                <figure><img src='../asset/mypage/pensil.png' /></figure>
              </button>
            </div>
            <span className={styles.profEmail}></span>
            <p className={styles.profDesc}>{data[0].info}</p>
          </div>
          <form onSubmit={profUpload} className={`${styles.titleBoxMod} ${mode == "modify" ? styles.active : ""}`}>
            <div className={styles.portInputBox}>
              <input className={styles.portInput} name='upload' type='file' onChange={(e) => {
                e.preventDefault();
                let pic = e.target.files[0];
                pic && setMemView(URL.createObjectURL(pic));
              }} />
              <figure className={styles.profPic}>
                <img src={memView} />
              </figure>
              <input className={styles.tempInput} value={data[0].imgUrl} name='oldProf' />
            </div>
            <div className={styles.infoInputBox}>
              <div className={styles.InputDiv}>
                <p>닉네임</p><input value={data[0].nickname} onChange={(e) => { setData(data.map(item => { item.nickname = e.target.value; return item; })) }} name="nickname" type='text' />
              </div>
              <div className={styles.InputDiv}>
                <p>현재 비밀번호</p><input name='cPassword' type='password' />
              </div>
              <div className={styles.InputDiv}>
                <p>변경할 비밀번호</p><input name='password' type='password' />
              </div>
              <div className={styles.InputDiv}>
                <p>비밀번호 확인</p><input name='password2' type='password' />
              </div>
              <div className={styles.InputDiv}>
                <p>소개</p><textarea className={styles.descInput} value={data[0].info} onChange={(e) => { setData(data.map(item => { item.info = e.target.value; return item; })) }} name="info" />
              </div>
            </div>
            <div className={styles.profModBttnBox}>
              <button className={styles.saveBttn}>저장</button>
              <button className={styles.cancelBttn} onClick={() => { setMode("list") }} type='button'>취소</button>
            </div>
          </form>
          <div className={styles.working}>
            <div><strong>영업시작</strong></div>
            <div className={styles.toggleWrapper}>
              <input checked={data[0].working} onChange={() => { workingChange() }} type='checkbox' id="salesStart" className={styles.checkInput} />
              <label htmlFor="salesStart" className={styles.toggleLabel} />
            </div>
          </div>
        </div>

        <div className={styles.workpics}>
          <div className={styles.title}>나의 포트폴리오</div>
          <div className={styles.pics}>
            <ul className={`${styles.picBox} ${picMode == "list" ? styles.active : ""}`}>
              <li onClick={() => { setPicMode("write") }} className={styles.picAdd}>
                <span class="material-symbols-outlined">add</span>
              </li>
              {
                portPic.map(item => (
                  <li className={styles.addedPicsBox}>
                    <figure className={styles.addedPics}>
                      <img src={item.imgUrl} />
                      <span onClick={(e) => { portDel(e, item) }} class="material-symbols-outlined">delete</span>
                    </figure>
                  </li>
                ))
              }
            </ul>
            <form onSubmit={portPicUpload} className={`${styles.picBoxModi} ${picMode == "write" ? styles.active : ""}`}>
              <div className={styles.inputBox}>
                <figure><img src={view} /></figure>
                <input required onChange={(e) => {
                  e.preventDefault();
                  const pic = e.target.files[0];
                  pic && setView(URL.createObjectURL(pic));
                }}
                  name='upload' type='file' />
              </div>
              <div className={styles.bttnBox}>
                <button>업로드</button>
                <button onClick={() => { setPicMode("list") }} type='button'>취소</button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.title}>
            <strong>나의 영업정보</strong>
            <button className={styles.infoSetting} onClick={() => { setInfoMode("modify") }}>
              <figure><img src='../asset/mypage/setting.png' /></figure>
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
              <input value={data[0].dDesc} onChange={(e) => { setData(data.map(item => { item.dDesc = e.target.value; return item; })) }} name='dDesc' />
            </div>
            <div className={styles.dPrice}>
              <span>가격정보</span>
              <textarea value={data[0].dPrice} onChange={(e) => { setData(data.map(item => { item.dPrice = e.target.value; return item; })) }} name='dPrice' />
            </div>
            <div className={styles.dTime}>
              <span>영업시간</span>
              <input value={data[0].dTime1} onChange={(e) => { setData(data.map(item => { item.dTime1 = e.target.value; return item; })) }} type='time' name='dTime1' />
              <input value={data[0].dTime2} onChange={(e) => { setData(data.map(item => { item.dTime2 = e.target.value; return item; })) }} type='time' name='dTime2' />
            </div>
            <div className={styles.dAddress}>
              <span>주소</span>
              <input value={data[0].dAddress} onChange={(e) => { setData(data.map(item => { item.dAddress = e.target.value; return item; })) }} name='dAddress' />
            </div>
            <div className={styles.dNumber}>
              <span>H.P</span>
              <div className={styles.hpBox}>
                <input value={data[0].dNumber1} onChange={(e) => { setData(data.map(item => { item.dNumber1 = e.target.value; return item; })) }} maxLength={3} name='dNumber1' />
                <input value={data[0].dNumber2} onChange={(e) => { setData(data.map(item => { item.dNumber2 = e.target.value; return item; })) }} maxLength={4} name='dNumber2' />
                <input value={data[0].dNumber3} onChange={(e) => { setData(data.map(item => { item.dNumber3 = e.target.value; return item; })) }} maxLength={4} name='dNumber3' />
              </div>
            </div>
            <div className={styles.bttnBox}>
              <button onClick={() => { setInfoMode("list") }}>수정</button>
              <button type='button' onClick={() => { setInfoMode("list") }}>취소</button>
            </div>
          </form>
        </div>

      </section>
      <section className={`${styles.mypageSec} ${userMode == "designer" ? styles.active : ""}`}>

        <div className={styles.profile}>
          <div className={styles.title}>
            <strong>마이페이지</strong>
            <button className={styles.memSetting} onClick={() => { setMode("modify") }}>
              <figure><img src='../asset/mypage/setting.png' /></figure>
            </button>
          </div>
          <div className={`${styles.titleBox} ${mode == "list" ? styles.active : ""}`}>
            <figure className={styles.profPic}>
              <img src={data[0].imgUrl} />
            </figure>
            <div className={styles.profName}>
              <strong>{data[0].nickname}</strong>
              <button className={styles.nameSett}>
                <figure><img src='../asset/mypage/pensil.png' /></figure>
              </button>
            </div>
            <span className={styles.profEmail}></span>
            <p className={styles.profDesc}>{data[0].info}</p>
          </div>
          <form onSubmit={profUpload} className={`${styles.titleBoxMod} ${mode == "modify" ? styles.active : ""}`}>
            <div className={styles.portInputBox}>
              <input className={styles.portInput} name='upload' type='file' onChange={(e) => {
                e.preventDefault();
                let pic = e.target.files[0];
                pic && setMemView(URL.createObjectURL(pic));
              }} />
              <figure className={styles.profPic}>
                <img src={memView} />
              </figure>
              <input className={styles.tempInput} value={data[0].imgUrl} name='oldProf' />
            </div>
            <div className={styles.infoInputBox}>
              <div className={styles.InputDiv}>
                <p>닉네임</p><input value={data[0].nickname} onChange={(e) => { setData(data.map(item => { item.nickname = e.target.value; return item; })) }} name="nickname" type='text' />
              </div>
              <div className={styles.InputDiv}>
                <p>비밀번호</p><input value={data[0].password} onChange={(e) => { setData(data.map(item => { item.password = e.target.value; return item; })) }} name='password' type='password' />
              </div>
              <div className={styles.InputDiv}>
                <p>비밀번호 확인</p><input name='password2' type='password' />
              </div>
              <div className={styles.InputDiv}>
                <p>소개</p><input value={data[0].info} onChange={(e) => { setData(data.map(item => { item.info = e.target.value; return item; })) }} name="info" />
              </div>
            </div>
            <div className={styles.profModBttnBox}>
              <button className={styles.saveBttn}>저장</button>
              <button className={styles.cancelBttn} onClick={() => { setMode("list") }} type='button'>취소</button>
            </div>
          </form>
        </div>

      </section>
      {/* home around myList myPage  */}
      <Footer currentLink='myPage' />
    </>
  )
}

export default Mypage