import { useMoralis } from "react-moralis";
import { useEffect } from "react";
export default function Header() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) return
        if (window.localStorage.getItem('connected')) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            if (!account) {
                window.localStorage.removeItem('connected');
                deactivateWeb3();
            }
        })
    }, [])

    const handleConnect = async () => {
        await enableWeb3();
        window.localStorage.setItem('connected', 'injected')
    }
    return (
        <>{account
            ? (<div>Connected! address: {account}</div>)
            : (<button disabled={isWeb3EnableLoading} onClick={handleConnect}>connnect</button>)}</>
    )
}