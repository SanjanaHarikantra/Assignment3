// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// App.js
// import React, { useState } from 'react';
// import Product from './Product';
// import './App.css';

// const App = () => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const products = [
//     { id: 1, name: 'Product 1', price: 20, rating: 4, category: 'Electronics' },
//     { id: 2, name: 'Product 2', price: 30, rating: 5, category: 'Clothing' },
//      { id: 3, name: 'Product 3', price: 30, rating: 6, category: 'Clothing' },
//      { id: 4, name: 'Product 4', price: 30, rating: 7, category: 'Clothing' },
//      { id: 5, name: 'Product 5', price: 30, rating: 8, category: 'Clothing' },
//      { id: 6, name: 'Product 6', price: 30, rating: 9, category: 'Clothing' },
//     // Add more products as needed
//   ];

//   return (
//     <div className="app">
//       <nav className="navbar">
//         <input type="text" placeholder="Search..." />
//       </nav>
//       <div className="filters">
//         {/* Add category filters here */}
//       </div>
//       <div className="product-list">
//         {products.map((product) => (
//           <Product key={product.id} {...product} addToCart={addToCart} />
//         ))}
//       </div>
//       <div className="cart">
//         <h2>Shopping Cart</h2>
//         <ul>
//           {cart.map((item) => (
//             <li key={item.id}>
//               {item.name} - ${item.price} - Quantity: {item.quantity}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;
//App.js

import React, { useState } from 'react';
import './App.css';
import SearchComponent from './SearchComponent';
import ShowCourseComponent from './ShowCourseComponent';
import UserCartComponent from './UserCartComponent';

function App() {
	const [courses, setCourses] = useState([
		{ id: 1, 
		name: ' T-shirt', 
		price: 499, 
		image: 
'https://media.geeksforgeeks.org/wp-content/uploads/20230823165506/gfg1.png'
		},
		{ id: 2, 
		name: ' Bag', 
		price: 699, 
		image: 
'https://media.geeksforgeeks.org/wp-content/uploads/20230823165553/gfg2.jpg'
		},
		{ id: 3, 
		name: ' Hoodie', 
		price: 799, 
		image: 
'https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg'
		}
	]);

	const [cartCourses, setCartCourses] = useState([]);
	const [searchCourse, setSearchCourse] = useState('');

	const addCourseToCartFunction = (GFGcourse) => {
		const alreadyCourses = cartCourses
							.find(item => item.product.id === GFGcourse.id);
		if (alreadyCourses) {
			const latestCartUpdate = cartCourses.map(item =>
				item.product.id === GFGcourse.id ? { 
				...item, quantity: item.quantity + 1 } 
				: item
			);
			setCartCourses(latestCartUpdate);
		} else {
			setCartCourses([...cartCourses, {product: GFGcourse, quantity: 1}]);
		}
	};

	const deleteCourseFromCartFunction = (GFGCourse) => {
		const updatedCart = cartCourses
							.filter(item => item.product.id !== GFGCourse.id);
		setCartCourses(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cartCourses
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

	const courseSearchUserFunction = (event) => {
		setSearchCourse(event.target.value);
	};

	const filterCourseFunction = courses.filter((course) =>
		course.name.toLowerCase().includes(searchCourse.toLowerCase())
	);

	return (
		<div className="App">
			<SearchComponent searchCourse={searchCourse} 
							courseSearchUserFunction=
								{courseSearchUserFunction} />
			<main className="App-main">
				<ShowCourseComponent
					courses={courses}
					filterCourseFunction={filterCourseFunction}
					addCourseToCartFunction={addCourseToCartFunction}
				/>

				<UserCartComponent
					cartCourses={cartCourses}
					deleteCourseFromCartFunction={deleteCourseFromCartFunction}
					totalAmountCalculationFunction={
						totalAmountCalculationFunction
					}
					setCartCourses={setCartCourses}
				/>
			</main>
		</div>
	);
}

export default App;


