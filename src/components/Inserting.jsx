import axios from "axios"
import { useEffect, useState } from "react"

const Inserting=(props)=>{  
    const {addExpense}=props
    const [errors,setErrors]=useState({})
            const [title,setTitle] = useState('')
            const [amount,setAmount]=useState(0)
            const handleSubmit =(e)=>{
                e.preventDefault()
                console.log(title,amount)
                let err={}
                if(title.length<3){
                    err.title='Title should be atleast 3 characters long'
                    
                }
                if(!amount){
                    err.amount='Enter a valid amount'
                    
                }
                if(Object.keys(err).length>0){
                    setErrors({...err})
                    return
                }
                // axios.post('https://expensetracker-tea5.onrender.com/add-entry',({"title":title,"amount":amount}))
                addExpense(title, parseInt(amount))
                setTitle('')
                setAmount('')
            }
            const handleTitleChange=(e)=>{
                setTitle(e.target.value)
                setErrors({...errors,title:''})
            }
            const handleAmountChange=(e)=>{
                setAmount(e.target.value)
                setErrors({...errors,amount:''})
            }

    return(
        <form onSubmit={handleSubmit}>
         <div className="insert-title">
            <lable htmlFor="title">Title</lable>
            <input id="title-entry" type="text" value={title} onChange={handleTitleChange}></input>
            {errors.title ? <div className="error">{errors.title}</div>:null}
        </div>
        <div className="insert-amount">
            <label htmlFor="amount">Amount</label>
            <input id="amount-entry" type="number" value={amount} onChange={handleAmountChange}></input>
            {errors.amount ? <div className="error">{errors.amount}</div>:null}
        </div>
            <button type="submit" >Add Transaction</button>
       </form>
       
    )
}

export default Inserting