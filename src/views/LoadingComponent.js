import '../assets/css/MagicCircle.scss'
import loadingGif from '../assets/images/loading.gif'
const LoadingComponent = () => {
    return (
        /* <div className="lds-ring"><div></div><div></div><div></div><div></div></div></> */
        <div className="loading">
            <img className="img-fluid" src={loadingGif} alt='loading...' />
        </div>


    )
}
export default LoadingComponent;