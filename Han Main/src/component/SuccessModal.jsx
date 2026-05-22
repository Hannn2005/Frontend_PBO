


function SuccessModal({ message, onClose }) {

    return (
        <div className="fixed bg-black/50 inset-0 flex justify-center items-center">

            <div className="form__bg bg-white flex flex-col items-center gap-5 p-10">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>
                <div className="text-5xl font-bold ">
                    {message}
                </div>

                <div>
                    <button onClick={() => onClose()} className="button">Close</button>
                </div>

            </div>

        </div>
    )
}


export default SuccessModal