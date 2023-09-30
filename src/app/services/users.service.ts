import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiurl= 'https://localhost:44354/api/';
  constructor(private http:HttpClient) { }

  loginUser(email: string, password: string) :Observable<any>{
    const url = `${this.apiurl}/login`;
    const body = { email:email, password:password };
    return this.http.post<any>(url, body);
}

registerUser(name:string,email:string,password:string) : Observable<any>{
  const url=`${this.apiurl}account/register`;
  const body= {"userName":name,"emailAddress":email,"password":password,"appName":"SplitwiseAbp"};
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
  const url=`${this.apiurl}/group`;
  const body={Name: name , Description: description  };
  return   this.http.post<any>(url,body ,httpOptions);
}

getGroups(userId:any)
{
  
  const url = `${this.apiurl}/user/${userId}/groups`;
  return this.http.get(url);
}
addUser(groupname:any,email:string[])
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
  const url = `${this.apiurl}/group/users?groupname=${groupname}`;
  console.log(email,"from");

  const body= email;
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
