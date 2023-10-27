interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // Use return blockchainValue||-99 instead of -99
    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }


    // I think don't need useMemo because this function isn't computationally expensive
    //------------------------test-----------------------
    // const sortedBalances = balances.filter((balance: WalletBalance) => balance.amount > 0).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    //     const leftPriority = getPriority(lhs.blockchain);
    //     const rightPriority = getPriority(rhs.blockchain);
    //     return rightPriority - leftPriority;
    // });

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99) {
                if (balance.amount <= 0) {
                    return true;
                }
            }
            return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
        });
    }, [balances, prices]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })


    // Repeat sortedBalances.map 2 times to create formattedBalances and rows so iterating, i think can optimize by creating both in single function
    // Use key = unique property better index
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow 
            className= { classes.row }
        key = { index }
        amount = { balance.amount }
        usdValue = { usdValue }
        formattedAmount = { balance.formatted }
            />;)
})

return (
    <div { ...rest } >
    { rows }
    < /div>
)
}