import React from 'react';

import { SubTitle } from './Element/index';
import { InputLine, SelectLine } from './Element';

const Section = ({ subTitle, lines, fetchObject }) => {

    const renderLines = lines => lines.map((line) => {
        if (line.type === 'input') {
            return <InputLine {...line} fetchObject={fetchObject}/>

        } else if (line.type === 'select') {
            return <SelectLine {...line} fetchObject={fetchObject}/>

        } else {
            return <div>No Line</div>
        }
    });

    return (
        <div>
            <SubTitle {...subTitle} />
            {renderLines(lines)}
        </div>
    )
};

export default Section;