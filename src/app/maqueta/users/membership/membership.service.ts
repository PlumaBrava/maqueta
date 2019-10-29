import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './membership.model';
import * as firebase from 'firebase';

@Injectable()
export class MembershipService {
    public url = "api/users";
    refUsersMembership = firebase.firestore().collection('Users-Membership');
    constructor(public http:HttpClient) { }

    // getUsers(): Observable<User[]> {
    //     return this.http.get<User[]>(this.url);
    // }

    // addUser(user:User){	    
    //     return this.http.post(this.url, user);
    // }

    // updateUser(user:User){
    //     return this.http.put(this.url, user);
    // }

    // deleteUser(id: number) {
    //     return this.http.delete(this.url + "/" + id);
    // }


    getUsers(): Promise<User[]> {
       return new Promise((resolve,reject) => { 
        this.refUsersMembership

        .get()
            .then(function(querySnapshot) {
                // let listaUsers:User[]=[];
                let listaUsers:any=[];
                querySnapshot.forEach(function(doc) {
                let u=doc.data();
                u['key']=doc.id;
                listaUsers.push(u);
                console.log(doc.id, " => ", doc.data());
                });
            console.log(listaUsers);    
            resolve(listaUsers);
            })
            .catch(function(error) {
            console.log("Error getting documents: ", error);
            reject(error);
            });
      });
    }


    /// Crea un nuevo usuario. Es una funcionalidad del administrador
    addUser(user:User): Promise<any> {
        return new Promise((resolve,reject) => {
            this.refUsersMembership.add(user)
            .then((doc) => {
                console.log('addUser',doc);
              //     observer.next({
              //   key: doc.id,
              // });
                 resolve({key: doc.id});
            },(error)=>{
                reject(error);
            });
        });
    }

/// Actualiza los datos del ususario. Es una funcionalidad del administrador

    updateUser(key: string, user:User): Promise<any> {
      return new Promise((resolve,reject) => {
         this.refUsersMembership.doc(key).set(user).then((doc) => {
                console.log('updateUser',doc);
            
                 resolve(doc);
            },(error)=>{
             reject(error);
            });
        });
    };
    
   

     deleteUser(key: string,): Promise<any> {
      return new Promise((resolve,reject) => {
         this.refUsersMembership.doc(key).delete().then((doc) => {
                console.log('deleteUser',doc);
            
                 resolve(doc);
            },(error)=>{
             reject(error);
            });
        });
    };
} 