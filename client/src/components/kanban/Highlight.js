import React from 'react'

const Highlight = ({ isOver, children }) => {
    const className = isOver ? 'highlight-region' : '';
    return (
        <div className ={`highlight${className}`}>
            {children}
        </div>
    );
}

export default Highlight
