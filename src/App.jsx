import { useEffect, useState } from "react"
import ExpenseItem from "./components/ExpenseItem"
import Inserting from "./components/Inserting"
import axios from "axios"

const App = () =>{
    const [expenses, setExpenses] = useState([])
    useEffect(()=>{
        axios.get('https://expensetracker-tea5.onrender.com/get-entries')
        .then(res =>{
            console.log(res.data)
            setExpenses(res.data)
        }).catch(err=>console.log(err))
    },[])

    const addExpense = (title,amount)=>{
        const nextId=expenses.length===0?1:expenses[expenses.length-1].id+1
        setExpenses([...expenses,{id:nextId, title:title,amount:amount}])
        axios.post('https://expensetracker-tea5.onrender.com/add-entry',({"title":title,"amount":parseInt(amount)}))
    }
    const deleteExpense=(_id)=>{
        setExpenses(expenses.filter((e)=>e._id !== _id))
        axios.delete('https://expensetracker-tea5.onrender.com/delete-entries?id='+_id)
    }
    var income=0
    var expamount =0
    {expenses.forEach((expense)=>{
        if(expense.amount>0){
            income = income+expense.amount
        }
        else{
            expamount = expamount+expense.amount
        }
    })}
    return(
        <>
        <div>
            <div className="header"><div>Expense Tracker</div></div>
            
            <div className="balance">Balance: {income+expamount}</div>
            <div className="income-expense-container">
                <div className="income">
                    <span className="title">Income</span>
                    <span>{income}</span>
                </div>
                <div className="block"></div>
                <div className="expense">
                    <span className="title">Expense</span>
                    <span>{expamount}</span>
                </div>
            </div>
            <Inserting addExpense={addExpense}/>
        </div>
        {expenses.map((expense)=>(
            <ExpenseItem 
            key={expense._id} 
            title={expense.title} 
            _id={expense._id} 
            amount={expense.amount}
            deleteExpense={deleteExpense}
             />
        ))}
        </>
    )
}
export default App