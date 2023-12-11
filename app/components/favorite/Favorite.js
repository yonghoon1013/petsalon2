"use client";
import Footer from "@/app/Footer";
import styles from "./style.scss";
import React, { useEffect, useState } from "react";

function Favorite() {
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

    const [designers, setDesigners] = useState([]);

    useEffect(() => {
        const likeDesigners = [
            {
                id: 1,
                name: "위드펫",
                img: "/like01.png",
                grade: "5",
                type: "소형견,중형견,고양이",
                hours: "12:00~20:00",
            },
            {
                id: 2,
                name: "펫그루밍스튜디오",
                img: "/like02.png",
                grade: "4.9",
                type: "소형견,중형견,고양이,특수견,노령견",
                hours: "11:00~19:00",
            },
        ];

        setDesigners(likeDesigners);
    }, []);

    const removeDesigner = (idToRemove) => {
        const updateDesigners = designers.filter(
            (designer) => designer.id !== idToRemove
        );
        setDesigners(updateDesigners);
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
                {designers.map((designers, index) => (
                    <li key={index}>
                        <img src={designers.img} alt={designers.name} />
                        <div className="wrap">
                            <p className="name">{designers.name}</p>
                            <span className="grade">
                                <StarIcon className="starIcon" />
                                {designers.grade}
                            </span>
                            <p className="type">{designers.type}</p>
                            <p className="hours">{designers.hours}</p>
                            <button
                                onClick={() => removeDesigner(designers.id)}
                                className="closeButton"
                            ></button>
                        </div>
                    </li>
                ))}
            </ul>
            <Footer />
        </>
    );
}

export default Favorite;
