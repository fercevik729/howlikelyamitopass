'use client';
import SkillsComponent from "@/components/skills"
import React from "react";

export default function Evaluate() {

    const [state, setState] = React.useState('Click an option');
    
    const handleChoose = (option: string) => {
        setState(option);
    };
    const handleSkip = () => {
        setState('skip');
    };
    const handleBack = () => {
        setState('back');
    };

    /*
        Sample Sections

        <SkillsComponent
            title='CSE 130 - Kerry Veenstra'
            question='What grade did you get in CSE 13S?'
            options={['A', 'B', 'C', 'D', 'F']}
            circles={true}
            handleChoose={handleChoose}
            handleBack={handleBack}
            handleSkip={handleSkip}
        />
        
        <SkillsComponent
            title='CSE 130 - Kerry Veenstra'
            question='Across all your classes, how many hours of
            discussion sections/office hours do you attend each week?'
            options={['None', '1-2', '3-5', '6-8', '9+']}
            circles={false}
            handleChoose={handleChoose}
            handleBack={handleBack}
            handleSkip={handleSkip}
        />
    */
}