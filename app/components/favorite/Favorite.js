"use client";
import Footer from "@/app/components/footer/Footer"; //수정)
import Loading from "@/app/components/loading/Loading"; //수정)
import styles from "./style.module.scss"
import React, { useContext, useEffect, useRef, useState } from "react";
import { myContext } from "../Context";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Favorite() {
	const { memberLd, profView, member, favoriteLd, Fav, lgChecking } = useContext(myContext);
	const [designers, setDesigners] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const navi = useRouter();

	const test = useRef(null);

	let sKey;
    if (typeof window !== "undefined") {
        sKey = JSON.parse(sessionStorage.getItem("loginObj")).key;
    }

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
		const l2 = member.filter(obj => {
			return (Fav.some(item => item.objKey == obj.key));
		});
		setFiltered(l2);
	}

	useEffect(() => {
		memberLd();
		favoriteLd();
		lgChecking();
	}, []);

	useEffect(() => {
		making();
	}, [member, Fav]);

	useEffect(()=>{
		more();
	},[filtered])
	

	const goDetail = (objKey) => {
		navi.push(`/pages/detail?key=${objKey}`)
	}

	const removeDesigner = async (objKey) => {
		await axios.delete(`/api/favorite?objKey=${objKey}&sKey=${sKey}`)
			.then(res => {
				favoriteLd();
			})
	};

	const more = () =>{
		if(filtered.length > 0){
			test.current.style.display = "none"
		} else{
			test.current.style.display = "block"
		}
	}

	if(!member) return (<Loading/>) 
	return (
		<section className={styles.favoriteSection}>
			<div className={styles.titleWrapper}>
				<h2 className={styles.title}>내 관심 미용</h2>
				<div className={styles.icon}>
					<button className={styles.serch}>
						<img src="../serch.png"></img>
					</button>
					<button className={styles.notice}>
						<img src="../notice.png"></img>
					</button>
				</div>
			</div>

			<div ref={test} className={styles.mainWrapper}>
				<p className={styles.text}>
					관심 등록한
					<br />
					디자이너 & 미용실이 없네요.
				</p>
				<button onClick={()=>{navi.push(`/pages/list`)}} className={styles.more}>미용 둘러보기</button>
			</div>

			<ul className={styles.favoriteList}>
				{
					filtered.map((obj, index) => (
						<li onClick={() => { goDetail(obj.key) }} key={index}>
							<button
								onClick={(event) => {
									event.stopPropagation();
									removeDesigner(obj.key);
								}}
								className={styles.closeButton}
							></button>
							<div className={styles.imgBox}>
								<img src={obj.imgUrl} alt={obj.nickname} />
							</div>
							<div className={styles.wrap}>
								<p className={styles.name}>{obj.nickname}</p>
								<span className={styles.grade}>
									<StarIcon className={styles.starIcon} />
									{designers.grade}{obj.like}
								</span>
								<p className={styles.hours}>{obj.dTime1} ~ {obj.dTime2}</p>

							</div>
						</li>
					))
				}
			</ul>
            {/* home around myList myPage  */}
            <Footer currentLink = 'myList'/>
		</section>
	);
}

export default Favorite;
