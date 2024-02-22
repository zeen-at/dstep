/** @format */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";

const Page = () => {
	return (
        <div className="bg-white w-screen ">
            <section>
            <div className=" py-10   ">
				<div className="flex justify-between border-b-2 py-4 px-10 lg:px-32">
                        <div>Logo</div>
                        <div className="md:hidden ">
                        <CiMenuBurger />
                        </div>
					<div>
						<ul className="hidden md:flex gap-6 text-sm group ">
							<li className="hover:underline p-2 md:p-1 lg:p-2 "><Link href="/Home">Home</Link></li>
							<li className="hover:underline p-2 md:p-1 lg:p-2"><Link href="/AboutUs">About Us</Link></li>
							<li className="hover:underline p-2 md:p-1 lg:p-2"><Link href="/Products">Products</Link></li>
							<li className="hover:underline p-2 md:p-1 lg:p-2"><Link href="/Pricing">Pricing</Link></li>
							<li className="hover:underline p-2 md:p-1 lg:p-2"><Link href="/Media">Media</Link></li>
							<li className="hover:underline p-2 md:p-1 lg:p-2"><Link href="/ContactUs">Contact Us</Link></li>
							<li className="hover:underline p-2 md:p-1 lg:p-2"><Link href="/Login">Login</Link></li>
							<li  className="bg-blue-950 py-2 lg:p-2 px-4 rounded-md text-white items-center"><Link href="/Register">Register</Link></li>
						</ul>
                        </div>
                        
            </div>
            </div>

            </section>

            {/* hero section */}

            <section className="min-h-screen px-10 lg:px-32 md:py-10">
                <div className="flex gap-10 flex-row">
                        <div className="w-full lg:w-2/5 lg:py-24">
                            <div className="text-5xl leading-relaxed tracking-wide font-bold text-[#1A1A1A]">
                            <h1>Your Premier Online </h1>
                            <h1><span className="text-[#35679F]">Exam</span> Preparation</h1>
                            <h1>Partner</h1>
                            </div>
                            

                            <div className="text-slate-500 py-4 leading-loose">
                                <p>At Examian, we transform exam prep by providing an affordable, inclusive and effective lead edge digital solution to everyone irrespective of location</p>
                            </div>

                            <div className="flex gap-4 py-6">
                                <button type="button" className="bg-[#001F8C] text-white py-2 px-6 rounded-md">Enroll today</button>
                                <button type="button" className="border border-[#001F8C] rounded-md py-2 px-6">Learn more</button>
                            </div>
                        </div>
                    <div className="py-2 w-1/2">
                        <Image src="/examian.png" width={1000} height={500} alt="examian_img" className="object-contain"/>
                    </div>

                </div>

            </section>
            <section>About Us</section>
			

		</div>
	)
}

export default Page
