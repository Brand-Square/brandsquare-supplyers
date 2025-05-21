'use client'

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProgressButton } from '../../app/dashboard/wallets/ProgressBtn'
import { formatDate } from '@/lib/utils';
import { useRouter } from "next/navigation";

interface Transaction {
    transactionId: string;
    amount: number;
    date: string;
    _id: string;
    percentage_paid: number;
    amount_received: number;
    supplierId: string;
    type: string;
    from: string;
    description: string;
    reference: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface WalletTableProps {
    transactions: Transaction[];
}

const WalletTable = ({ transactions }: WalletTableProps) => {
    const router = useRouter();

    const handleViewDetails = (transactionId: string) => {
        router.push(`/dashboard/wallets/${transactionId}/`);
    };
    return (
        <div className="w-full">
            <div className="relative overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    Payment Date
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <ArrowUpDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                From
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paid status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                            <tr key={transaction._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div className='flex flex-col'>
                                        <span>{transaction.transactionId}</span>
                                        <span>{formatDate(transaction.date)}</span>
                                    </div>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {transaction.amount.toLocaleString('en-NG')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {transaction.from}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span>
                                        <ProgressButton value={transaction.percentage_paid} />
                                    </span>
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </span>
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleViewDetails(transaction._id)}
                                            >View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WalletTable;