import UserInfoForm from "./UserInfoForm";
import UserInfoCSS from "./css/UserInfoForm.module.css";

function ProducerInfoForm({ producer }) {
	const { producerName, producerAdd, busiNo, producerPhone, producerGrade, user } = producer;

	console.log("프로듀서", producer);
	// console.log("등급", producer.producerGrade.pgradeName);
	return (
		<div style={{display: 'flex', flexFlow: 'row'}}>
			<UserInfoForm user={user}></UserInfoForm>
			<div style={{margin: '0 0 0 80px'}}>
				
				<h3 style={{fontWeight: '500', color: '#aaa'}}>브랜드 정보 </h3>
				
				<div className={UserInfoCSS.info}>
					<p style={{width: '75px'}}>이름 : </p>
					<div className={UserInfoCSS.txt}><p> {producerName}</p></div>
				</div>
				
				<div className={UserInfoCSS.info}>
					<p style={{width: '75px'}}>등급 : </p>
					<div className={UserInfoCSS.txt}><p> {producerGrade.pgradeName}</p></div>
				</div>
			
				<div className={UserInfoCSS.info}>
					<p style={{width: '75px'}}>사업자<br/>주소 : </p>
					<div style={{margin: '5px 0 0 0'}} className={UserInfoCSS.txt}><p> {producerAdd}</p></div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{width: '75px'}}>사업자<br/>번호 : </p>
					<div style={{margin: '5px 0 0 0'}} className={UserInfoCSS.txt}><p> {busiNo}</p></div>
				</div>

				<div className={UserInfoCSS.info}>
					<p style={{width: '75px'}}>회사<br/>번호 : </p>
					<div style={{margin: '5px 0 0 0'}} className={UserInfoCSS.txt}><p> {producerPhone ? producerPhone : "등록하지 않음"}</p></div>
				</div>
	
				{/* <p>이메일 : {producerGrade.pgradeName}</p> */}
			</div>
		</div>
	);
}

export default ProducerInfoForm;
