"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"

const Page = () => {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

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
			totalRegistered: Yup.number("Please enter valid numeric values").required(
				"This value is required"
			),
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
        onSubmit: async (values, {setSubmitting}) => {
            console.log('Form submitted with values:', values);

			try {
				if (!formik.isValid) {
					setSubmitting(false);
					return;
				}
				setLoading(true)
				const response = await axios.post(
					"http://localhost:3005/report/data",
					values
				)
				console.log(response, "res");
				if (response.status === 200) {
					toast.success("Form submitted successfully!");
					setSubmitting(false);
					router.push("/");

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
				style={{ backgroundImage: "url(./bg.png)" }}
				className="min-h-screen overflow-y-scroll md:h-[1000px] w-full relative"
			>

				<div className="absolute top-[700px] px-5 sm:px-0 md:left-[500px] sm:top-[90px]">
					<h2 className="font-bold text-4xl">Welcome!</h2>
					<p>Kindly crosscheck the details before you submit</p>
					<form onSubmit={formik.handleSubmit}>
						<div className="md:flex py-10">
							<div>
								<div className=" md:w-3/4">
									<label>Total Registered Applicants</label>
									<input
										placeholder="Enter value"
										type="text"
										name="totalRegistered"
										value={formik.values.totalRegistered}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.totalRegistered &&
									formik.errors.totalRegistered ? (
										<p className="text-red-500">
											{formik.errors.totalRegistered}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Percentage of Enrolled Participants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="percentageOfEnrolledParticipants"
										value={
											formik.values
												.percentageOfEnrolledParticipants
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched
										.percentageOfEnrolledParticipants &&
									formik.errors
										.percentageOfEnrolledParticipants ? (
										<p className="text-red-500">
											{
												formik.errors
													.percentageOfEnrolledParticipants
											}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Total Female Applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="femaleApplicants"
										value={formik.values.femaleApplicants}
										onChange={formik.handleChange}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.femaleApplicants &&
									formik.errors.femaleApplicants ? (
										<p className="text-red-500">
											{formik.errors.femaleApplicants}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Total Male Applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="maleApplicants"
										value={formik.values.maleApplicants}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.maleApplicants &&
									formik.errors.maleApplicants ? (
										<p className="text-red-500">
											{formik.errors.maleApplicants}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Percentage of Female Applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="percentageOfFemaleApplicants"
										value={
											formik.values
												.percentageOfFemaleApplicants
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched
										.percentageOfFemaleApplicants &&
									formik.errors
										.percentageOfFemaleApplicants ? (
										<p className="text-red-500">
											{
												formik.errors
													.percentageOfFemaleApplicants
											}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Total disabled Applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="totalDisabled"
										value={formik.values.totalDisabled}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.totalDisabled &&
									formik.errors.totalDisabled ? (
										<p className="text-red-500">
											{formik.errors.totalDisabled}
										</p>
									) : null}
								</div>
							</div>
							<div>
								<div className="md:w-3/4">
									<label>Total Disabled Females</label>
									<input
										placeholder="Enter value"
										type="text"
										name="disabledFemale"
										value={formik.values.disabledFemale}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.disabledFemale &&
									formik.errors.disabledFemale ? (
										<p className="text-red-500">
											{formik.errors.disabledFemale}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Total Disabled Males
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="disabledMale"
										value={formik.values.disabledMale}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.disabledMale &&
									formik.errors.disabledMale ? (
										<p className="text-red-500">
											{formik.errors.disabledMale}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Percentage of Disabled Applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="percentageOfDisabled"
										value={
											formik.values.percentageOfDisabled
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.percentageOfDisabled &&
									formik.errors.percentageOfDisabled ? (
										<p className="text-red-500">
											{formik.errors.percentageOfDisabled}
										</p>
									) : null}
								</div>
								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Number of Digital Marketing and CRM +
										Specialization applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="marketingApplicants"
										value={
											formik.values.marketingApplicants
										}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.marketingApplicants &&
									formik.errors.marketingApplicants ? (
										<p className="text-red-500">
											{formik.errors.marketingApplicants}
										</p>
									) : null}
								</div>

								<div className="my-5 w-full md:w-3/4">
									<label htmlFor="">
										Number of Digital Day Trading + Access
										to Funding applicants
									</label>
									<input
										placeholder="Enter value"
										type="text"
										name="tradingApplicants"
										value={formik.values.tradingApplicants}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									{formik.touched.tradingApplicants &&
									formik.errors.tradingApplicants ? (
										<p className="text-red-500">
											{formik.errors.tradingApplicants}
										</p>
									) : null}
								</div>
								<div className="my-[50px] rounded-md w-full md:w-3/4 bg-[#063720] text-center">
									<button
										type="submit"
                                        className="bg-[#063720] text-white p-5"
									>
										{!formik.isSubmitting ? "Submit" : "Loading..."}
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
