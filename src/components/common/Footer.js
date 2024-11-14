function Footer(props) {
	return (
		<div style={footerStyle}>
			<p>&copy; 2024 Naero. All Rights Reserved. 더미 푸터</p>
		</div>
	);
}

const footerStyle = {
	backgroundColor: "#333",
	color: "3E3E3E",
	textAlign: "center",
	padding: "20px 0",
	position: "absolute",
	bottom: "0",
	width: "100%",
};

export default Footer;
