import axios, {AxiosResponse} from "axios";
import {NewProfileType} from "../Redux/profileReducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fae6bcdf-1b7b-4b5f-8f9c-eecd7cb26aa8',
    }
})


 export const usersAPI = {

     getUsers(currentPage: number, pageSize: number)  {

         return instance.get(`users?page=${currentPage}&count=${pageSize}`)
             .then(responce => responce.data)
     },
     follow(userId:number){
         return instance.post(`follow/${userId}`, {}
         )
     },
     unFollow(userId:number){
        return instance.delete(`follow/${userId}`)
     }
 }

 export const AuthMeAPI = {
     getAuth() {
         return instance.get(`auth/me`);
     },

     loginIn(email:string,password:string, rememberMe:boolean,captcha:boolean){
         return instance.post(`auth/login`, {email,password,rememberMe,captcha:true});
     },
     loginOut(){

         return instance.delete(`auth/login`,)
     },
     getCaptcha(){
         return instance.get(`/security/get-captcha-url`)
     }
 }
export const profileAPI = {
    getProfile(userId:number) {
        return instance.get<NewProfileType>(`profile/${userId}`).then(res=>res.data)
    },
    getStatus(userId:string){
        return instance.get(`profile/status/${userId}`).then(res=>res.data)
    },
    updateStatus(status:string){
        return instance.put(`profile/status/`, {status:status}).then(res=>res.data)
    },
    savePhoto(photo:any){
        const formData=new FormData();
        formData.append('image', photo)
        return instance.put<AllResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(res=>res.data);
    },
    saveProfile(profile:any){

        return instance.put(`profile/`, profile).then(res=>res.data)
    }
}

type SavePhotoResponseDataType={
    photos: PhotosType
}

type PhotosType={
    small: string| null
    large: string| null
}

export type AllResponseType<D = {}, RC=ResultCodesEnum>={
    data:D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodesEnum {
    Success=0,
    Error=1
}