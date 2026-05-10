import React, { useState } from 'react'

function ExpandLongText({ max_char, text, is_expand, dir, handleClickIsExpand }) {
    return (
        <div dir={dir}>
            {is_expand ? (
                <p className="mr-2"
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
