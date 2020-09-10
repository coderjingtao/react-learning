import React from "react";

const Footer = () => {
    //内嵌样式 inline styles
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em> Joseph, Tarneit, Melbourne, 2020</em>
        </div>
    )
}

export default Footer