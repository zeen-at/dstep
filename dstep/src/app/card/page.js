/** @format */

"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
import Bio from "../component/Bio/otherData"
import { CiImport } from "react-icons/ci"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import { usePDF } from "react-to-pdf"

const Page = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [downloading, setDownloading] = useState(false)
	const [csv, setCsv] = useState(null)
	const [mappedData, setMappedData] = useState({
		regNo: "",
		firstName: "",
		lastName: "",
		NIN: "",
		otherId: "",
		dstepCourse: "",
		gender: "",
		dob: "",
		age: "",
		physicalChallenge: "",
		employmentStatus: "",
		email: "",
		phone: "",
		whatsapp: "",
		residential: "",
		origin: "",
		highestQualification: "",
		courseOfStudy: "",
		tetiaryInstitution: "",
		occupation: "",
		passport: "",
		thumbprint: "",
		signature: "",

	})

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

	useEffect(() => {
		currentData?.map((item) => {
			setMappedData({
				regNo: item.DSTEPRegistrationFormByNormtakH_Id,
		firstName: item.AttestationAffirmation_Name_First,
		lastName: item.AttestationAffirmation_Name_Last,
		NIN: item.ValidIDTermsAndConditionsApply_YourNIN11DigitsPleaseEnterYourNIN2 ||
		"nil",
		otherId: "",
		dstepCourse: item.LearningTrack,
		gender: item._1PersonalInfo_Gender,
		dob: item._1PersonalInfo_DateOfBirth,
		age: item._1PersonalInfo_AgeDigitOnly,
		physicalChallenge: item._1PersonalInfo_AnyFormOfPhysicalChallenge,
		employmentStatus: item._2EducationQualificationAndEmployment_EmploymentStatus,
		email:item._1PersonalInfo_Email,
		phone: item._1PersonalInfo_Phone,
		whatsapp:item._1PersonalInfo_WhatsApp,
		residential: `${item._1PersonalInfo_ResidentialAddress_City}/${item._1PersonalInfo_ResidentialAddress_State}/${item._1PersonalInfo_ResidentialAddress_Country}`,
		origin: item._1PersonalInfo_StateOfOrigin,
		highestQualification: item._2EducationQualificationAndEmployment_HighestAcademicQualification,
		courseOfStudy: item._2EducationQualificationAndEmployment_TertiaryCourseOfStudy,
		tetiaryInstitution: item._2EducationQualificationAndEmployment_Occupation,
		occupation: "",
		passport: "",
		thumbprint: "",
		signature: "",

			})
		})

	}, [csv, currentData])

	

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
		toPDF()
		setDownloading(false)
	}

	return (
		<>
			
				
			<div
				style={{
					backgroundImage: "url(./card.png)",
					backgroundSize: "100%",
				}}
				className="min-h-screen overflow-y-scroll w-full relative"
				ref={targetRef}
			>
				<div className="absolute left-[120px]  md:left-[230px] lg:left-[450px] flex flex-col lg:flex-row justify-between">
					<div className="">
						<div className="m-10 ">
							<div className="text-lg border-[#063720] border p-2 lg:w-[300px]">
								Passport Photo
							</div>
							<div>
								<Image
									width={200}
									height={100}
									src="/avatar.jpg"
									alt="passport"
									className="object-cover rounded-full items-center"
								/>{" "}
							</div>
						</div>
						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
								Name/ID
							</div>
							<div className="py-1">
								<Bio
									title="Reg. No:"
									value={
										mappedData.regNo
									}
								/>
								<Bio
									title="First Name:"
									value={
										mappedData.firstName
									}
								/>
								<Bio
									title="Last Name:"
									value={
										mappedData.lastName
									}
								/>
								<Bio
									title="NIN:"
									value={
										mappedData.NIN
									}
								/>
									<Bio title="Other ID:" value={mappedData.otherId} />
								<Bio
									title="DSTEP Admitted Course:"
									value={mappedData.dstepCourse}
								/>
							</div>
						</div>
						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
								Contacts
							</div>
							<div className="py-1">
								<Bio
									title="Email:"
									value={mappedData.email}
								/>
								<Bio
									title="Phone:"
									value={mappedData.phone}
								/>
								<Bio
									title="Whatsapp:"
									value={mappedData.whatsapp}
								/>
								<Bio
									title="Residential:"
									value={mappedData.residential}
								/>
								<Bio
									title="Origin:"
									value={
										mappedData.origin
									}
								/>
							</div>
							</div>
							
							<div className="hidden top-[20px] lg:flex flex-col gap-4 items-center">
								<p>
									Page {currentPage} of {totalPages}
                            </p>
                            <div>
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
					<div>
						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720] lg:w-[300px]">
								Educational Qualification
							</div>
							<Bio
								title="Highest Qualification:"
								value={mappedData.highestQualification}
							/>
							<Bio
								title="Tertiary Course of Study:"
									value={
									mappedData.courseOfStudy
								}
							/>
							<Bio
								title="Tertiary Institution Attended:"
								value={
									mappedData.tetiaryInstitution
								}
							/>
							<Bio title="Physically challenged:" value={mappedData.physicalChallenge} />
							<Bio title="Occupation:" value={mappedData.occupation} />
						</div>
						{/* Other data */}

						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
								Other Data
							</div>
							<Bio
								title="Gender:"
								value={mappedData.gender}
							/>
							<Bio
								title="Date Of Birth:"
								value={mappedData.dob}
							/>
							<Bio
								title="Age:"
								value={mappedData.age}
							/>
							<Bio
								title="Physically challenged:"
								value={
									mappedData.physicalChallenge
								}
							/>
							<Bio
								title="Employment Status:"
								value={
									mappedData.employmentStatus
								}
							/>
						</div>
						<div className="m-10 ">
							<div className="border text-lg p-2 border-[#063720]">
								Thumbprint
							</div>
							<div className="bg-white border border-solid my-5 w-[100px] h-[50px]"></div>
						</div>
						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
								Signature and Date
							</div>
							<div className="bg-white border border-solid my-5 w-[140px] h-[50px]"></div>
                        </div>
                        <div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
							For Official Use Only
                            </div>
                            <p className="m-1">Decision:</p>
                            <div className="flex flex-row my-4">
                               
                                <div className="px-2">
                                    <div className="flex gap-2">
                                        <label htmlFor="enrolled">Enrolled/Admitted</label>
                                        <input type="checkbox" name="enrolled" value="enrolled" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label htmlFor="enrolled">KIV</label>
                                        <input type="checkbox" name="enrolled" value="enrolled" />
                                    </div>
                                    
                                </div>
                                <div className="px-2">
                                    <div className="flex gap-2">
                                        <label htmlFor="enrolled">Rejected/Not Admitted</label>
                                        <input type="checkbox" name="enrolled" value="enrolled" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label htmlFor="enrolled">Welcome Kits</label>
                                        <input type="checkbox" name="enrolled" value="enrolled" />
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div className="px-2">
                                    <div>
								Sign and Date
                                    </div>
                                    <div className="border border-solid  w-[100px] h-[50px] bg-white"></div>

                                    {/* </div> */}
                                    
                                    
                                </div>
                        </div>
                        <div className="lg:hidden top-[20px] flex flex-col gap-4 items-center">
							<p className="">
								Page {currentPage} of {totalPages}
							</p>
							<div>
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
					<div className=" m-10">
						<div className="flex flex-col gap-6">
							<div className="bg-emerald-700 text-white px-4 py-2 rounded-md cursor-pointer">
								<label
									htmlFor="fileInput"
									className="flex flex-row gap-2 justify-center items-center"
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
								{downloading ? "Processing..." : "Download"}
							</button>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}

export default Page
