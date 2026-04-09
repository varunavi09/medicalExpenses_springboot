import React,{useState,useEffect} from "react";
import axios from "axios";

function App(){

const API="http://localhost:8080/expenses";

const [patientName,setPatientName]=useState("");
const [age,setAge]=useState("");
const [scanExpense,setScanExpense]=useState("");
const [medicineExpense,setMedicineExpense]=useState("");
const [doctorFee,setDoctorFee]=useState("");
const [initialAmount,setInitialAmount]=useState("");

const [expenses,setExpenses]=useState([]);
const [editId,setEditId]=useState(null);

useEffect(()=>{
loadExpenses();
},[]);

const loadExpenses=()=>{
axios.get(API)
.then(res=>{
setExpenses(res.data);
});
};

const saveExpense=()=>{

const data={
patientName,
age,
scanExpense,
medicineExpense,
doctorFee,
initialAmount
};

if(editId){
axios.put(API+"/"+editId,data)
.then(()=>{
setEditId(null);
clearFields();
loadExpenses();
});
}
else{
axios.post(API,data)
.then(()=>{
clearFields();
loadExpenses();
});
}
};

const editExpense=(exp)=>{
setPatientName(exp.patientName);
setAge(exp.age);
setScanExpense(exp.scanExpense);
setMedicineExpense(exp.medicineExpense);
setDoctorFee(exp.doctorFee);
setInitialAmount(exp.initialAmount);
setEditId(exp.id);
};

const deleteExpense=(id)=>{
axios.delete(API+"/"+id)
.then(loadExpenses);
};

const clearFields=()=>{
setPatientName("");
setAge("");
setScanExpense("");
setMedicineExpense("");
setDoctorFee("");
setInitialAmount("");
};

return(
<div style={{padding:"20px"}}>

<h2>Medical Expense Manager</h2>

<input placeholder="Patient Name" value={patientName}
onChange={(e)=>setPatientName(e.target.value)} />

<input placeholder="Age" value={age}
onChange={(e)=>setAge(e.target.value)} />

<input placeholder="Scan Expense" value={scanExpense}
onChange={(e)=>setScanExpense(e.target.value)} />

<input placeholder="Medicine Expense" value={medicineExpense}
onChange={(e)=>setMedicineExpense(e.target.value)} />

<input placeholder="Doctor Fee" value={doctorFee}
onChange={(e)=>setDoctorFee(e.target.value)} />

<input placeholder="Initial Amount" value={initialAmount}
onChange={(e)=>setInitialAmount(e.target.value)} />

<button onClick={saveExpense}>
{editId ? "Update" : "Save"}
</button>

<hr/>

<table border="1">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Age</th>
<th>Scan</th>
<th>Medicine</th>
<th>Doctor</th>
<th>Initial</th>
<th>Total</th>
<th>Balance</th>
<th>Actions</th>
</tr>
</thead>

<tbody>
{expenses.map(e=>(
<tr key={e.id}>
<td>{e.id}</td>
<td>{e.patientName}</td>
<td>{e.age}</td>
<td>{e.scanExpense}</td>
<td>{e.medicineExpense}</td>
<td>{e.doctorFee}</td>
<td>{e.initialAmount}</td>
<td>{e.totalExpense}</td>
<td>{e.balance}</td>

<td>
<button onClick={()=>editExpense(e)}>Edit</button>
<button onClick={()=>deleteExpense(e.id)}>Delete</button>
</td>

</tr>
))}
</tbody>
</table>

</div>
);
}

export default App;
