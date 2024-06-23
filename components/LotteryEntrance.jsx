import { abi, contractAddresses } from "@/constants"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useEffect, useState } from "react";
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core";

export default function LotteryEntranceNoMemo() {
    const { chainId: hexChainId, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(hexChainId);
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0");
    const [numberOfPlayers, setNumberOfPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification();


    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: 'enterRaffle',
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        const numPlayersFromCall = (await getPlayersNumber()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall);
        setNumberOfPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }


    useEffect(() => {
        console.log('useEffect');
        if (isWeb3Enabled) {
            console.log('useEffect: isWeb3Enabled');
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        try {
            await tx.wait(1);
            updateUI();
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewNotification = () => {
        dispatch({
            type: 'info',
            message: 'Transaction Complete!',
            title: 'Tx Notification',
            position: 'topR',
            icon: 'bell'
        })
    }

    return (
        <div>hi From lottery entrance
            {
                raffleAddress
                    ? (
                        <div>
                            <button
                                onClick={async function () {
                                    await enterRaffle({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }}
                                disabled={isLoading || isFetching}
                            >
                                Enter Raffle
                            </button>
                            <div>entranceFee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH</div>
                            <div>The current number of players is: {numberOfPlayers}</div>
                            <div>The most previous winner was: {recentWinner}</div>
                        </div>
                    ) : (<div>Please connect to a supported chain </div>)
            }

        </div>
    )
}