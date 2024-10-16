import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './products.module.css'
import Container from '../../Components/Container/Container'
import Loader from './../../Components/Loader/Loader';
function Products() {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const categoryId = id ?? "66fb864941aba231158e3b4d";
    const [loader,setLoader]=useState(false);
    const getProducts = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${import.meta.env.VITE_API}/products/category/${categoryId}`);
            console.log(response.data);
            setProducts((response.data.products) ? response.data.products : []);
        } catch (e) {
            console.log(e)
            setProducts(['There are no products to show']);
        }finally{
            setLoader(false);
        }
    }
    useEffect(() => {
        getProducts();
    }, [id])

    return (
        <Container>
            <div className={styles.products}>
            {loader && <Loader />}
                {
                    products.length === 0 ? (
                        <p>There are no products to show</p>
                    ) : (
                        products.map(product => (
                            product.mainImage ? (
                                <div className={styles.product} key={product.id}>
                                    <div className={styles.displayImage}>
                                        <img src={product.mainImage?.secure_url} alt={product.name} />
                                    </div>
                                    <div className='desc'>
                                        <p>{product.name}</p>
                                        <span>{product.price}$</span>
                                    </div>
                                </div>
                            ) : null
                        ))
                    )
                }
            </div>
        </Container>
    )
    
}

export default Products
