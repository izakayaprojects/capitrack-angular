import { TransactionItem, TransactionType } from "../_models/transaction-item";

export const MOCK_TRANSACTION_ITEMS: TransactionItem[] = [
	new TransactionItem("001", "23745283", 450, TransactionType.Deposit),
	new TransactionItem("002", "25312635", 100, TransactionType.Dividend),
	new TransactionItem("003", "12341212", 350, TransactionType.Buy),
	new TransactionItem("004", "62317351", 50, TransactionType.Dividend),
	new TransactionItem("005", "12875312", 75, TransactionType.Sell)
];