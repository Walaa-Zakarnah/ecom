
import Container from '../../Components/Container/Container.jsx';
import casualImage from '../../assets/1.jpg';
import formalImage from '../../assets/2.jpg';

import gymImage from '../../assets/4.jpg';
import manImage from '../../assets/5.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay'; // Import Swiper CSS for autoplay
import { EffectCoverflow, Autoplay } from 'swiper/modules'; // Import Autoplay module

import styles from './home.module.css';

function Home() {
    return (
        <Container className={styles.home}>
        <div className={styles.home}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 20,
                    depth: 0,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                modules={[EffectCoverflow, Autoplay]}
                className="mySwiper">
                <SwiperSlide className={`${styles.card} ${styles.casual}`}  >
                    <img src={casualImage} alt="Casual" height={100} />
                </SwiperSlide>
                <SwiperSlide className={`${styles.card} ${styles.gym}`}  >
                    <img src={manImage} alt="man on a chair modeling"  height={100}/>
                </SwiperSlide>
                <SwiperSlide className={`${styles.card} ${styles.formal}`} >
                    <img src={formalImage} alt="Formal" height={100}/>
                </SwiperSlide>
                <SwiperSlide className={`${styles.card} ${styles.gym}`} >
                    <img src={gymImage} alt="Gym"  height={100}/>
                </SwiperSlide>
            </Swiper>
            </div>
        </Container>
    );
}

export default Home;
