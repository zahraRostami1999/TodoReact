import React, { useState } from 'react'

function ExpandLongText({ max_char, text, is_expand, handleClickIsExpand }) {
    return (
        <div dir='rtl'>
            {is_expand ? (
                <p className=""
                onClick={() => handleClickIsExpand(is_expand)}>
                    {text}
                </p>
            ) : (
                <div className='flex gap-1'>
                    <p>
                        {text.slice(0, max_char)}
                    </p>
                    <span className='cursor-pointer' onClick={() => handleClickIsExpand(is_expand)}>
                        ...
                    </span>
                </div>
            )}
        </div>
    )
}

export default ExpandLongText
