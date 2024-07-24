import { ExpenseMap } from "@/types/types";

function ExpenseSummary({expenseMap}: ExpenseMap) {
    const members = Object.keys(expenseMap);
    // console.log('members', members)
    let emptyArray: string[] = [];
    members.forEach(member => emptyArray.push(expenseMap[member]))
    // console.log('the map', emptyArray);
    
    
  return (
    <div>ExpenseSummary</div>
  )
}

export default ExpenseSummary