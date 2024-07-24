export interface GroupType{
    groupId:string;
    name:string;
    createdAt: string;
    groupMembers:string[];
}
export interface NewGroup{
    name:string | undefined;
    groupMembers:string[];
    createdAt: string;
}
export interface ModalType{
    opened: boolean;
    close: () => void;
    title: string;
    centered:boolean;
}
export interface GroupPropsType extends ModalType{
    
}
export interface ConfirmModalProps extends ModalType{
    onConfirm: () => void
}
export interface ExpenseMap{
    expenseMap: object;
}
export interface TransactionModal extends ModalType{
    groupId:string;
    members: string[];
    expensesMap: object;
}
export interface TransactionBody{
    transactionName: string;
     transactionValue: number;
     paidBy: string;
    splitAmong: string;
     expensesMap: object;
}