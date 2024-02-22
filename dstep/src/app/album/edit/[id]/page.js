/** @format */

"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
import Bio from "@/app/component/Bio/otherData"


const Page = () => {
	const [currentPage, setCurrentPage] = useState(1)
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
				NIN:
					item.ValidIDTermsAndConditionsApply_YourNIN11DigitsPleaseEnterYourNIN2 ||
					"nil",
				otherId: "",
				dstepCourse: item.LearningTrack,
				gender: item._1PersonalInfo_Gender,
				dob: item._1PersonalInfo_DateOfBirth,
				age: item._1PersonalInfo_AgeDigitOnly,
				physicalChallenge:
					item._1PersonalInfo_AnyFormOfPhysicalChallenge,
				employmentStatus:
					item._2EducationQualificationAndEmployment_EmploymentStatus,
				email: item._1PersonalInfo_Email,
				phone: item._1PersonalInfo_Phone,
				whatsapp: item._1PersonalInfo_WhatsApp,
				residential: `${item._1PersonalInfo_ResidentialAddress_City}/${item._1PersonalInfo_ResidentialAddress_State}/${item._1PersonalInfo_ResidentialAddress_Country}`,
				origin: item._1PersonalInfo_StateOfOrigin,
				highestQualification:
					item._2EducationQualificationAndEmployment_HighestAcademicQualification,
				courseOfStudy:
					item._2EducationQualificationAndEmployment_TertiaryCourseOfStudy,
				tetiaryInstitution:
					item._2EducationQualificationAndEmployment_Occupation,
				occupation: "",
				passport: "",
				thumbprint: "",
				signature: "",
			})
		})
	}, [csv, currentData])

	

	
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

	

	return (
		<>
			<div
				style={{
					backgroundImage: "url(./album.png)",
					backgroundSize: "100%",
				}}
				className="min-h-screen overflow-y-scroll w-full relative"
			>
				<div className="absolute top-10 left-[120px]  md:left-[230px] lg:left-[450px] flex flex-col lg:flex-row justify-between ">
					<div className="">
						<div className="m-10 ">
							<div className="text-lg border-[#063720] border p-2 lg:w-[300px]">
								Passport Photo
							</div>
							<div className="flex justify-center py-2">
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
									value={mappedData.regNo}
								/>
								<Bio
									title="First Name:"
									value={mappedData.firstName}
								/>
								<Bio
									title="Last Name:"
									value={mappedData.lastName}
								/>
								<Bio title="NIN:" value={mappedData.NIN} />
								<Bio
									title="Other ID:"
									value={mappedData.otherId}
								/>
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
								<Bio title="Email:" value={mappedData.email} />
								<Bio title="Phone:" value={mappedData.phone} />
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
									value={mappedData.origin}
								/>
							</div>
						</div>

		
						<div className="hidden top-[20px] lg:flex flex-col gap-4 items-center">
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
								value={mappedData.courseOfStudy}
							/>
							<Bio
								title="Tertiary Institution Attended:"
								value={mappedData.tetiaryInstitution}
							/>
							<Bio
								title="Physically challenged:"
								value={mappedData.physicalChallenge}
							/>
							<Bio
								title="Occupation:"
								value={mappedData.occupation}
							/>
						</div>
						{/* Other data */}

						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
								Other Data
							</div>
							<Bio title="Gender:" value={mappedData.gender} />
							<Bio
								title="Date Of Birth:"
								value={mappedData.dob}
							/>
							<Bio title="Age:" value={mappedData.age} />
							<Bio
								title="Physically challenged:"
								value={mappedData.physicalChallenge}
							/>
							<Bio
								title="Employment Status:"
								value={mappedData.employmentStatus}
							/>
						</div>

						<div className="m-10 ">
							<div className="border text-lg p-2 border-[#063720] ">
								Thumbprint
							</div>
							<div className="border border-solid my-5 w-[100px] h-[50px] bg-white"></div>
						</div>
						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
								Signature and Date
							</div>
							<div className="border border-solid my-5 w-[140px] h-[50px] bg-white"></div>
						</div>
						<div className="m-10">
							<div className="border text-lg p-2 border-[#063720]">
							About me and Why I enrolled for DSTEP
							</div>
							<textarea  className="border border-[#063720] h-[100px] md:w-full w-[330px]"></textarea>
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
					
				</div>
			</div>
		</>
	)
}

export default Page
