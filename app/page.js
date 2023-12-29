import axios from 'axios'
import styles from './page.module.scss'
import Intro from './components/intro/Intro';
import Splash from './components/splash/Splash';
import "./components/intro/styles.scss"

export default function Home() {

  function KakaoMap({ lat, lng, setMap, draggable, zoomable }) {
    useEffect(() => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${'b03af3865fb67ef929f3f6d0c5b0d83c'}&libraries=services,clusterer&autoload=false`;
      document.head.appendChild(script);

      script.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(lat, lng);

          // 해당 위치를 사용하여 마커 생성
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map); // 지도에 마커 표시
          map.setDraggable(draggable);
          // zoomable 값에 따라 지도의 확대 기능을 설정
          map.setZoomable(zoomable);
          setMap(map); // setMap 함수를 사용하여 map 상태를 설정
        });
      });
    }, [lat, lng, setMap, draggable, zoomable]);
    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
  }

  const geo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }



  return (
    <section className='introWrapper'>
      <Splash />

      <div className='headWrapper'>
        <h1>
            <img src='/LeeTest/img/logo.svg' alt='댕냥살롱'/>
        </h1>
        <strong>
            어떤 회원가입을 원하시나요?
        </strong>
      </div>
      <Intro />

    </section>
)
}
