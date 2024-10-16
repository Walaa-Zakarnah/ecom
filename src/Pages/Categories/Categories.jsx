import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './categories.module.css'
import Container from '../../Components/Container/Container.jsx';
import { useNavigate } from 'react-router-dom';
import Loader from './../../Components/Loader/Loader';
function Categories() {
  const [categories, setCategories] = useState([])
  const [loader, setLoader] = useState(false);
  const getCategories = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/categories?limit=6`);
      const res = data.categories;
      setCategories(res);
    } catch (err) {
      <p>{err}</p>
    }finally{
      setLoader(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  const navigate = useNavigate();
  const handleCategoryClicked = (categoryId) => {
    console.log(categoryId);
    navigate(`/products/category/${categoryId}`);
  }

  return (

    <Container>
      <Swiper className={styles.middle}
        spaceBetween={5}
        slidesPerView={6}
        autoplay={{ delay: 4000 }}
        speed={600}
        grabCursor={true}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 5 },
          420: { slidesPerView: 2, spaceBetween: 10 },
          520: { slidesPerView: 3, spaceBetween: 15 },
          720: { slidesPerView: 4, spaceBetween: 20 },
          900: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {
          categories && categories.map((category) => {
            return (
              <SwiperSlide key={category.id}>
                <div className={styles.category} onClick={() => { handleCategoryClicked(category._id) }} >
                  <img src={category.image.secure_url} alt={category.name} height={200} />
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      {loader && <Loader />}
    </Container>
  )
}

export default Categories
