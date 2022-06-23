import { useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const AddModalComponent = (props) => {
    const {addCardToData} = props
    const { register, handleSubmit, watch, formState: { errors } ,reset} = useForm();
    const onSubmit = (data) => {
        reset()
        let id = Math.floor(Math.random() * 5000)
        data = {id,...data}
        addCardToData(data)
        toast.success("Successfully added")
    }
    return (
        <>
            <button type="button" className="btn btn-success btn-lg mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Add +</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Card</h5>

                            </div>
                            <div className="modal-body">
                                <input className="form-control" placeholder="Tên thẻ" {...register("nameCard",{required: true})} />
                                {errors.nameCard && <p className="required mt-1">This field is required</p>}
                                <input className="form-control mt-3" placeholder="Hệ" {...register("sign")} />
                                <input className="form-control mt-3" placeholder="Loại phép" {...register("magicType")} />
                                <input className="form-control mt-3" placeholder="Link Image 1" {...register("link_clow",{required:{
                                    value: true,
                                    message: "This field is required"
                                }})
                                    } />
                                {errors.link_clow && <p className="required mt-1">{errors.link_clow.message}</p>}
                                <input className="form-control mt-3" placeholder="Link Image 2" {...register("link_sakura",{required:{
                                    value: true,
                                    message: "This field is required"
                                }})} />
                                {errors.link_sakura && <p className="required mt-1">{errors.link_sakura.message}</p>}
                                <input className="form-control mt-3" placeholder="Tập anime xuất hiện" {...register("capturedAnime")} />
                                <input className="form-control mt-3" placeholder="Tập manga xuất hiện" {...register("capturedManga")} />
                                <input className="form-control mt-3" placeholder="Tập anime biến đổi" {...register("transformedAnime")} />
                                <input className="form-control mt-3" placeholder="Tập manga biến đổi" {...register("trnasformedManga")} />
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss={errors.nameCard || errors.link_clow || errors.link_sakura ? "" : "modal"}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddModalComponent