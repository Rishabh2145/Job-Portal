export default function Contact() {
    return (
        <main>
            <form className="flex flex-col items-between m-4 p-4 my-0 bg-white shadow-md rounded-xl">
                <div className="flex flex-col h-24 justify-center gap-2">
                    <h2 className="text-3xl font-bold">Sends a Message</h2>
                    <p className="text-black/70 text-sm">Nibh dis faucibus proin lacus tristique</p>
                </div>
                <div className="flex flex-col ">
                    <div className="grid grid-cols-2">
                        <label htmlFor="firstName" className="px-2 mx-2 font-bold text-sm">First Name</label>
                        <label htmlFor="lastName" className="px-2 mx-2 font-bold text-sm">Last Name</label>
                    </div>
                    <div className="grid grid-cols-2">
                        <input type="text" id="firstName" placeholder="Your Name" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                        <input type="text" id="lastName" placeholder="Your Last Name" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                    </div>
                    <label htmlFor="email" className="px-2 mx-2 font-bold text-sm">Email Address</label>
                    <input type="email" id="email" placeholder="Your Email Address" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                    <label htmlFor="msg" className="px-2 mx-2 font-bold text-sm">Message</label>
                    <textarea type="text" id="msg" placeholder="Your Message ..." className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                    <input type="submit" value="Send Message" className="text-sm bg-[#309689] text-white p-2 m-2 rounded-lg cursor-pointer hover:bg-[#2a8a7d] w-fit p-3 transition-all duration-300" />
                </div>
            </form>
        </main>
    )
}