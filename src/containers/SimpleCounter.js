import React, { useState, useEffect } from 'react';

const SimpleCounter = () => {
	const [count, setCount] = useState(0);
	const person = useInputChange('aseven');

	const handleIncrease = () =>{
		setCount((preveCount) => preveCount + 1);
	}

	const handleDecrease = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	}

	useEffect(() => {
		document.title = `count: ${count}`
	});

	useEffect(() => {
		const timer = setTimeout(() => alert('aseven'), 2000);
		return () => clearTimeout(timer);
	})

	return (
			<div>
				<h1>this is a simple counter. </h1>	
				<div>
					<span>count: {count}</span>
				</div>
				<div>
					<button onClick={handleIncrease}>increase</button>
					<button onClick={handleDecrease}>descrease</button>
				</div>
				<div>
					<span>name: </span>
					<input {...person} />
				</div>
			</div>
	);
}

function useInputChange(initialName) {
	const [value, setName] = useState(initialName);
	const handleNameChange = (event) => {
		setName(event.target.value);
	}
	return {
		value,
		onChange: handleNameChange,
	}
}

export default SimpleCounter;