import '../components/InfoCardComponent.css'
import { useEffect, useState} from 'react'
import cursor from '../assets/images/cursor.png'
import EditModalComponent from '../views/EditModalComponent'
const InfoCardComponent = (props) => {
    const { data, show ,setData,saveDataToLocal,showEdit} = props
    const saveDataEdited = (dataEdited) => {
        saveDataToLocal(dataEdited)
    }
    return (
        <div className="row" style={{ cursor: `url(${cursor}), auto` }}>
            {show && <>
                <div className="col-6 mt-5">
                    <div className="info-container-image-card">

                        <div className="image-card">
                            <img className="img-responsive" src={data.link_clow} onMouseEnter={e => e.currentTarget.src = `${data.link_sakura}`}
                                onMouseLeave={e => e.currentTarget.src = `${data.link_clow}`} />
                        </div>

                    </div>
                </div>
                <div className="info-container-sumary-card col-6 mt-5">
                    <h2 style={{ color: 'white' }}>{data.nameCard}</h2>
                    <ul className="list-group list-group-flush pt-2">
                        <li className="list-group-item-fake">Hệ: {data.sign}</li>
                        <li className="list-group-item-fake">Loại phép: {data.magicType}</li>
                        <li className="list-group-item-fake">Tập anime xuất hiện: {data.capturedAnime}</li>
                        <li className="list-group-item-fake">Tập manga xuất hiện: {data.capturedManga}</li>
                        <li className="list-group-item-fake">Tập anime biến đổi: {data.transformedAnime}</li>
                        <li className="list-group-item-fake">Tập manga biến đổi: {data.transformedManga}</li>
                    </ul>
                    {showEdit && <EditModalComponent data={data} saveData={saveDataEdited}/>}
                </div></>}
        </div>
    )
}

export default InfoCardComponent;