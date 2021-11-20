import React, { useEffect } from 'react';
import {Field, InjectedFormProps, reduxForm}  from 'redux-form';
import { Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import { connect, useDispatch } from 'react-redux';
import {getCaptchaTC, LoginTC} from "../../Redux/authReducer";
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../../Redux/reduxStore";
import {Captcha} from "./Captcha";
import style from './Login.module.css'
import styles from '../common/FormsControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha:boolean
}

type MapStatePropsType={
    isAuth: boolean
    captcha:string
}

type  MapDispatchPropsType={
    LoginTC: (email: string, password: string, rememberMe: boolean,captcha:boolean)=> void

}

type AllType= MapStatePropsType & MapDispatchPropsType

const maxLength30 = maxLengthCreator(30)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> =
    (props) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getCaptchaTC())
    },[])


        return (
            <form onSubmit={props.handleSubmit}>
                <div >
                    {/*{CreateField('Email', 'email', [requiredField,maxLength30],Input)}*/}
                    <Field className={style.input} placeholder={'Email'} name={'email'}
                           validate={[requiredField,maxLength30 ]}
                           component={Input}/>
                </div>
                <div>
                    <Field className={style.input} placeholder={'Password'} type={'password'} name={'password'} component={Input}
                           validate={[requiredField,maxLength30 ]}
                    />

                    <Field className={style.input} placeholder={'Captcha'} name={'captcha'} component={Input}
                           validate={[requiredField,maxLength30 ]}
                    />

                </div>
                <div>
                    <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
                </div>
                {props.error? <div className={styles.formSummaryError}>
                    {props.error}
                </div>:''}
                <div>
                    <button className={style.logIn} type="submit">Login</button>
                </div>
            </form>
        )
    }


const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

 const Login = (props:AllType) => {
    const onSubmit = (formData: FormDataType) => {
        props.LoginTC(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }


    if(props.isAuth){

        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>

            <LoginReduxForm onSubmit={onSubmit} />

            <img src={props.captcha}/>
        </div>
    )
}
const mapStateToProps=(state:AppStateType): MapStatePropsType=>({
    isAuth: state.auth.isAuth,
    captcha:state.auth.captcha
})

export default connect(mapStateToProps, {LoginTC,})(Login)