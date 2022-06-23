import { useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const EditModalComponent = (props) => {
    const {data ,saveData} = props
    const { register, handleSubmit, watch, formState: { errors } ,reset} = useForm();
    const onSubmit = (dataForm) => {
        let id = data.id
        dataForm = {id,...dataForm}
        saveData(dataForm)
        toast.success("Successfully edited")
    }
    return (
        <>
            <button type="button" className="btn btn-success mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Card</h5>

                            </div>
                            <div className="modal-body">
                                <input className="form-control" defaultValue={data.nameCard} placeholder="Tên thẻ" {...register("nameCard",{required: true})} />
                                {errors.nameCard && <p className="required mt-1">This field is required</p>}
                                <input className="form-control mt-3" defaultValue={data.sign} placeholder="Hệ" {...register("sign")} />
                                <input className="form-control mt-3" defaultValue={data.magicType} placeholder="Loại phép" {...register("magicType")} />
                                <input className="form-control mt-3" defaultValue={data.link_clow} placeholder="Link Image 1" {...register("link_clow",{required:{
                                    value: true,
                                    message: "This field is required"
                                }})
                                    } />
                                {errors.link_clow && <p className="required mt-1">{errors.link_clow.message}</p>}
                                <input className="form-control mt-3" defaultValue={data.link_sakura} placeholder="Link Image 2" {...register("link_sakura",{required:{
                                    value: true,
                                    message: "This field is required"
                                }})} />
                                {errors.link_sakura && <p className="required mt-1">{errors.link_sakura.message}</p>}
                                <input className="form-control mt-3" defaultValue={data.capturedAnime} placeholder="Tập anime xuất hiện" {...register("capturedAnime")} />
                                <input className="form-control mt-3" defaultValue={data.capturedManga} placeholder="Tập manga xuất hiện" {...register("capturedManga")} />
                                <input className="form-control mt-3" defaultValue={data.transformedAnime} placeholder="Tập anime biến đổi" {...register("transformedAnime")} />
                                <input className="form-control mt-3" defaultValue={data.transformedManga} placeholder="Tập manga biến đổi" {...register("transformedManga")} />
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss={errors.nameCard || errors.link_clow || errors.link_sakura ? "" : "modal"} >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditModalComponent