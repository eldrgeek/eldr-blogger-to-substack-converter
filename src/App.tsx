import * as React from 'react';
import { Container } from '@chakra-ui/react';

const URL = '70yearsoldwtf.blogspot.com/2021/01/communication-and-ideas.html';
// const revised =
// 'https://70yearswtf.substack.com/p/communication-and-ideas-21-01-28';
const textText = `<div class='blog-posts hfeed'>

<div class="date-outer">

<h2 class='date-header'><span>Jan 28, 2021</span></h2>

<div class="date-posts">
`;
//<h2 class='date-header'><span>Jan 31, 2015</span></h2>
const parseURL = (url: String) => {
	const urlParse = URL.match(/com\/(.*?)\/(.*?)\/(.*)\.html/);
	if (urlParse) {
		return {
			year: urlParse[1],
			mont: urlParse[2],
			slug: urlParse[3]
		};
	}
	return null;
};
const parseData = (data: String) => {
	const match = data.match(/header(.*?)span/);

	if (match) {
		return match[1];
	} else {
		return null;
	}
};

export default function App() {
	React.useEffect(() => {
		// fetch('xhttps://cors-anywhere.herokuapp.com/' + URL, {
		// 	// mode: 'no-cors', // 'cors' by default
		// 	method: 'GET'
		// 	// 'credentials': 'include',
		// 	// headers: {
		// 	// 	// 'Content-Type': 'text/plain',
		// 	// 	'Origin': '*',
		// 	// }
		// })
		// 	.then((response) => {
		// 		console.log(response);
		// 		return response.text();
		// 	})
		// 	.then((data) => {
		// 		console.log(data)

		// 	})
		// .catch((e) => console.log('error', e));
		console.log('DATA', parseURL(URL), parseData(textText));
	}, []);
	return (
		<Container h="100vh" d="flex" alignItems="center" justifyContent="center">
			stuff
		</Container>
	);
}
