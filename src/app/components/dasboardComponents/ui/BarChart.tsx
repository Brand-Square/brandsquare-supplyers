'use client'
import React, { PureComponent } from 'react';
import { BarChart, Bar,   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarProps } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Mar',   sold: 3200,  launched: 6000 },
    { name: 'Apr',   sold: 3490,  launched: 5000 },
    { name: 'May', sold: 2390,  launched: 4000  },
    { name: 'Jun', sold: 1890,  launched: 3000   },
    { name: 'Jul', sold: 1780,  launched: 2000 },
    { name: 'Aug', sold: 1000, launched: 1000 },
  ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
        <div className="w-full  overflow-hidden py-3">
    
        <div>
        <div className=" h-[280px]">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis tick={{ fill: '#B0B1BD' }}  axisLine={{ stroke: '#ccc', strokeWidth: 1 }} dataKey="name" />
          <YAxis axisLine={false}  tickLine={false} tick={{ fill: '#B0B1BD' }} />
          <Tooltip cursor={{ fill: '#F5F5F5' }} />
          <Legend                     verticalAlign="top" 
              align="right"
              iconSize={10}
               
              wrapperStyle={{
                paddingBottom: '20px'
              }}
    iconType="circle"
 />
          {/* <Bar dataKey="sold" fill="#000035" activeBar={<Rectangle fill="#000035e"   />} />
          <Bar dataKey="launched" fill="#A4CAFF" activeBar={<Rectangle fill="#A4CAFC"   />} /> */}

          <Bar
                  dataKey="sold"
                  fill="#000035"
                  shape={(props: BarProps) => (
                    <motion.rect
                      x={props.x}
                      y={props.y}
                      width={props.width}
                      height={props.height}
                      fill={props.fill}
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: [1, 1.1, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                />

          <Bar
                  dataKey="launched"
                  fill="#A4CAFF"
                  shape={(props: BarProps) => (
                    <motion.rect
                      x={props.x}
                      y={props.y}
                      width={props.width}
                      height={props.height}
                      fill={props.fill}
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: [1, 1.1, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                />
        </BarChart>
       </ResponsiveContainer>
        </div>
        </div>
        </div>
    );
  }
}
