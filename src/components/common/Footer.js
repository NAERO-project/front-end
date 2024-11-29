function Footer(props) {
	return (
		<div style={footerStyle}>
			<p>&copy; 2024 Naero. All Rights Reserved. 더미 푸터</p>
		</div>
	);
}

const footerStyle = {
	width: "100%",
	// height: "262px",
	textAlign: "center",
	margin: "100px 0 0 0",
	padding: "70px 0",
	// position: "absolute",
	// bottom: "0",
	color: "3E3E3E",
	backgroundColor: "#333",
};

export default Footer;
