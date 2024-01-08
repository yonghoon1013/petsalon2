"use client"
import axios, { Axios } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../Context';

function Test() {
	const { memberLd, profView, member, favoriteLd, Fav } = useContext(myContext);
	const [view, setView] = useState([]);
	const [filtered, setFiltered] = useState([]);

	const kakaoLogout = () => {
		if (Kakao.Auth.getAccessToken()) {
			Kakao.API.request({
				url: '/v1/user/unlink',
				success: function (response) {

				},
				fail: function (error) {
					console.log(error)
				}
			})
			Kakao.Auth.setAccessToken(undefined)
		}
	}//kakaoLogout() 함수정의

	const kakaoLogin = () => {

		if (!Kakao.isInitialized()) {//초기화(init)이 되있는지 여부에 따라 true, false
			Kakao.init('a9eac40c80c43a51d4280e2f8cbd816f') //초기화는 한 번만 //이미 된 상태에서 또 하면 오류라서 이렇게 함
		}

		//발급받은 키 중 javascript키를 사용해준다.
		Kakao.Auth.login({
			success: function (response) {
				Kakao.API.request({
					url: '/v2/user/me',
					success: async function (response) {
						kakaoLogout();
						console.log(response)

					},//success: async function (response)
					fail: function (error) {
						console.log(error);
					},
				})//Kakao.API.request
			},//success(response)

			fail: function (error) {
				console.log(error);
			},//fail(error)
		})
	}//kakaoLoginBtn() 함수정의



	const making = async () => {
		const l2 = member.filter(obj => {
			return (Fav.some(item => item.objKey == obj.key));
		});
		setFiltered(l2);
	}

	useEffect(() => {
		memberLd();
		favoriteLd();
		kakaoLogin();
	}, []);

	useEffect(() => {
		making();
	}, [member, Fav]);

	const inputTest = async (e) => {
		e.preventDefault();
		const sKey = sessionStorage.getItem("key");
		let formData = new FormData(e.target);
		formData.append("key", sKey);
		let objData = Object.fromEntries(formData);
		await axios.post(`/api/test`, objData)
			.then(res => {
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