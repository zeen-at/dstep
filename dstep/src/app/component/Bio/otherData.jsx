/** @format */

import React from "react"

const Bio = ({ title, value, textColor, topMargin }) => {
	return (
		<>
            <div key={title} className={`flex gap-6 ${topMargin ? `${topMargin}` : "mt-3"} ml-4 ${textColor ? `${textColor}` : "text-black"}`}>
				<p className="text-sm font-thin">{title}</p>
				<p className="text-sm">{value}</p>
			</div>
		</>
	)
}

export default Bio
