import React, { useMemo } from 'react';
import * as d3 from "d3"


const MARGIN = 30;
const colors = ["#00DDAD", "#063720", "#f87f7f"];


const PieChart = ({
    width,
    height,
    data,
  }) => {

    const radius = Math.min(width, height) / 2 - MARGIN;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie().value((d) => d.value);
        return pieGenerator(data);
      }, [data]);
    
      const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
          arcPathGenerator({
            innerRadius: 0,
            outerRadius: radius,
            startAngle: p.startAngle,
            endAngle: p.endAngle,
          })
        );
      }, [radius, pie]);


  return (
      <div>
          <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {arcs.map((arc, i) => {
          return <path key={i} d={arc} fill={colors[i]} />;
        })}
      </g>
    </svg>
          
    </div>
  )
}

export default PieChart