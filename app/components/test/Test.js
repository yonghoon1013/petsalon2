"use client"
import axios, { Axios } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../Context';

function Test() {
    const {profView} = useContext(myContext);
    const [data, setData] = useState();
    const [view, setView] = useState();


    const testGet = async () => {
        await axios.get(`/api/member`)
        .then(res=>{
            setData(res.data)
        })
    }

    useEffect(()=>{
        // testGet();
    }, [])

    const inputTest = async (e) => {
        e.preventDefault();
        let formData =  new FormData(e.target);
        let objData = Object.fromEntries(formData);
        console.log(objData)

        await axios.post(`/api/member`, objData);
    }

    const deleteTest = async (e) => {
        e.preventDefault();
        await axios.delete(`/api/member?id=${"hmmm"}&password=${"12345"}`);
    }

    const modifyTest = async (e) => {
        e.preventDefault();
        await axios.put(`/api/member`, {id: "hmmm", password:"12345", mId:"yessss"});
    }

    const picUpload = async (e) => {
        e.preventDefault();
        const sKey = sessionStorage.getItem("key");
        const formData = new FormData(e.target);
        const objData = Object.fromEntries(formData);
        console.log(objData);
        const fr = new FileReader();
        fr.readAsDataURL(objData.upload);
        fr.onload = (e) => {
            axios.put(`/api/profPic`, {key: sKey, imgUrl: e.target.result});
        };
    }

    // if(!data) return <>로딩중</>
    return (
    <section>
        <div>
            <form onSubmit={inputTest}>
                <input name='id'/>
                <input name='password'/>
                <input name='desc'/>
                <button>넣기테스트</button>
            </form>
            <button onClick={deleteTest}>지우기테스트</button>
            <button onClick={modifyTest}>수정테스트</button>
        </div>
        <div>
            <form onSubmit={picUpload}>
                <input name='upload' type='file' onChange={(e)=>{
                    const file = e.target.files[0];
                    file && setView(URL.createObjectURL(file))
                }}/>
                <button>저장</button>
            </form>
            <img src={view}></img>
            <img src={profView}></img>
        </div>
    </section>
    )
}

export default Test