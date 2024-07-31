import { ExpenseMap } from "@/types/types";

function ExpenseSummary({expenseMap, members}: ExpenseMap) {
  if(!expenseMap){
    <div>Data is being fetched</div>
  }else{
  const outerMembers = Object.keys(expenseMap);
  return outerMembers.map((outerMember) => {
    const innerObject = expenseMap[outerMember];
    const innerMembers = Object.keys(innerObject);
    return innerMembers.map((innerMember, index) => <div key={index}>
      {(innerMember !== outerMember && innerObject[innerMember] !==0 ) && (innerObject[innerMember] > 0 ? 
      `${outerMember} is owed by ${innerMember} ${innerObject[innerMember]}` 
        : `${outerMember} owes ${innerMember} ${innerObject[innerMember]}`)}
    </div>)
  })
  }
}

export default ExpenseSummary