import { NewGroup, TransactionBody } from "@/types/types";

export async function createNewUser(eventData : {email:string}){
    const response = await fetch("http://localhost:8081/user", {
        method:"POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(eventData.email)
    });
    const userId = response.json();
    return userId;
}  
export async function fetchUserGroups(userId:string){
    const response = await fetch(`http://localhost:8081/${userId}/groups`)
    const groups = await response.json();
    return groups
}
export async function createNewGroup(userId:string,group: NewGroup){
    const response = await fetch(`http://localhost:8081/${userId}/newGroup`, {
        method:"POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(group)
    });
    const resData = await response.json();
    return resData;
}
export async function deleteGroup(groupId:string){
    const response = await fetch(`http://localhost:8081/groups/${groupId}`, {
        method:"DELETE"
    });
    if(!response.ok) throw new Error("cannot delete")
}
export async function fetchTransactions(groupId:string){
    const response = await fetch(`http://localhost:8081/${groupId}/getTransactions`);
    const transactions = await response.json();
    return transactions;
}
export async function newTransaction(groupId:string, body: TransactionBody){    
    const response = await fetch(`http://localhost:8081/${groupId}/newTransaction`, {
        method:"POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}
export async function removeTransaction(transactionId:string, groupId:string){
    console.log(transactionId, groupId);
    
    const response = await fetch(`http://localhost:8081/${transactionId}/delete`, {
        method:"DELETE",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({groupId})
    });
    const data = await response.json();
    return data
}