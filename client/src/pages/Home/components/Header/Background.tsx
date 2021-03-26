import React from 'react';

export default function Background() {
	return (
		<svg width='100%' height='1058'>
			<defs>
				<clipPath id='clipPath'>
					<rect x='58' y='153' width='100%' height='588.359' fill='none' />
				</clipPath>
				<clipPath id='clipPath-2'>
					<rect x='15' y='74' width='100%' height='766.029' fill='none' />
				</clipPath>
				<linearGradient
					id='linear-gradient'
					x1='0.021'
					y1='0.709'
					x2='0.93'
					y2='0.068'
					gradientUnits='objectBoundingBox'
				>
					<stop offset='0' stopColor='#77f1fb' />
					<stop offset='1' stopColor='#78acfc' />
				</linearGradient>
				<filter id='Ellipse_16' x='400.574' y='682.487' width='312.32' height='303.479' filterUnits='userSpaceOnUse'>
					<feOffset dy='33' />
					<feGaussianBlur stdDeviation='18' result='blur' />
					<feFlood floodOpacity='0.161' />
					<feComposite operator='in' in2='blur' />
					<feComposite in='SourceGraphic' />
				</filter>
				<filter id='Ellipse_2' x='515' y='807' width='250' height='251' filterUnits='userSpaceOnUse'>
					<feOffset dy='33' />
					<feGaussianBlur stdDeviation='18' result='blur-2' />
					<feFlood floodOpacity='0.161' />
					<feComposite operator='in' in2='blur-2' />
					<feComposite in='SourceGraphic' />
				</filter>
			</defs>
			<g
				id='Scroll_Group_2'
				data-name='Scroll Group 2'
				transform='translate(-57.7 230.2)'
				clipPath='url(#clipPath)'
				style={{ isolation: 'isolate' }}
			>
				<path
					id='Path_2'
					data-name='Path 2'
					d='M-50.7,375.052,1937.779,252.2l19.53,616.875s-307.148,253.145-850.43,13.069S-11.641,923.565-11.641,923.565Z'
					transform='translate(50.7 -252.2)'
					fill='#78cefc'
				/>
			</g>
			<g
				id='Scroll_Group_1'
				data-name='Scroll Group 1'
				transform='translate(-15 -74)'
				clipPath='url(#clipPath-2)'
				style={{ isolation: 'isolate' }}
			>
				<path
					id='Path_1'
					data-name='Path 1'
					d='M-29,535.694s343.135-106.573,599,66,612-99,612-99,412-199.5,412,66,108.4,305.135,286,33,15-617,15-617l-1924-20Z'
					transform='translate(29 35.306)'
					fill='url(#linear-gradient)'
				/>
			</g>
			<g transform='matrix(1, 0, 0, 1, 0, 0)' filter='url(#Ellipse_16)'>
				<ellipse
					id='Ellipse_16-2'
					data-name='Ellipse 16'
					cx='100.5'
					cy='96'
					rx='100.5'
					ry='96'
					transform='matrix(1, 0.02, -0.02, 1, 457.92, 703.49)'
					fill='#78acfc'
				/>
			</g>
			<g transform='matrix(1, 0, 0, 1, 0, 0)' filter='url(#Ellipse_2)'>
				<ellipse
					id='Ellipse_2-2'
					data-name='Ellipse 2'
					cx='71'
					cy='71.5'
					rx='71'
					ry='71.5'
					transform='translate(569 828)'
					fill='#78acfc'
				/>
			</g>
		</svg>
	);
}
