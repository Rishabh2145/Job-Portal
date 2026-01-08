import Header from "@/components/Header"
export default function Jobs() {
    return (
        <main className="w-full flex h-full bg-white flex-col text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="about" />
                <h1 className="font-bold text-5xl text-white">About Us</h1>
            </div>
            
        </main>
    )
}