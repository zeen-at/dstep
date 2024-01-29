/** @format */

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import * as d3 from "d3"
import PieChart from "./component/PieChart"

const data = [
	{ name: "Females", value: 12 },
	{ name: "Males", value: 90 },
]

export default function Home() {
	const [formData, setFormData] = useState([])

	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				const res = await axios.get(
					// "http://localhost:3005/report/fetch"
					`${process.env.NEXT_PUBLIC_BASE_URL}/report/fetch`
				)
				setFormData(res?.data?.data.slice(-1))
				console.log(res, "res")
			} catch (error) {
				console.log(error)
			}
		}
		fetchAnalysis()
	}, [])

	return (
		<main
			style={{ backgroundImage: "url(./bg2.png)" }}
			className="min-h-screen overflow-y-scroll lg:h-[1000px] relative"
		>
			{formData &&
				formData.map((item) => (
					<div
						className="absolute w-2/3 lg:w-3/4 md:w-1/2 top-[50px] left-[150px] md:left-[250px]"
						key={item._id}
					>
						<div className="bg-white p-1 px-7 lg:divide-x-2 rounded-sm w-3/4 md:w-full flex flex-col lg:flex-row md:gap-[100px]">
							<div className="flex flex-row text-center items-center">
								<h1 className="md:text-[24px] text-[12px">
									Total enrolled applicants:
								</h1>
								<p className="font-bold text-[#063720] md:text-4xl p-4 text-2xl">
									{Math.round(
										item.totalRegistered *
											(parseFloat(
												item.percentageOfEnrolledParticipants
											) /
												100)
									)}
								</p>
							</div>
							<div className="flex flex-col md:flex-row gap-10 text-center items-center">
								<PieChart
									width={150}
									height={130}
									data={data}
								/>
								<div className="items-center">
									<ul className="marker:text-[#00DDAD] marker:text-2xl list-disc">
										<li>
											Females: {item.femaleApplicants}
										</li>
									</ul>
								</div>
								<div className="items-center">
									<ul className="marker:text-[#063720] marker:text-2xl list-disc">
										<li>Males: {item.maleApplicants}</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Total registered applicants
								</p>
								<p className="font-bold md:text-3xl text-lg">
									{item.totalRegistered}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Percentage of enrolled applicants
								</p>
								<p className="font-bold text-3xl">
									{item.percentageOfEnrolledParticipants}%
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Total registered{" "}
									<span className="text-[#00DDAD]">
										female
									</span>{" "}
									applicants
								</p>
								<p className="font-bold text-3xl">
									{item.femaleApplicants}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Total registered male applicants
								</p>
								<p className="font-bold text-3xl">
									{item.maleApplicants}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									% of registered{" "}
									<span className="text-[#00DDAD]">
										female
									</span>{" "}
									applicants
								</p>
								<p className="font-bold text-3xl">
									{item.percentageOfFemaleApplicants}%
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Total disabled applicants
								</p>
								<p className="font-bold text-3xl">
									{item.totalDisabled}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									% of disabled applicants
								</p>
								<p className="font-bold text-3xl">
									{item.percentageOfDisabled}%
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Total disabled{" "}
									<span className="text-[#00DDAD]">
										females
									</span>{" "}
								</p>
								<p className="font-bold text-3xl">
									{item.disabledFemale}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Total disabled males
								</p>
								<p className="font-bold text-3xl">
									{item.disabledMale}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Number of Digital marketing and CRM +
									Specialization applicants
								</p>
								<p className="font-bold text-3xl">
									{item.marketingApplicants}
								</p>
							</div>
							<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
								<p className="text-[14px]">
									Number of Digital day trading + access to
									funding applicants
								</p>
								<p className="font-bold text-3xl">
									{item.tradingApplicants}
								</p>
							</div>
						</div>
					</div>
				))}
		</main>
		// 	<main className="min-h-screen bg-blue-200 py-10">
		// 		<h1 className="text-4xl font-bold text-center text-blue-950 my-10">
		// 			{" "}
		// 			Report Analysis For DSTEP{" "}
		//   </h1>

		// 		<div className="flex flex-col flex-1 gap-3 md:gap-24 mx-24 sm:flex-row text-center content-center  max-w-full flex-wrap min-h-screen">
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6">
		// 				<div className="text-start">
		// 					Total Registered Applicants
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		// 					Percentage of Registered Applicants
		// 				</div>
		// 				<h1 className="text-2xl">40%</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">Total Male Applicants</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">Total Female Applicants</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		//       Percentage of Female Applicants
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		//       Total Number of Disabled Male Applicants
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		//       Total Number of Disabled Female Applicants
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		//       Percentage of Disabled Applicants
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		//       Number of Applicants registered for Digital Marketing + CRM
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 			<div className="shadow-md w-[300px] bg-blue-800 p-10 hover:animate-pulse rounded-md text-white flex gap-6 ">
		// 				<div className="text-start">
		//       Number of Applicants registered for Digital Trading
		// 				</div>
		// 				<h1 className="text-2xl">40</h1>
		// 			</div>
		// 		</div>
		// 	</main>
	)
}
