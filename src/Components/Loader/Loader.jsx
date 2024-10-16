import style from './loader.module.css'
function Loader() {
    return (
        <div className={style.overlay}>
            <div className={style.loader}>
            </div>
        </div>
    )
}

export default Loader
