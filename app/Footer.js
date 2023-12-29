import React from "react";
import "./components/favorite/style.scss"

function Footer() {
    return (
        <>
            <div className="gnb">
                <ul className="menu">
                    <li className="item">
                        <button className="home">
                            <img src="../home.png"></img>홈
                        </button>
                    </li>
                    <li className="item">
                        <button className="km">
                            <img src="../km.png"></img>내주변
                        </button>
                    </li>
                    <li className="item">
                        <button className="favorite">
                            <img src="../favorite.png"></img>찜
                        </button>
                    </li>
                    <li className="item">
                        <button className="my">
                            <img src="../my.png"></img>마이
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Footer;
