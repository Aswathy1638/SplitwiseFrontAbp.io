import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiurl= 'https://localhost:44354/api/';
  constructor(private http:HttpClient) { }

  loginUser(email: string, password: string) :Observable<any>{
    const url = `${this.apiurl}account/login`;
    const body = {"userNameOrEmailAddress":email, "password":password,"rememberMe": true };
    return this.http.post<any>(url, body);
}
getToken(email:any,password:any):Observable<any>
{
  const url ='https://localhost:44354/connect/token';
  const body = new HttpParams()
    .set('username', email)
    .set('password', password)
    .set('grant_type', 'password')
    .set('client_id', 'SplitwiseAbp_App')
    .set('scope', 'openid offline_access SplitwiseAbp');
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  return this.http.post<any>(url,body.toString(),{headers});

}
registerUser(name:string,email:string,password:string) : Observable<any>{
  const url=`${this.apiurl}account/register`;
  const body= {"userName":name,"emailAddress":email,"password":password,"grant_type":"password","appName":"SplitwiseAbp"};
  return this.http.post<any>(url,body);
}
createGroup(name:any,description:any):Observable<any>
{ 
  const token = localStorage.getItem('jwtToken');
  console.log(token,"is the jwt");

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })
};
  const url=`${this.apiurl}app/group`;
  const body={Name: name , Description: description  };
  return   this.http.post<any>(url,body ,httpOptions);
}

getGroups(userId:any)
{
  
  const url = `${this.apiurl}app/custom-user-group/groups/${userId}`;
  return this.http.get(url);
}
addUser(groupId:any,userId:any[])
{
  const token =localStorage.getItem('jwtToken');
  const httpOptions ={
    headers:new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
  };
  const url = `${this.apiurl}app/user-group`;
  console.log(groupId,"from");

  const body={"userId":userId,"groupId":groupId};
  console.log(body,"DFd");
  return this.http.post<any>(url,body,httpOptions);
}
getUsers(groupId:any)
{
const url =`${this.apiurl}/groups/users/${groupId}`;
return this.http.get(url );
}

getFriendsList(){
  const token =localStorage.getItem('jwtToken');
  const url =`${this.apiurl}/friends`;
  const httpOptions ={
    headers:new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
  };
  
  return this.http.get(url,httpOptions);
}

getAllUsers(){
  const token =localStorage.getItem('jwtToken');
  const url =`${this.apiurl}/Users`;
  const httpOptions ={
    headers:new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
  };
  
  return this.http.get(url,httpOptions);
}



addFriend(email:any){
  const token =localStorage.getItem('jwtToken');
  const url =`${this.apiurl}/friends?email=${email}`;
  const body={};
  const httpOptions ={
    headers:new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
  };
 return this.http.post<any>(url,body,httpOptions);

}



}
