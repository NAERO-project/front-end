import UserInfoForm from "./UserInfoForm";

function ProducerInfoForm(producer) {
	const { producerName, producerAdd, busiNo, producerGrade, producerPhone, user } = producer.user;

	console.log(producer);
	return (
		<div>
			<UserInfoForm user={user}></UserInfoForm>
			<div>
				<h3>브랜드 정보 </h3>
				<div>주문자 정보</div>
				<p>이름 : {producerName}</p>
				<p>이름 : {producerGrade.pgradeName}</p>

				<p>사업자 주소 : {producerAdd}</p>
				<p>사업자 번호 : {busiNo}</p>
				{/* <p>이메일 : {producerGrade.pgradeName}</p> */}
				<p>회사 번호 : {producerPhone ? producerPhone : "등록하지 않음"}</p>
			</div>
		</div>
	);
}

export default ProducerInfoForm;
