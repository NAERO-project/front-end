import UserCSS from "./UserPage.module.css"
function SignupContainer(props) {
    const imagePath = process.env.PUBLIC_URL + "/neroLogo_Olive.png";
    return <div className={UserCSS.signup_container}>
        <img className={UserCSS.logo_image} src={imagePath} alt="NeroLogo" />
        <div className={UserCSS.input_container}>
        {props.children}</div>
        </div>
}

export default SignupContainer;
