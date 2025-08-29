

export default function Confirmation({ open, setOpen, handleAction }: any) {

    return (

        <div>
            <p className="text-center text-3xl font-bold" > Are you sure</p>

            <div className="flex items-center justify-between mt-10" >
                <div className="bg-transparent border-2 border-slate-100 p-2 rounded cursor-pointer" onClick={()=> setOpen(!open)}  >Cancel</div>
                <div className="bg-red-500 text-white border-2 p-2 rounded cursor-pointer" onClick={()=>handleAction()} >Remove</div>
            </div>
        </div>

    )

}