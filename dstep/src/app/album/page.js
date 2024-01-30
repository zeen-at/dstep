/** @format */

"use client"

import Image from "next/image"
import React, { useState } from "react"
import Bio from "../component/Bio/otherData"
import { CiImport } from "react-icons/ci"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import { usePDF } from "react-to-pdf"

const Page = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [downloading, setDownloading] = useState(false)
	const [csv, setCsv] = useState(null)

	const { toPDF, targetRef } = usePDF({
		filename: "album.pdf",
		onError: (error) => console.error("PDF generation error:", error),
	})
	const pageSize = 1

	const totalItems = csv ? csv.length : null

	const totalPages = Math.ceil(totalItems / pageSize)

	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const currentData = csv && csv.slice(startIndex, endIndex)

	const handleImport = async (event) => {
		const file = event.target.files[0]

		if (file) {
			parseXLSX(file)
		}
	}

	const parseXLSX = (file) => {
		const reader = new FileReader()

		reader.onload = (e) => {
			const data = e.target.result
			const workbook = XLSX.read(data, { type: "binary" })

			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]

			const parsedData = XLSX.utils.sheet_to_csv(worksheet, {
				header: "A",
			})
			//   setCsv(parsedData);

			Papa.parse(parsedData, {
				complete: (result) => {
					console.log("Parsed CSV data:", result.data)
					setCsv(result.data)
				},
				header: true,
				dynamicTyping: true,
			})
		}

		reader.readAsBinaryString(file)
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleDownload = async () => {
		setDownloading(true)
		await toPDF()
		setDownloading(false)
	}

	
	return (
		<>
			{csv ? (
				<div>
					{currentData.map((item) => (
						<div
							className="w-full h-screen relative"
							key={item.DSTEPSHEDigitalGF2RegiFormByNor_Id}
							ref={targetRef}
						>
							<div
								className="bg-[#063720] h-screen w-1/3 absolute"
								style={{
									backgroundImage: "url(./worldbank.webp)",
									backgroundPosition: "center",
									backgroundSize: "contain",
									backgroundBlendMode: "screen",
									backgroundRepeat: "no-repeat",
								}}
							>
								<div className="mx-10 my-5 w-2/3">
									<div className="text-[#063720] tracking-wide text-2xl px-4 py-1 bg-white">
										PASSPORT PHOTO
									</div>
									<div className="flex flex-row my-4 justify-center items-center ">
										<Image
											width={100}
											height={30}
											src="/avatar.jpg"
											alt="passport"
											className="rounded-full items-center"
										/>
									</div>
								</div>
								<div className="mx-10 my-5 w-2/3">
									<div className="text-[#063720] tracking-wide text-2xl px-4 py-1 font-bold bg-white">
										NAME/ID
									</div>
									<div className="py-1">
										<Bio
											title="Reg. No:"
											value={
												item.DSTEPRegistrationFormByNormtakH_Id
											}
											textColor="text-white"
										/>
										<Bio
											title="First Name:"
											value={
												item.AttestationAffirmation_Name_First
											}
											textColor="text-white"
										/>
										<Bio
											title="Last Name:"
											value={
												item.AttestationAffirmation_Name_Last
											}
											textColor="text-white"
										/>
										<Bio
											title="NIN:"
											value={
												item.ValidIDTermsAndConditionsApply_YourNIN11DigitsPleaseEnterYourNIN2 ||
												"nil"
											}
											textColor="text-white"
										/>
										<Bio
											title="Other ID:"
											value=""
											textColor="text-white"
										/>
										<Bio
											title="DSTEP Admitted Course:"
											value={item.LearningTrack}
											textColor="text-white"
										/>
									</div>
								</div>
								<div className="mx-10 my-5 w-2/3">
									<div className="text-[#063720] tracking-wide text-xl px-4 py-1 bg-white">
										THUMBPRINT
									</div>
									<div className="border border-solid my-5 w-[100px] h-[100px]"></div>
								</div>
								<div className="mx-10 my-5 w-2/3">
									<div className="text-[#063720] tracking-wide text-xl px-4 py-1 bg-white">
										SIGNATURE AND DATE
									</div>
									<div className="border border-solid my-5 w-[140px] h-[50px]">
										{item.AttestationAffirmation_Signature}
									</div>
								</div>
							</div>
							<div
								className="w-2/3 h-screen  bg-[#F7FDFA] relative left-1/3 px-10 py-6"
								style={{
									backgroundImage: "url(./fmei.jpeg)",
									backgroundPosition: "center",
									backgroundSize: "cover",
									backgroundBlendMode: "screen",
									backgroundRepeat: "no-repeat",
								}}
							>
								<div className="py-4 flex flex-row justify-between items-center">
									<h1 className="text-black text-2xl leading-loose font-semibold">
										DSTEP TRAINEE ALBUM
									</h1>
									<div className="flex flex-row gap-6">
										<div className="bg-emerald-700 text-white px-4 py-2 rounded-md cursor-pointer">
											<label
												htmlFor="fileInput"
												className="flex flex-row gap-2 items-center"
											>
												Import <CiImport />
											</label>
											<input
												type="file"
												id="fileInput"
												accept=".xlsx, .csv"
												className="hidden"
												onChange={handleImport}
											/>
										</div>
										<button
											type="submit"
											onClick={handleDownload}
											disabled={downloading}
											className="ring-1 ring-emerald-700 text-emerald-700 px-4 py-2 rounded-md cursor-pointer"
										>
											{downloading
												? "Processing..."
												: "Download"}
										</button>
									</div>
								</div>
								{/* Other data */}

								<div className="py-1">
									<h1 className="font-bold text-xl text-white bg-[#063720] px-4 py-2 tracking-widest">
										OTHER DATA
									</h1>
									<Bio
										title="Gender:"
										value={item._1PersonalInfo_Gender}
									/>
									<Bio
										title="Date Of Birth:"
										value={item._1PersonalInfo_DateOfBirth}
									/>
									<Bio
										title="Age:"
										value={item._1PersonalInfo_AgeDigitOnly}
									/>
									<Bio
										title="Physically challenged:"
										value={
											item._1PersonalInfo_AnyFormOfPhysicalChallenge
										}
									/>
									<Bio
										title="Employment Status:"
										value={
											item._2EducationQualificationAndEmployment_EmploymentStatus
										}
									/>
								</div>
								<div className="py-1">
									<h1 className="font-bold text-xl text-white bg-[#063720] px-4 py-2 tracking-widest">
										CONTACTS
									</h1>
									<Bio
										title="Email:"
										value={item._1PersonalInfo_Email}
									/>
									<Bio
										title="Phone:"
										value={item._1PersonalInfo_Phone}
									/>
									<Bio
										title="Whatsapp:"
										value={item._1PersonalInfo_WhatsApp}
									/>
									<Bio
										title="Residential:"
										value={`${item._1PersonalInfo_ResidentialAddress_City}/${item._1PersonalInfo_ResidentialAddress_State}/${item._1PersonalInfo_ResidentialAddress_Country}   `}
									/>
									<Bio
										title="Origin:"
										value={
											item._1PersonalInfo_StateOfOrigin
										}
									/>
								</div>
								<div className="py-1">
									<h1 className="font-bold text-xl text-white bg-[#063720] px-4 py-2 tracking-widest">
										EDUCATIONAL QUALIFICATION
									</h1>
									<Bio
										title="Highest Qualification:"
										value={
											item._2EducationQualificationAndEmployment_HighestAcademicQualification
										}
									/>
									<Bio
										title="Tertiary Course of Study:"
										value={
											item._2EducationQualificationAndEmployment_TertiaryCourseOfStudy
										}
									/>
									<Bio
										title="Tertiary Institution Attended:"
										value={
											item._2EducationQualificationAndEmployment_TertiaryInstitutionsAttended
										}
									/>
									<Bio
										title="Occupation:"
										value={
											item._2EducationQualificationAndEmployment_Occupation
										}
									/>
								</div>


								<div className="top[-20px] flex justify-end items-center">
									<p>
										Page {currentPage} of {totalPages}
									</p>
									<button
										onClick={handlePrevPage}
										disabled={currentPage === 1}
										className="px-3 rounded-md text-emerald-500  focus:ring-emerald-700 transition duration-150 ease-in-out"
									>
										Previous
									</button>
									<button
										onClick={handleNextPage}
										disabled={currentPage === totalPages}
										className="px-3 rounded-md text-emerald-500 hover:text-emerald-700 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
									>
										Next
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="w-full h-screen relative">
					<div className="bg-[#063720] h-screen w-1/3 absolute">
						<div className="m-10 w-2/3">
							<div className="text-[#063720] tracking-wide text-2xl px-4 py-1 bg-white">
								PASSPORT PHOTO
							</div>
							<div>
								{/* <Image fill src="/" alt="passport" /> */}
							</div>
						</div>
						<div className="m-10 w-2/3">
							<div className="text-[#063720] tracking-wide text-2xl px-4 py-1 font-bold bg-white">
								NAME/ID
							</div>
							<div className="py-1">
								<Bio
									title="Reg. No:"
									value=""
									textColor="text-white"
								/>
								<Bio
									title="First Name:"
									value=""
									textColor="text-white"
								/>
								<Bio
									title="Last Name:"
									value=""
									textColor="text-white"
								/>
								<Bio
									title="NIN:"
									value=""
									textColor="text-white"
								/>
								<Bio
									title="Other ID:"
									value=""
									textColor="text-white"
								/>
								<Bio
									title="DSTEP Admitted Course:"
									value=""
									textColor="text-white"
								/>
							</div>
						</div>
						<div className="m-10 w-2/3">
							<div className="text-[#063720] tracking-wide text-xl px-4 py-1 bg-white">
								THUMBPRINT
							</div>
							<div className="border border-solid my-5 w-[100px] h-[100px]"></div>
						</div>
						<div className="m-10 w-2/3">
							<div className="text-[#063720] tracking-wide text-xl px-4 py-1 bg-white">
								SIGNATURE AND DATE
							</div>
							<div className="border border-solid my-5 w-[140px] h-[50px]"></div>
						</div>
					</div>
					<div className="bg-[#F7FDFA] w-2/3 h-screen absolute left-1/3 px-10 py-6">
						{/* header */}
						<div className="py-4 flex flex-row justify-between items-center">
							<h1 className="text-black text-2xl leading-loose font-semibold">
								DSTEP TRAINEE ALBUM
							</h1>
							<div className="bg-emerald-700 text-white px-4 py-2 rounded-md cursor-pointer">
								<label
									htmlFor="fileInput"
									className="flex flex-row gap-2 items-center"
								>
									Import <CiImport />
								</label>
								<input
									type="file"
									id="fileInput"
									accept=".xlsx, .csv"
									className="hidden"
									onChange={handleImport}
								/>
							</div>
						</div>
						{/* Other data */}

						<div className="py-1">
							<h1 className="font-bold text-xl text-white bg-[#063720] px-4 py-2 tracking-widest">
								OTHER DATA
							</h1>
							<Bio title="Gender:" value="" />
							<Bio title="Date Of Birth:" value="" />
							<Bio title="Age:" value="" />
							<Bio title="Physically challenged:" value="" />
							<Bio title="Employment Status:" value="" />
						</div>
						<div className="py-1">
							<h1 className="font-bold text-xl text-white bg-[#063720] px-4 py-2 tracking-widest">
								CONTACTS
							</h1>
							<Bio title="Email:" value="" />
							<Bio title="Phone:" value="" />
							<Bio title="Whatsapp:" value="" />
							<Bio title="Residential:" value="" />
							<Bio title="Origin:" value="" />
						</div>
						<div className="py-1">
							<h1 className="font-bold text-xl text-white bg-[#063720] px-4 py-2 tracking-widest">
								EDUCATIONAL QUALIFICATION
							</h1>
							<Bio title="Highest Qualification:" value="" />
							<Bio title="Tertiary Course of Study:" value="" />
							<Bio
								title="Tertiary Institution Attended:"
								value=""
							/>
							<Bio title="Physically challenged:" value="" />
							<Bio title="Occupation:" value="" />
						</div>
					</div>
					
				</div>
			)}
		</>
	)
}

export default Page
