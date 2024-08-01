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
    refetch: () => void;
}
export interface GroupPropsType extends ModalType{
    
}
export interface ConfirmModalProps extends ModalType{
    onConfirm: () => void
}
export interface ExpenseMap{
    expenseMap: {[x:string] : {[x:string]: number}};
}
export interface TransactionModal extends ModalType{
    groupId:string;
    members: string[];

}
export interface UpdateTransactionModalType extends ModalType, TransactionType{

}
export interface TransactionBody{
    transactionName: string;
     transactionValue: number;
     paidBy: string;
    splitAmong: object;
}
export interface TransactionType {
    paidBy: string;
    splitAmong: {[x:string] : number};
    transactionId: string
    transactionName:string;
    transactionValue: number;
    groupId:string;
    refetch: () => void;
}