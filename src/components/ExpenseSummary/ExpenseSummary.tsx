import { ExpenseMap } from "@/types/types";

function ExpenseSummary({expenseMap, members}: ExpenseMap) {
  if(!expenseMap){
    <div>Data is being fetched</div>
  }else{
    const extractedMembers = members.map((member) => expenseMap[member])
  const messages: string[] = []
    for (let index = 0; index < members.length; index++) {
      const member = members[index];
      const row = extractedMembers[index];
      row.map((value: number, index: number) => {
        if(value !== 0) messages.push(`${member} ${value >0 ? 'is owed by' : 'owes'} ${members[index]} $${value}`)
      })
    }    
    return (
      messages.length > 0 ? (
        <ul className="expense-summary">
        {messages.map((message, index) => <li key={index}>
          {message}
        </li>)}
      </ul>
      ) : <h1>This group is settled!</h1>
    )
  }
}

export default ExpenseSummary