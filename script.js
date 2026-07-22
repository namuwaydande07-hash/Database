import {initializeApp} from
 "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import{
getDatabase,
ref,
push,
set,
onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyAzSNFk43TLPJgoH8V5R_FmyhdCMIIiufY",
	authDomain: "database-1-70ac0.firebaseapp.com",
  databaseURL: "https://database-1-70ac0-default-rtdb.asia-southeast1.firebasedatabase.app",
 	projectId: "database-1-70ac0",
  storageBucket: "database-1-70ac0.firebasestorage.app",
  messagingSenderId: "775211759499",
 	appId: "1:775211759499:web:6ebfbae3c44942634e618e",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData(){
localStorage.setItem("students",JSON.stringify(students));
}

function addStudent(){

let name=document.getElementById("name").value;
let college=document.getElementById("college").value;
let marks=document.getElementById("marks").value;
let category=document.getElementById("category").value;
let income=document.getElementById("income").value;

if(name==""||college==""||marks==""||income==""){
alert("Please Fill All Fields");
return;
}

students.push({

name:name,
college:college,
marks:marks,
category:category,
income:income,
status:"Pending"

});

saveData();
displayData();

document.getElementById("name").value="";
document.getElementById("college").value="";
document.getElementById("marks").value="";
document.getElementById("income").value="";

}

function displayData(){

let body=document.getElementById("tableBody");

body.innerHTML="";

let search=document.getElementById("search").value.toLowerCase();

let filter=document.getElementById("filter").value;

students.forEach((student,index)=>{

if(student.name.toLowerCase().includes(search)){

if(filter=="All"||student.status==filter){

body.innerHTML+=`

<tr>

<td>${student.name}</td>

<td>${student.college}</td>

<td>${student.marks}%</td>

<td>${student.category}</td>

<td>₹${student.income}</td>

<td>${student.status}</td>

<td>

<button class="approve" onclick="approve(${index})">Approve</button>

<button class="reject" onclick="reject(${index})">Reject</button>

<button class="delete" onclick="removeData(${index})">Delete</button>

</td>

</tr>

`;

}

}

});

dashboard();

}

function approve(index){

students[index].status="Approved";

saveData();

displayData();

}

function reject(index){

students[index].status="Rejected";

saveData();

displayData();

}

function removeData(index){

if(confirm("Delete Application?")){

students.splice(index,1);

saveData();

displayData();

}

}

function dashboard(){

document.getElementById("total").innerHTML=students.length;

let approved=students.filter(x=>x.status=="Approved").length;

let rejected=students.filter(x=>x.status=="Rejected").length;

let pending=students.filter(x=>x.status=="Pending").length;

document.getElementById("approved").innerHTML=approved;

document.getElementById("rejected").innerHTML=rejected;

document.getElementById("pending").innerHTML=pending;

}

displayData();
