"use client";
import styles from "./detail.module.scss"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';
import { useRouter } from "next/navigation";

function Detail() {
    const [on, setOn] = useState(false);
    const router = useRouter();
    
    const [location, setLocation] = useState(null);

    const accordionToggle = () => {
        setOn(!on);
    }

    const geolocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // 위치 정보 가져오기 성공
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    console.log(location);
                },
                (error) => {
                    // 위치 정보 가져오기 실패
                    console.error('Error getting geolocation:', error);
                }
            );
        }

    }

    useEffect(() => {
        geolocation();
    }, [])

    return (
        <section>
            <div className={styles.top}>
                <button onClick={() => router.back()}>뒤로</button>
                <p>상세보기</p>
            </div>

            <div className={styles.detailIntro}>
                <div className={styles.desinerImg}>
                    <div></div>
                </div>
                <div className={styles.introInfoBox}>
                    <div className={styles.introInfo}>
                        <p className={styles.name}>김은지 디자이너</p>
                        <p className={styles.like}><span>35</span>명이 찜했습니다.</p>
                        <p className={styles.info}>모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~모든 ~~~</p>
                    </div>
                    <div className={styles.introBtn}>
                        <ul>
                            <li>
                                <div>
                                    <div className={styles.img}>사진</div>
                                    <p className={styles.name}>좋아요</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className={styles.img}>사진</div>
                                    <p className={styles.name}>위치</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className={styles.img}>사진</div>
                                    <p className={styles.name}>전화</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className={styles.img}>사진</div>
                                    <p className={styles.name}>공유</p>
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
                        <p className={styles.right}>11:00 ~ 22:00</p>
                    </li>
                    <li>
                        <p className={styles.left}>주소</p>
                        <p className={styles.right}>서울 강남 어딘가</p>
                    </li>
                    <li>
                        <p className={styles.left}>번호</p>
                        <p className={styles.right}>010 - 4862 - 0192</p>
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
                        <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
                        <SwiperSlide className={styles.swiperSlide}>Slide 5</SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className={styles.guideBox}>
                <p className={styles.title}>미용안내</p>
                <ul>
                    <li onClick={accordionToggle}>
                        <p>안내사항</p>
                        <div className={on ? styles.on : ""}>
                            [서비스이용전 주의사항]
                            ※ 방문서비스 가능여부, 미용실 방문, 고객직접방문 여부

                            ※ 반려동물의 성향(입질), 사회성, 분리불안, 컨디션, 스트레스 등에 따라 서비스가 중단될 수 있습니다.

                            ※ 털 엉킴이 심하거나 피부 상태가 좋지 않을 경우 서비스 진행이 어렵거나, 추가요금이 발생할 수 있습니다.

                            ※ 주차공간이 없을 경우, 서비스가 불가할 수 있으므로 반드시 고지부탁드립니다.
                            ( 부득이한 주차비 발생시, 주차비는 보호자가 전액 부담합니다. )

                            [ 제공 서비스 ]
                            미용, 미용 + 목욕 여부

                            [ 준비물 안내 ]
                            샴푸, 린스, 대야, 타올, 드라이기,빗위생미용 시 : 발톱깎이, 귀 세정제(귀 클리너), 칫솔, 치약* 펫 매니저가 준비물을 챙겨가지만, 되도록이면 아이가 사용하는 물품, 제품을 사용하는 것이 좀 더 안전합니다.* 양치를 희망하시는 경우 칫솔, 치약을 준비해 주세요!
                            -대형견 : 35kg 이상, 특수견: 15kg 이상은 고객센터에 문의 부탁드립니다.

                            [ 특수견이란? ]
                            - 배들링턴 테리어, 꼬똥드, 비숑, 보더콜리, 사모예드
                        </div>
                    </li>
                    <li>
                        <p>안내사항</p>
                        <div>@@@@@@@@@@sadaslkhdkjas hdkjash dkjsah dkjhaskjd hajksdhkj ashjk@@@@@@@@@@@@@@@@@@@@@@@@@@</div>
                    </li>
                </ul>
            </div>

            <div className={styles.commentBox}>
                <p className={styles.title}>문의하기 35개</p>
                <ul>
                    <li>
                        <div className={styles.left}>
                            <div></div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.authorBox}>
                                <div className={styles.left}>
                                    <p className={styles.nickName}>닉네임</p>
                                    <span className={styles.time}>2023.11.12 12:00</span>
                                </div>
                                <div className={styles.right}>
                                    <p className={styles.update}>수정학디</p>
                                    <p className={styles.delete}>삭제하기</p>
                                </div>
                            </div>
                            <div className={styles.comment}>
                                <p>
                                    저희 애기 애기때부터 미용하던 곳입니다~ ^^ 사장님 너무 친절하시고 좋아요! 앞으로도 믿고 저희 애기 맡길게요~!!
                                </p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={styles.left}>
                            <div></div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.authorBox}>
                                <div className={styles.left}>
                                    <p className={styles.nickName}>닉네임</p>
                                    <span className={styles.time}>2023.11.12 12:00</span>
                                </div>
                                <div className={styles.right}>
                                    <p className={styles.update}>수정학디</p>
                                    <p className={styles.delete}>삭제하기</p>
                                </div>
                            </div>
                            <div className={styles.comment}>
                                <p>
                                    저희 애기 애기때부터 미용하던 곳입니다~ ^^ 사장님 너무 친절하시고 좋아요! 앞으로도 믿고 저희 애기 맡길게요~!!
                                </p>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

        </section>
    )
}

export default Detail