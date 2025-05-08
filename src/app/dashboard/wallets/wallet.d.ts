// types/wallet.d.ts
export interface Transaction {
    transactionId: string;
    amount: number;
    type: 'credit' | 'debit';
    date: string;
    status: 'pending' | 'completed' | 'failed';
    _id: string;
  }
  
  export interface WalletData {
    _id: string;
    available_balance: number;
    pending_balance: number;
    status: string;
    currency: string;
    transactions: Transaction[];
    totalBalance: number;
  }
  
  export interface WalletResponse {
    isSuccess: boolean;
    message: string;
    data: WalletData;
  }