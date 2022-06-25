import error_image from '../assets/images/error.png'
import '../components/ErrorComponent.css'
const ErrorComponent = () => {
    return (
        <>
            <div>
                <img src={error_image} class="img-res" alt="Error image" />
            </div>
        </>
    )
}
export default ErrorComponent