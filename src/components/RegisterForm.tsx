import Link from "next/link";

export default function RegisterForm() {
    return (
    <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form className="flex flex-col gap-3">
            <input type="text" placeholder="Artist Name"/>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button className="bg-purple-600 rounded-md text-white font-bold cursor-pointer px-6 py-2">Register</button>

            <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2"> Error message</div>

            <Link className="text-sm mt-3 text-right" href={"/login"}>
              Already have an account? <span className="underline">Login</span>  
            </Link>
        </form>
    </div>
</div>
)
}