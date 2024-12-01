function Footer(props) {
	return (
		<div style={footerStyle}>
			<p>&copy; 2024 Naero. All Rights Reserved.<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut laboreet.</p>
		</div>
	);
}

const footerStyle = {
	width: "100%",
	height: "262px",
	textAlign: "center",
	margin: "100px 0 0 0",
	padding: "100px 0",
	color: "#a1aeb7",
	backgroundColor: "#3e3e3e",
};

export default Footer;
