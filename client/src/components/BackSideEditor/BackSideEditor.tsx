import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { DeltaStatic, Sources } from 'quill';

import './styles.css';

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['Default', 'Roboto', 'Montserrat'];
Quill.register(Font, true);

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['20px', '25px', '30px'];
Quill.register(Size, true);

export default function BackSideEditor({
	value,
	setBack,
	setPlainBack,
}: {
	value: string;
	setBack: (html: string) => void;
	setPlainBack: (char: string) => void;
}) {
	const handleChange = (html: string, _1: DeltaStatic, _2: Sources, editor: ReactQuill.UnprivilegedEditor) => {
		setBack(html);
		setPlainBack(editor.getText());
	};

	const modules = {
		toolbar: [
			[{ font: Font.whitelist }],
			[{ size: Size.whitelist }],
			['bold', 'italic', 'underline', 'strike'],
			[{ align: [] }],
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
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'align',
		'color',
		'background',
		'list',
		'bullet',
		'indent',
	];

	return (
		<div className='text-editor' style={{ width: '100%' }}>
			<ReactQuill
				theme='snow'
				value={value}
				onChange={handleChange}
				placeholder='Back side'
				modules={modules}
				formats={formats}
			/>
		</div>
	);
}
