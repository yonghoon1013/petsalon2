"use client";
import Footer from "@/app/Footer";
import styles from "./style.scss";
import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context";
import axios from "axios";
import { useRouter } from "next/navigation";

function Favorite() {
	const { memberLd, profView, member, favoriteLd, Fav, lgChecking } = useContext(myContext);
	const [designers, setDesigners] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const navi = useRouter();


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

	const making = async () => {
		const l2 = member.filter(obj=>{
			return (Fav.some(item => item.objKey == obj.key));
		});
		setFiltered(l2);
	}

	useEffect(() => {
		memberLd();
		favoriteLd();
		lgChecking();
	}, []);

	useEffect(()=>{
		making();
	}, [member, Fav]);


	const goDetail = (objKey) => {
		navi.push(`/pages/detail?key=${objKey}`)
	}

	const removeDesigner = async (objKey) => {
		const sKey = sessionStorage.getItem("key")
		await axios.delete(`/api/favorite?objKey=${objKey}&sKey=${sKey}`)
		.then(res=>{
			favoriteLd();
		})
	};

	return (
		<>
			<div className="titleWrapper">
				<h2 className="title">내 관심 미용</h2>
				<div className="icon">
					<button className="serch">
						<img src="../serch.png"></img>
					</button>
					<button className="notice">
						<img src="../notice.png"></img>
					</button>
				</div>
			</div>

			<div className="mainWrapper">
				<p className="text">
					관심 등록한
					<br />
					디자이너 & 미용실이 없네요.
				</p>
				<button className="more">인기 있는 미용 둘러보기</button>
			</div>

			<ul className="favoriteList">
				{
					filtered.map((obj, index) => (
						<li onClick={()=>{goDetail(obj.key)}} key={index}>
							<img src={obj.imgUrl} alt={obj.nickname} />
							<div className="wrap">
								<p className="name">{obj.nickname}</p>
								<span className="grade">
									<StarIcon className="starIcon" />
									{designers.grade}
								</span>
								<p className="type">{obj.type}</p>
								<p className="hours">{obj.time}</p>
								<button
									onClick={() => removeDesigner(obj.key)}
									className="closeButton"
								></button>
							</div>
						</li>
					))
				}
			</ul>
			<Footer />
		</>
	);
}

export default Favorite;
