import '../components/InfoComponent.css'
import InfoCardComponent from '../components/InfoCardComponent';
const InfoComponent = (props) => {
    const {data, show} = props
    return (
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className='info-container'>
                       <InfoCardComponent data={data} show={show}/>
                    </div>
                </div>
                <div className="col-2">

                </div>
            </div>
        </div>
    )
}

export default InfoComponent;