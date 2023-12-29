"use client";
import styles from "./list.module.scss";
import React, { useState } from "react";

function List() {
    return (
        <section>
            <div className={styles.topBox}>
                <div className={styles.location}>
                    <p>역삼동</p>
                </div>
            </div>

            <div className={styles.orderBox}>
                <div>
                    <p className={styles.rank}>인기순</p>
                    <p className={styles.space}>거리순</p>
                </div>

                <p>반경 15km</p>
            </div>

            <div className={styles.designerListBox}>
                <ul>
                    <li>
                        <div className={styles.imgBox}>
                            <div>사진</div>
                            <div>사진</div>
                            <div>사진</div>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.info}>
                                <p className={styles.name}>
                                    김한성 디자이너 (2.1Km)
                                </p>
                                <p className={styles.like}>5(45)</p>
                                <span className={styles.time}>
                                    12:00 ~ 20:00
                                </span>
                            </div>
                            <div className={styles.profileImg}></div>
                        </div>
                    </li>

                    <li>
                        <div className={styles.imgBox}>
                            <div>사진</div>
                            <div>사진</div>
                            <div>사진</div>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.info}>
                                <p className={styles.name}>
                                    김한성 디자이너 (2.1Km)
                                </p>
                                <p className={styles.like}>5(45)</p>
                                <span className={styles.time}>
                                    12:00 ~ 20:00
                                </span>
                            </div>
                            <div className={styles.profileImg}></div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={styles.shopListBox}></div>
        </section>
    );
}

export default List;
