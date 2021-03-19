import * as React from 'react';
import {
	Stack,
	Spacer,
	Flex,
	Container,
	Heading,
	Text,
	useClipboard,
	Input,
	Button
} from '@chakra-ui/react';
// import { createNamedExports } from 'typescript';

// const URL = '70yearsoldwtf.blogspot.com/2021/01/communication-and-ideas.html';
// const revised =
// 'https://70yearswtf.substack.com/p/communication-and-ideas-21-01-28';
// const textText = `<div class='blog-posts hfeed'>

// <div class="date-outer">

// <h2 class='date-header'><span>Jan 28, 2021</span></h2>

// <div class="date-posts">
// `;
//<h2 class='date-header'><span>Jan 31, 2015</span></h2>
const parseURL = (url: String) => {
	const urlParse = url.match(/com\/(.*?)\/(.*?)\/(.*)\.html/);
	if (urlParse) {
		return {
			year: urlParse[1].substring(2),
			month: urlParse[2],
			slug: urlParse[3]
		};
	}
	return null;
};
const parseData = (data: String) => {
	const match = data.match(/header'><span>(.*?)<\/span/);

	if (match) {
		const date = match[1].match(/[\w]*\s(\d*)/);
		console.log(date);
		if (date) return date[1];
	}
	return null;
};
const makeRevised = (url: string, data: string) => {
	const parsedURL = parseURL(url);
	const parsedDay = parseData(data);
	if (parsedURL && parsedDay) {
		const revised = `https://70yearswtf.substack.com/p/${parsedURL.slug}-${parsedURL.year}-${parsedURL.month}-${parsedDay}`;
		return revised;
	}
	return 'error';
};

function InputURL() {
	const [value, setValue] = React.useState('');
	const [converted, setConverted] = React.useState('');
	const { onCopy, hasCopied } = useClipboard(converted);
	const handleChange = (event: any) => setValue(event.target.value);
	React.useEffect(() => {
		if (converted) onCopy();
	}, [converted]);
	const convertData = (url: string) => {
		fetch('https://cors-anywhere.herokuapp.com/' + url, {
			// mode: 'no-cors', // 'cors' by default
			method: 'GET'
			// 'credentials': 'include',
			// headers: {
			// 	// 'Content-Type': 'text/plain',
			// 	'Origin': '*',
			// }
		})
			.then((response) => {
				// console.log(response);
				return response.text();
			})
			.then((data) => {
				// console.log(data);
				const revised = makeRevised(url, data);
				setConverted(revised);
			})
			.catch((e) => console.log('error', e));
	};
	const convert = () => {
		convertData(value);
		// console.log('value is ', value);
	};
	return (
		<Stack>
			<Heading align="center">URL converter</Heading>
			<Flex w="100%" p={5}>
				<Input
					mr="5"
					border="2px"
					borderColor="gray.400"
					value={value}
					onChange={handleChange}
					placeholder="Enter URL"
				/>
				<Spacer />
				<Button colorScheme="blue" onClick={convert}>
					{hasCopied ? 'Copied' : 'Copy'}
				</Button>
			</Flex>
			<Text> {converted} </Text>
		</Stack>
	);
}

export default function App() {
	return (
		<Container h="100vh" d="flex" alignItems="center" justifyContent="center">
			<InputURL />
		</Container>
	);
}
