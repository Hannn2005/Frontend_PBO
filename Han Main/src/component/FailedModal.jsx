


function FailedModal({ message, onClose }) {


    return (
        <div className="fixed bg-black/50 inset-0 flex justify-center items-center">

            <div className="form__bg bg-white flex flex-col items-center gap-5 p-10">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <div className="text-5xl font-bold ">
                    {message}
                </div>

                <div>
                    <button onClick={()=>onClose()} className="button">Close</button>
                </div>

            </div>

        </div>
    )
}


export default FailedModal