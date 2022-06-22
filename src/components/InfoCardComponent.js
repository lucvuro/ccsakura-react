import '../components/InfoCardComponent.css'
import { useEffect, useState } from 'react'
const InfoCardComponent = (props) => {
    const { data, show } = props
    return (
        <div className="row">
            {show && <>
                <div className="col-6 mt-3">
                    <div className="info-container-image-card">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Clow Card</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sakura Card</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"> <img id="clow" src={data.link_clow} /></div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><img id="sakura" src={data.link_sakura} /></div>
                        </div>

                    </div>
                </div>
                <div className="info-container-sumary-card col-6 mt-3">
                    <h2>{data.nameCard}</h2>
                    <ul className="list-group list-group-flush pt-2">
                        <li className="list-group-item-fake">Hệ: {data.sign}</li>
                        <li className="list-group-item-fake">Loại phép: {data.magicType}</li>
                        <li className="list-group-item-fake">Tập anime xuất hiện: {data.capturedAnime}</li>
                        <li className="list-group-item-fake">Tập manga xuất hiện: {data.capturedManga}</li>
                        <li className="list-group-item-fake">Tập anime biến đổi: {data.transformedAnime}</li>
                        <li className="list-group-item-fake">Tập manga biến đổi: {data.transformedManga}</li>
                    </ul>
                </div></>}
        </div>
    )
}

export default InfoCardComponent;