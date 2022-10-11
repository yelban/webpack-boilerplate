import React from 'react';

console.log(`%c${process.env.REACT_APP_API_URL}`, 'color:darkorange');

function App() {
	return <h1 className='p-16 text-green-600 hover:text-green-500 text-6xl text-center'>Hello World!</h1>;
}

export default App;
