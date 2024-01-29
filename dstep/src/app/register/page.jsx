/** @format */

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"

const Page = () => {
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			totalRegistered: "",
			percentageOfEnrolledParticipants: "",
			maleApplicants: "",
			femaleApplicants: "",
			percentageOfFemaleApplicants: "",
			disabledMale: "",
			disabledFemale: "",
			totalDisabled: "",
			percentageOfDisabled: "",
			marketingApplicants: "",
			tradingApplicants: "",
		},
		validationSchema: Yup.object().shape({
			totalRegistered: Yup.number(
				"Please enter valid numeric values"
			).required("This value is required"),
			percentageOfEnrolledParticipants: Yup.number().required(
				"This value is required"
			),
			maleApplicants: Yup.number().required("This value is required"),
			femaleApplicants: Yup.number().required("This value is required"),
			percentageOfFemaleApplicants: Yup.number().required(
				"This value is required"
			),
			disabledMale: Yup.number().required("This value is required"),
			disabledFemale: Yup.number().required("This value is required"),
			totalDisabled: Yup.number().required("This value is required"),
			percentageOfDisabled: Yup.number().required(
				"This value is required"
			),
			marketingApplicants: Yup.number().required(
				"This value is required"
			),
			tradingApplicants: Yup.number().required("This value is required"),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				if (!formik.isValid) {
					setSubmitting(false)
					return
				}
				setLoading(true)
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/report/data`,
					values
				)
				console.log(response, "res")
				if (response.status === 200) {
					toast.success("Form submitted successfully!")
					setSubmitting(false)
					router.push("/")
				} else {
					setSubmitting(false)
					toast.error("Error submitting form")
				}
			} catch (error) {
				setSubmitting(false)
				toast.error("Something went wrong")
				console.log(error)
			}
		},
    })
    
    const handleImport = () => {
        
    }

	return (
		<div>
			<div className="min-h-screen overflow-y-scroll p-10 bg-[#F7FDFA] w-full">
				<div className=" ">
					<div className="flex flex-row justify-between items-center py-10">
						<div>
							<h2 className="font-bold text-4xl text-white md:text-black">
								Welcome!
							</h2>
							<p className="text-white md:text-black">
								Kindly crosscheck the details before you submit
							</p>
						</div>

						<div className="flex gap-10 flex-row">
							<button
								type="submit"
								className="bg-emerald-700  md:text-white py-2 px-4 rounded-lg hover:opacity-50"
							>
								{!formik.isSubmitting ? "Submit" : "Loading..."}
                            </button>
                            <button
                                type="submit"
                                onClick={handleImport}
								className="ring-1  md:text-emerald-700 py-2 px-4 rounded-lg hover:opacity-60"
							>
								Import
							</button>
						</div>
					</div>

					<form onSubmit={formik.handleSubmit}>
						<div className="md:flex py-3">
							<div>
								<div className="text-xl text-emerald-700 pb-6 font-bold">
									NAME/ID
								</div>
								<div className=" md:w-3/4">
									<label className="text-white md:text-black text-sm">
										First Name
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="firstName"
										value={formik.values.firstName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.firstName &&
									formik.errors.firstName ? (
										<p className="text-red-500">
											{formik.errors.firstName}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Last Name
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="lastName"
										value={formik.values.lastName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.lastName &&
									formik.errors.lastName ? (
										<p className="text-red-500">
											{formik.errors.lastName}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										NIN
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="nin"
										value={formik.values.nin}
										onChange={formik.handleChange}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.nin && formik.errors.nin ? (
										<p className="text-red-500">
											{formik.errors.nin}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Other ID
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="occupation"
										value={formik.values.otherId}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.otherId &&
									formik.errors.otherId ? (
										<p className="text-red-500">
											{formik.errors.otherId}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Registration Number
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="registrationNo"
										value={formik.values.registrationNo}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.registrationNo &&
									formik.errors.registrationNo ? (
										<p className="text-red-500">
											{formik.errors.registrationNo}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										DSTEP Admitted Course
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="admittedCourse"
										value={formik.values.admittedCourse}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.admittedCourse &&
									formik.errors.admittedCourse ? (
										<p className="text-red-500">
											{formik.errors.admittedCourse}
										</p>
									) : null}
								</div>

								
							</div>
							<div>
								<div className="text-xl text-emerald-700 pb-6 font-bold">
									OTHER DATA
								</div>

								<div className=" md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Gender
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="gender"
										value={formik.values.gender}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.gender &&
									formik.errors.gender ? (
										<p className="text-red-500">
											{formik.errors.gender}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Date of Birth
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="dob"
										value={formik.values.dob}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.dob && formik.errors.dob ? (
										<p className="text-red-500">
											{formik.errors.dob}
										</p>
									) : null}
								</div>

								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Age
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="age"
										value={formik.values.age}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.age && formik.errors.age ? (
										<p className="text-red-500">
											{formik.errors.age}
										</p>
									) : null}
                                </div>
                                <div className="md:w-3/4">
									<label className="text-white md:text-black text-sm">
										Thumbprint
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="thumbprint"
										value={formik.values.thumbprint}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.thumbprint &&
									formik.errors.thumbprint ? (
										<p className="text-red-500">
											{formik.errors.thumbprint}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Signature
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="signature"
										value={formik.values.signature}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.signature &&
									formik.errors.signature ? (
										<p className="text-red-500">
											{formik.errors.signature}
										</p>
									) : null}
								</div>
							</div>
							<div>
								<div className="text-xl text-emerald-700 font-bold pb-6">
									CONTACTS
								</div>

								<div className=" md:w-3/4">
									<label className="text-white md:text-black text-sm">
										Physically Challenged
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="physicallyChallenged"
										value={
											formik.values.physicallyChallenged
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.physicallyChallenged &&
									formik.errors.physicallyChallenged ? (
										<p className="text-red-500">
											{formik.errors.physicallyChallenged}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Employment Status
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="employmentStatus"
										value={formik.values.employmentStatus}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.employmentStatus &&
									formik.errors.employmentStatus ? (
										<p className="text-red-500">
											{formik.errors.employmentStatus}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Email
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.email &&
									formik.errors.email ? (
										<p className="text-red-500">
											{formik.errors.email}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Phone
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="phone"
										value={formik.values.phone}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.phone &&
									formik.errors.phone ? (
										<p className="text-red-500">
											{formik.errors.phone}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Whatsapp
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="whatsapp"
										value={formik.values.whatsapp}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.whatsapp &&
									formik.errors.whatsapp ? (
										<p className="text-red-500">
											{formik.errors.whatsapp}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Residential
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="residential"
										value={formik.values.residential}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.residential &&
									formik.errors.residential ? (
										<p className="text-red-500">
											{formik.errors.residential}
										</p>
									) : null}
								</div>
							</div>
							<div>
								<div className="text-xl text-emerald-700 font-bold pb-6">
									EDUCATIONAL QUALIFICATION
								</div>

								<div className=" md:w-3/4">
									<label className="text-white md:text-black text-sm">
										Highest Qualification
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="qualification"
										value={formik.values.qualification}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.qualification &&
									formik.errors.qualification ? (
										<p className="text-red-500">
											{formik.errors.qualification}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white text-sm  md:text-black"
									>
										Tetiary Course Of Study
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="courseOfStudy"
										value={formik.values.courseOfStudy}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.courseOfStudy &&
									formik.errors.courseOfStudy ? (
										<p className="text-red-500">
											{formik.errors.courseOfStudy}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Tetiary Institution Attended
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="university"
										value={formik.values.university}
										onChange={formik.handleChange}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.university &&
									formik.errors.university ? (
										<p className="text-red-500">
											{formik.errors.university}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-white md:text-black text-sm"
									>
										Occupation
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="occupation"
										value={formik.values.occupation}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.occupation &&
									formik.errors.occupation ? (
										<p className="text-red-500">
											{formik.errors.occupation}
										</p>
									) : null}
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Page
