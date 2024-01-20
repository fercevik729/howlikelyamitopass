import React from "react";
import { Button, ButtonBase } from "@mui/material";

export default function SkillsComponent(props: {
    title: string
    question: string
    options: string[]
    circles: boolean
}) {
    return (
        <div className="w-full flex flex-col items-center">
            <p className="text-2xl mb-8 text-center">{props.title}</p>
            <p className="text-lg mb-4 text-center">{props.question}</p>
            <div className="flex flex-col items-center h-12 w-full mb-4">
                <div className="flex-grow h-full flex justify-around">
                    
                        {props.options.map(option => {
                            if (props.circles) {
                                return (
                                    <div className="transition-all duration-150 mx-4 w-12 h-12 rounded-full border-2 border-white hover:bg-white hover:text-black flex items-center justify-center">
                                        {option}
                                    </div>
                                )
                            }
                            return (
                                <div className="transition-all duration-150 mx-4 w-20 h-12 rounded-md border-2 border-white hover:bg-white hover:text-black flex items-center justify-center">
                                    {option}
                                </div>
                            )
                        })}
                </div>
            </div>
            <p className="text-sm text-gray-300 hover:text-gray-100">Skip</p>
            <p className="text-sm text-gray-300 hover:text-gray-100">Back</p>
        </div>
    );
}