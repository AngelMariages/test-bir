import React from 'react';

function Tile({ index, pos, onClick }) {
	const top = pos[0] * 100 + 5;
	const left = pos[1] * 100 + 5;
	const bgLeft = (index % 3) * 100 + 5;
	const bgTop = Math.floor(index / 3) * 100 + 5;

	return <div
		className='tile'
		onClick={onClick}
		style={{ top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px` }}
	/>;
}

export default Tile;