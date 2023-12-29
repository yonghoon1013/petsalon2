"use client"
import axios, { Axios } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../Context';

function Test() {
	const { memberLd, profView, member, favoriteLd, Fav } = useContext(myContext);
	const [view, setView] = useState([]);
	const [filtered, setFiltered] = useState([]);

	const making = async () => {
		const l2 = member.filter(obj=>{
			return (Fav.some(item => item.objKey == obj.key));
		});
		setFiltered(l2);
	}

	useEffect(() => {
		memberLd();
		favoriteLd();
	}, []);

	useEffect(()=>{
		making();
	}, [member, Fav]);

	const inputTest = async (e) => {
		e.preventDefault();
		const sKey = sessionStorage.getItem("key");
		let formData = new FormData(e.target);
		formData.append("key", sKey);
		let objData = Object.fromEntries(formData);
		await axios.post(`/api/test`, objData)
		.then(res=>{
			console.log(res.data)
		})
	}

	const deleteTest = async (e) => {
		e.preventDefault();
		await axios.delete(`/api/bomb?id=${"hmmm"}&password=${"12345"}`);
	}

	const modifyTest = async (e) => {
		e.preventDefault();
		await axios.put(`/api/member`, { id: "hmmm", password: "12345", mId: "yessss" });
	}

	const picUpload = async (e) => {
		e.preventDefault();
		const sKey = sessionStorage.getItem("key");
		const formData = new FormData(e.target);
		const objData = Object.fromEntries(formData);
		const fr = new FileReader();
		fr.readAsDataURL(objData.upload);
		fr.onload = (e) => {
			axios.put(`/api/profPic`, { key: sKey, imgUrl: e.target.result });
		};
	}

	return (
		<section>
			<div>
				<form onSubmit={inputTest}>
					<input name='id' />
					<input name='password' />
					<input name='desc' />
					<button>넣기테스트</button>
				</form>
				<button onClick={deleteTest}>지우기테스트</button>
				<button onClick={modifyTest}>수정테스트</button>
			</div>
			<div>
				<form onSubmit={picUpload}>
					<input name='upload' type='file' onChange={(e) => {
						const file = e.target.files[0];
						file && setView(URL.createObjectURL(file))
					}} />
					<button>저장</button>
				</form>
				<img src={view}></img>
				<img src={profView}></img>
			</div>
			{
				filtered.map(item => (
					<>
						<p>{item.id}</p>
						<p>{item.nickname}</p>
					</>
				))
			}
		</section>
	)
}

export default Test