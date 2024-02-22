/** @format */

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import * as d3 from "d3"
import PieChart from "./component/PieChart"
import { VscCopy } from "react-icons/vsc";
import { MdShare } from "react-icons/md";

export default function Home() {
	const [formData, setFormData] = useState([])
	const [mappedData, setMappedData] = useState({
		percentageOfFemales: "",
		males: "",
		registrationNumber: "",
		projectTitle: "",
		expectedTrainees: "",
		personsRegistered: "",
		attendees: "",
		percentageOfPWD: "",
		budgetForm: "",
	})

	useEffect(() => {
		formData.map((item) => {
			setMappedData({
				percentageOfFemales: item.percentageOfFemales,
				registrationNumber: item.registrationNumber,
				projectTitle: item.projectTitle,
				expectedTrainees: item.expectedTrainees,
				personsRegistered: item.personsRegistered,
				attendees: item.attendees,
				percentageOfPWD: item.percentageOfPWD,
				budgetForm: item.budgetForm,
			})
		})
	}, [formData])

	const data = [
		{ name: "Females", value: mappedData.percentageOfFemales },
		{
			name: "Males",
			value:
				mappedData.personsRegistered - mappedData.percentageOfFemales,
		},
		{ name: "Males", value: mappedData.percentageOfPWD },
	]

	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				const res = await axios.get(
					// "http://localhost:3006/report/fetch"
					`${process.env.NEXT_PUBLIC_BASE_URL}/report/fetch`
				)
				setFormData(res?.data?.data.slice(-1))
			} catch (error) {
				console.log(error)
			}
		}
		fetchAnalysis()
	}, [])

	return (
		<main
			style={{ backgroundImage: "url(./reportbg.png)" }}
			className="min-h-screen overflow-y-scroll relative"
		>
			<div className="absolute w-2/3 lg:w-3/4 md:w-1/2 top-[50px] left-[150px] md:left-[250px]">
				<div className="py-10 text-2xl font-bold tracking-wider">
					<h1>DAILY TRACKER ANALYSIS</h1>
				</div>
				<div className="bg-white p-1 px-7 lg:divide-x-2 rounded-sm w-3/4 md:w-full flex flex-col lg:flex-row md:gap-[100px]">
					<div className="flex flex-row text-center items-center">
						<h1 className="md:text-[24px] text-[12px">
							Total enrolled applicants:
						</h1>
						<p className="font-bold text-[#063720] md:text-4xl p-4 text-2xl">
							{mappedData.personsRegistered}
						</p>
					</div>
					<div className="flex flex-col md:flex-row gap-10 text-center items-center">
						<PieChart width={150} height={130} data={data} />
						<div className="items-center">
							<ul className="marker:text-[#00DDAD] marker:text-2xl list-disc">
								<li>
									Females: {mappedData.percentageOfFemales}
								</li>
							</ul>
						</div>
						<div className="items-center">
							<ul className="marker:text-[#063720] marker:text-2xl list-disc">
								{/* <li>Males: {mappedData.personsRegistered - parseFloat(mappedData.percentageOfFemales)}</li> */}
							</ul>
						</div>
						<div className="items-center">
							<ul className="marker:text-[#f87f7f] marker:text-2xl list-disc">
								<li>PWD: {mappedData.percentageOfPWD}</li>
							</ul>
						</div>
					</div>
				</div>

				<div className=" rounded-sm p-10 text-start w-3/4 md:w-full items-center">
						<p className="text-[14px] items-center">Registration Number: &nbsp;
						<span className="font-bold md:text-3xl text-lg">
							{mappedData.registrationNumber}
						</span>
						</p>
					</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
					
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">Project title</p>
						<p className="font-bold text-3xl">
							{mappedData.projectTitle}
						</p>
					</div>
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">
							Number of Expected Trainees applicants
						</p>
						<p className="font-bold text-3xl">
							{mappedData.expectedTrainees}
						</p>
					</div>
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">
							Number of Persons Registered
						</p>
						<p className="font-bold text-3xl">
							{mappedData.personsRegistered}
						</p>
					</div>
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">
							Number of Trainees in Attendance
						</p>
						<p className="font-bold text-3xl">
							{mappedData.attendees}
						</p>
					</div>
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">Number OR % of Female</p>
						<p className="font-bold text-3xl">
							{mappedData.percentageOfFemales}
						</p>
					</div>
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">Number OR % of PWDs</p>
						<p className="font-bold text-3xl">
							{mappedData.percentageOfPWD}
						</p>
					</div>
					<div className="bg-white rounded-sm p-6 text-center w-3/4 md:w-full">
						<p className="text-[14px]">
							Finalization of DSDP with KPIs and Budget with
							Expenditure Forms
						</p>
						<p className="font-bold text-3xl">
							{mappedData.budgetForm}
						</p>
					</div>
					<div className="p-6">
						<div className="flex gap-3 items-center text-emerald-950 font-bold">
							<p className="text-[20px]">DOWNLOAD AS PDF </p>
							<VscCopy />
						</div>
						<div className="flex gap-3 items-center text-emerald-950 font-bold">
							<p className="text-[20px]">SEND VIA EMAIL  </p>
							<MdShare />
						</div>
						
					</div>
				</div>
			</div>
		</main>
	)
}
