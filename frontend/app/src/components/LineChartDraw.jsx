import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function LineChartDraw(props) {
      const [data, setData] = useState([])
      useEffect(() =>{
      const info = []
    
      if(props.visit.visit_statistics){
      for(let i = 0; i<props.visit.visit_statistics.length; i++){
        let d = {
          year  :props.visit.visit_statistics[i]["date"],
          weight:props.visit.visit_statistics[i]["visit"]["height"],
          height:props.visit.visit_statistics[i]["visit"]["weight"] 
        }
        info.push(d)
      }
      setData(info) 
      console.log(data)
    }
    }, [props.visit.visit_statistics])

    return(
        <LineChart data={data} margin={{top:5, bottom:5}} width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <Line type="monotone" dataKey="height" stroke="#82ca9d" />
        </LineChart>
    )
}