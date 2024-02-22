/** @format */

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { CgPushUp } from "react-icons/cg"

const Page = () => {
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			nameOfConsortium: "",
			registrationNumber: "",
			projectTitle: "",
			expectedTrainees: "",
			personsRegistered: "",
			attendees: "",
			percentageOfFemales: "",
			percentageOfPWD: "",
			budgetForm: "",
			evidence: "",
			challenges: "",
			lessonsLearnt: "",
		},
		validationSchema: Yup.object().shape({
			nameOfConsortium: Yup.string().required("This field is required!"),
			registrationNumber: Yup.string().required("This field is required!"),
			projectTitle: Yup.string().required("This field is required!"),
			expectedTrainees: Yup.number().required("This field is required!"),
			personsRegistered: Yup.number().required("This field is required!"),
			attendees: Yup.number().required("This field is required!"),
			percentageOfFemales: Yup.string().required("This field is required!"),
			percentageOfPWD: Yup.string().required("This field is required!"),

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

	return (
		<div>
			<div
				style={{ backgroundImage: "url(./bg.png)", backgroundSize: "100%" }}
				className="min-h-screen overflow-y-scroll w-full relative"
			>
				<div className="absolute px-5 left-[120px] sm:px-0 md:left-[300px] lg:left-[550px] top-[20px]">
					<h2 className="font-bold text-md md:text-xl text-[#063720]">
						DSTEP DAILY TRACKER
					</h2>
					<p className="text-black">
						Crosscheck the details before you submit
					</p>
					<form onSubmit={formik.handleSubmit}>
						<div className="md:flex py-10">
							<div>
								<div className="md:w-3/4">
									<label className="text-black">
										Name of Consortium
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="nameOfConsortium"
										value={formik.values.nameOfConsortium}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.nameOfConsortium &&
									formik.errors.nameOfConsortium ? (
										<p className="text-red-500">
											{formik.errors.nameOfConsortium}
										</p>
									) : null}
								</div>
								<div className="my-3 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Registration Number
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="registrationNumber"
										value={
											formik.values
												.registrationNumber
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched
										.registrationNumber &&
									formik.errors
										.registrationNumber ? (
										<p className="text-red-500">
											{
												formik.errors
													.registrationNumber
											}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Project Title
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="projectTitle"
										value={formik.values.projectTitle}
										onChange={formik.handleChange}
										className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.projectTitle &&
									formik.errors.projectTitle ? (
										<p className="text-red-500">
											{formik.errors.projectTitle}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Number of Expected Trainees
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="expectedTrainees"
										value={formik.values.expectedTrainees}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.expectedTrainees &&
									formik.errors.expectedTrainees ? (
										<p className="text-red-500">
											{formik.errors.expectedTrainees}
										</p>
									) : null}
								</div>
								<div className="my-3 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Number of Persons Registered
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="personsRegistered"
										value={
											formik.values
												.personsRegistered
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched
										.personsRegistered &&
									formik.errors
										.personsRegistered ? (
										<p className="text-red-500">
											{
												formik.errors
													.personsRegistered
											}
										</p>
									) : null}
								</div>
								<div className="my-3 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Number of Trainees in Attendance
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="attendees"
										value={formik.values.attendees}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.attendees &&
									formik.errors.attendees ? (
										<p className="text-red-500">
											{formik.errors.attendees}
										</p>
									) : null}
								</div>
								<div className="md:w-3/4">
									<label className="text-black">
										Number{" "}
										<span className="tracking-wider font-thin">
											OR
										</span>{" "}
										Percentages of Female
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="percentageOfFemales"
										value={formik.values.percentageOfFemales}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.percentageOfFemales &&
									formik.errors.percentageOfFemales ? (
										<p className="text-red-500">
											{formik.errors.percentageOfFemales}
										</p>
									) : null}
								</div>
								<div className="my-3 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Number{" "}
										<span className="tracking-wider font-thin">
											OR
										</span>{" "}
										Percentages of PWDs
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="percentageOfPWD"
										value={formik.values.percentageOfPWD}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.percentageOfPWD &&
									formik.errors.percentageOfPWD ? (
										<p className="text-red-500">
											{formik.errors.percentageOfPWD}
										</p>
									) : null}
								</div>
							</div>
							<div>
								<div className=" w-full md:w-3/4">
									<p
										htmlFor=""
										className="text-black"
									>
										Finalization of DSDP with KPIs and
										Budget with Expenditure Forms
									</p>
									<div className="flex flex-col gap-1 mt-1">
										<div className="flex gap-1">
											<input
												type="radio"
												id="complete"
												name="complete"
												value="complete"
												className="outline-none"
												checked={formik.values.budgetForm  === "complete"}
												onChange={formik.handleChange}

											/>
											<label className="font-thin">
												Completed
											</label>
										</div>
										<div className="flex gap-1">
											<input
												type="radio"
												id="In Progress"
												name="In Progress"
												value="In Progress"
												className="outline-none"
												checked={formik.values.budgetForm === "In Progress"}
												onChange={formik.handleChange}

											/>
											<label className="font-thin">
												In Progress
											</label>
										</div>
										<div className="flex gap-1">
											<input
												type="radio"
												id="Not Started"
												name="Not Started"
												value="Not Started"
												className="outline-none"
												checked={formik.values.budgetForm === "Not Started"}
												onChange={formik.handleChange}

											/>
											<label className="font-thin">
												Not Started
											</label>
										</div>
									</div>
								</div>
								<div className="my-3 w-full md:w-3/4">
									<label className="text-black">
										Evidence
									</label>
									<div className="p-2 py-2 w-full border items-center border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
										<label
											htmlFor="evidence"
											className="text-md text-slate-400"
										>
											Upload Evidence
										</label>
										<input
											placeholder="Upload Evidence"
											type="file"
											id="evidence"
											name="evidence"
											value={
												formik.values
													.evidence
											}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className=" hidden "
										/>

										<label
											htmlFor="evidence"
											className="text-md text-slate-400"
										>
											<CgPushUp className="text-md text-slate-400 items-center float-right" />
										</label>
									</div>

									
								</div>

								<div className="my-3 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Challenges (200 words max)
									</label>
									<textarea
										placeholder="Explain your challenges"
										type="text"
										name="challenges"
										value={formik.values.challenges}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-32"
									/>
									
								</div>
								<div className="my-3 w-full md:w-3/4">
									<label
										htmlFor=""
										className="text-black"
									>
										Lessons Learnt (200 words max)
									</label>
									<textarea
										placeholder="Explain your challenges"
										type="text"
										name="lessonsLearnt"
										value={formik.values.lessonsLearnt}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-32"
									/>
									
								</div>
								<div className="my-[40px] rounded-md w-full md:w-3/4 bg-[#063720] text-center">
									<button
										type="submit"
										className=" text-white w-full md:w-0 md:rounded-none p-5 rounded-md bg-[#063720] md:p-5"
									>
										{!formik.isSubmitting
											? "Submit"
											: "Loading..."}
									</button>
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
