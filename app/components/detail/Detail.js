"use client";
import styles from "./detail.module.scss"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { myContext } from '../Context';
import axios from "axios";

import Loading from "@/app/components/loading/Loading"; //수정)

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';
import { useParams, useRouter, useSearchParams } from "next/navigation";




function Detail() {
	const router = useRouter();
	const [detailItem, setDetailItem] = useState([]);
	const [detailProtPic, setDetailProtPic] = useState([]);
	const [likeCheck, setLikeCheck] = useState(null);
	const [comment, setComment] = useState([]);
	const [loginUserInfo, setLoginUserInfo] = useState([]);
	const [shareActive, setShareActive] = useState(false);
	const [locationActive, setLocationActive] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const kakaoMap = useRef(null);
	const { member, memberLd } = useContext(myContext);
	const shareRef = useRef(null);

	const paramsData = useSearchParams();
	const objKey = paramsData.get("key");

	const kakaoApiKey = process.env.NEXT_PUBLIC_KJSKEY;

	let sKey;
	if (typeof window !== "undefined") {
		const key = sessionStorage.getItem("key");
		if (key) {
			sKey = JSON.parse(sessionStorage.getItem("loginObj")).key;
		} else {
			router.push(`/pages/login?detailNum=${window.location.href}`);
		}
	}

	const detailGet = async () => {
		await axios.get(`/api/member?key=${objKey}`)
			.then(res => {
				setDetailItem(res.data);
			});
	};


	const detailPortPicGet = async () => {
		await axios.get(`/api/portPic?sKey=${objKey}`)
			.then(res => {
				setDetailProtPic(res.data);
			})
	}


	const likeLoad = async () => {
		await axios.get(`/api/detail?sKey=${sKey}&objKey=${objKey}`)
			.then(res => {
				setLikeCheck(res.data);
			})
	}

	//클릭시
	const likeTest = async () => {
		await axios.get(`/api/detail?sKey=${sKey}&objKey=${objKey}`)
			.then(res => {
				if (res.data) {
					axios.post(`/api/detail`, { key: Date.now().toString(), sKey: String(sKey), objKey: String(objKey) })
						.then(res => {
							setLikeCheck(res.data);
							detailGet();
						})

				} else {
					axios.delete(`/api/detail?sKey=${sKey}&objKey=${objKey}`)
						.then(res => {
							setLikeCheck(res.data);
							detailGet();
						})

				}
			})
	}

	const loginUserInfoGet = async () => {
		await axios.get(`/api/member?key=${sKey}`)
			.then(res => {
				setLoginUserInfo(res.data);
			})
	}

	const commentLoad = async () => {
		await axios.get(`/api/comment?objKey=${objKey}`)
			.then(res => {
				setComment(res.data);
			})
	}

	const commentSubmit = async (e) => {
		e.preventDefault();
		setInputValue('');
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hours = date.getHours().toString().padStart(2, "0");
		let minutes = date.getMinutes().toString().padStart(2, "0");
		let time = `${year}.${month}.${day} ${hours}:${minutes}`;

		const formData = new FormData(e.target);
		formData.append("key", Date.now());
		formData.append("time", time)
		formData.append("objKey", objKey)
		formData.append("sKey", JSON.parse(sessionStorage.getItem("loginObj")).key);
		formData.append("nickname", JSON.parse(sessionStorage.getItem("loginObj")).nickname);
		const objData = Object.fromEntries(formData)
		await axios.post(`/api/comment`, objData)
			.then(res => {
				// setComment(res.data)
				commentLoad();
			})
	}

	const commentDel = async (commentItem) => {
		const sel = confirm("정말 삭제하시겠습니까??");
		if (sel) {
			if (sKey === commentItem.sKey) {
				await axios.delete(`/api/comment?key=${commentItem.key}`)
					.then(res => {
						// setComment(res.data)
						commentLoad();
					})
			} else {
				alert("너 누기야~!")
			}
		}
	}


	useEffect(() => {
		commentLoad();
		detailGet();
		detailPortPicGet();
		likeLoad();
		memberLd();
		loginUserInfoGet();
	}, [])


	useEffect(() => {
		likeLoad();
	}, [member])



	const [on, setOn] = useState(Array(2).fill(false));

	const accordionToggle = (index) => {
		const accordion = on.map((item, num) => (num === index ? !item : false))
		setOn(accordion);
	}


	const kakaoShare = () => {
		Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: detailItem[0].nickname,
				description: "여따가 뭐 소개내용?",
				imageUrl: 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
				link: {
					// [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
					mobileWebUrl: window.location.href,
					webUrl: window.location.href,
				},
			},
			social: {
				likeCount: Number(detailItem[0].like), // 스트링은
				commentCount: comment.length,
			},
			buttons: [
				{
					title: '자세히 보기',
					link: {
						mobileWebUrl: window.location.href,
						webUrl: window.location.href,
					},
				}
			],
		});
	}
	const urlCopy = () => {
		const url = window.location.href;
		let dumy = document.createElement("input");
		document.body.appendChild(dumy);
		dumy.value = url;
		dumy.select();
		document.execCommand("copy")
		alert("URL이 클립보드에 복사되었습니다.")
		document.body.removeChild(dumy);
	}


	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js";
		script.async = true;
		script.integrity = "sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8";
		script.crossOrigin = "anonymous";

		document.body.appendChild(script);

		script.onload = () => {
			Kakao.init(kakaoApiKey); // 사용하려는 앱의 JavaScript 키 입력

		};

		return () => {
			document.body.removeChild(script);
		};
	}, []);


	const kakaoMapLoad = () => {
		const script = document.createElement("script");
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			kakao.maps.load(() => {
				const container = kakaoMap.current;
				const options = {
					center: new window.kakao.maps.LatLng(detailItem[0].lat, detailItem[0].lng),
					level: 3,
				};

				const map = new window.kakao.maps.Map(container, options);

				const markerPosition = new window.kakao.maps.LatLng(detailItem[0].lat, detailItem[0].lng);
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
				});

				marker.setMap(map);


				const iwContent = `<div style="padding:5px;">${detailItem[0].nickname}<br><a href="https://map.kakao.com/link/to/${detailItem[0].nickname},${detailItem[0].lat},${detailItem[0].lng}" style="color:blue" target="_blank">길찾기</a></div>`;
				const iwPosition = new window.kakao.maps.LatLng(detailItem[0].lat, detailItem[0].lng);


				const infowindow = new window.kakao.maps.InfoWindow({
					position: iwPosition,
					content: iwContent,
				});

				infowindow.open(map, marker);

			})
		}
	}



	const location = () => {
		setLocationActive(!locationActive)
		kakaoMapLoad();
	}


	// 영역밖 클릭시 모달닫기
	useEffect(() => {
		const domClick = (e) => {
			if (shareRef.current && !shareRef.current.contains(e.target)) {
				setShareActive(false);
			}

		};

		document.addEventListener('click', domClick);

		return () => {
			document.removeEventListener('click', domClick);
		};
	}, []);


	if (!detailItem[0] || !loginUserInfo[0]) {
		return (<Loading />)
	}
	return (
		<section className={styles.detailSection}>
			<div className={styles.top}>
				<button onClick={() => router.push('/pages/list')}><img src="../asset/detail/arrow-gray-icon.svg"></img></button>
				<p>상세보기</p>
			</div>
			<div className={styles.detailIntro}>
				<div className={styles.desinerImg}>
					<img src={detailItem[0].imgUrl}></img>
				</div>
				<div className={styles.introInfoBox}>
					<div className={styles.introInfo}>
						<p className={styles.name}>{detailItem[0].nickname}</p>
						<p className={styles.like}><span>{detailItem[0].like}</span>명이 찜했습니다.</p>
						<p className={styles.info}>{detailItem[0].info}</p>
					</div>
					<div className={styles.introBtn}>
						<ul>
							<li onClick={() => likeTest()}>
								<div>
									<div className={styles.img}>
										<img src={likeCheck ? "../asset/detail/like-icon.svg" : "../asset/detail/like-color-icon.svg"}></img>
									</div>
									<p className={styles.name}>좋아요</p>
								</div>
							</li>
							<li className={styles.kakaoMapBox}>
								<div onClick={() => { location() }}>
									<div className={styles.img}>
										<img src={locationActive ? "../asset/detail/location-icon-color.svg" : "../asset/detail/location-icon.svg"}></img>
									</div>
									<p className={styles.name}>위치</p>
								</div>
								<div className={`${styles.kakaoMapCon} ${locationActive ? styles.on : ""}`}>
									<div ref={kakaoMap} className={styles.map} />
								</div>
							</li>
							<li onClick={() => { alert("준비중입니다.") }}>
								<div>
									<div className={styles.img}>
										<img src="../asset/detail/tel-icon.svg"></img>
									</div>
									<p className={styles.name}>전화</p>
								</div>
							</li>
							<li className={styles.shareBox}>
								<div ref={shareRef} onClick={() => { setShareActive(!shareActive) }}>
									<div className={styles.img}>
										<img src="../asset/detail/share-icon.svg"></img>
									</div>
									<p className={styles.name}>공유</p>
								</div>
								<div className={`${styles.shareCon} ${shareActive ? styles.on : ''}`}>
									<ul>
										<li onClick={() => { kakaoShare() }}>
											<img src="../asset/detail/kakao_logo.svg"></img>
											<p>카카오톡</p>
										</li>
										<li onClick={() => { urlCopy() }}>
											<img src="../asset/detail/copy.svg"></img>
											<p>링크복사</p>
										</li>
									</ul>
								</div>
							</li>

						</ul>
					</div>
				</div>
			</div>

			<div className={styles.designerInfoBox}>
				<p className={styles.title}>미용사 정보</p>
				<ul className={styles.designerInfoCon}>
					<li>
						<p className={styles.left}>영업시간</p>
						<p className={styles.right}>{detailItem[0].dTime1} ~ {detailItem[0].dTime2}</p>
					</li>
					<li>
						<p className={styles.left}>주소</p>
						<p className={styles.right}>{detailItem[0].dAddress}</p>
					</li>
					<li>
						<p className={styles.left}>번호</p>
						<p className={styles.right}>{detailItem[0].dNumber1} - {detailItem[0].dNumber2} - {detailItem[0].dNumber3}</p>
					</li>

				</ul>
			</div>

			<div className={styles.portfolioBox}>
				<p className={styles.title}>포트폴리오</p>
				<div className={styles.portfolioImg}>
					<Swiper
						pagination={{
							type: 'fraction',
						}}
						navigation={true}
						modules={[Pagination]}
						className={styles.mySwiper}
					>
						{
							detailProtPic.map((item, index) => (
								<SwiperSlide key={index} className={styles.swiperSlide}>
									<img src={item.imgUrl}></img>
								</SwiperSlide>
							))
						}
					</Swiper>
				</div>
			</div>

			<div className={styles.guideBox}>
				<p className={styles.title}>미용안내</p>
				<ul>
					<li onClick={() => accordionToggle(0)}>
						<p>안내사항</p>
						<div className={on[0] ? styles.on : ""}>{detailItem[0].dDesc}</div>
					</li>
					<li onClick={() => accordionToggle(1)}>
						<p>가격표</p>
						<div className={on[1] ? styles.on : ""}>{detailItem[0].dPrice}</div>
					</li>
				</ul>
			</div>

			<div className={styles.commentBox}>

				<form onSubmit={(e) => { commentSubmit(e) }}>
					<div className={styles.left}>
						<div className={styles.writerImgBox}>
							<img src={loginUserInfo[0].imgUrl}></img>
						</div>
						<p className={styles.writerName}>{loginUserInfo[0].nickname}</p>
					</div>
					<div className={styles.right}>
						<input value={inputValue} type="text" name="text" required onChange={(e) => { setInputValue(e.target.value) }}></input>
						<button>등록</button>
					</div>

				</form>

				<p className={styles.title}>문의하기 {comment.length}개</p>
				<ul>
					{
						comment.map((commentItem, index) => (
							<li key={index}>
								<div className={styles.left}>
									{
										member.filter(item => item.key == commentItem.sKey).map((obj, index) => (<img key={index} src={obj.imgUrl}></img>))
									}
								</div>
								<div className={styles.right}>
									<div className={styles.authorBox}>
										<div className={styles.left}>
											<p className={`${styles.nickName} ${objKey === commentItem.sKey ? styles.writer : ""}`}>{commentItem.nickname}</p>
											<span className={styles.time}>{commentItem.time}</span>
										</div>
										<div className={styles.right}>
											<p onClick={() => commentDel(commentItem)} className={styles.delete}>삭제하기</p>
										</div>
									</div>
									<div className={styles.comment}>
										<p>{commentItem.text}</p>
									</div>
								</div>
							</li>
						))
					}
				</ul>
			</div>

		</section>
	)
}

export default Detail