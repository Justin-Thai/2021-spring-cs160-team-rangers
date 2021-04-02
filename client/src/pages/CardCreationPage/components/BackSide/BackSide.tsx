import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './styles.css';

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['Roboto', 'Raleway', 'Montserrat', 'Lato', 'Rubik'];
Quill.register(Font, true);

export default function BackSide({ value, setBack }: { value: string; setBack: (html: string) => void }) {
	const handleChange = (html: string) => {
		setBack(html);
	};

	const modules = {
		toolbar: [
			[{ font: Font.whitelist }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ color: [] }, { background: [] }],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			['clean'],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	};

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'color',
		'background',
		'list',
		'bullet',
		'indent',
	];

	return (
		<div className='text-editor' style={{ width: '100%' }}>
			<ReactQuill value={value} onChange={handleChange} placeholder='Back side' modules={modules} formats={formats} />
		</div>
	);
}
