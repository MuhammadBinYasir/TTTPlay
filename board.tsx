"use client"
import React, { ChangeEvent, useRef, useState } from 'react'
import AlertDialogs from './alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button';
import { truncateText } from '@/lib/utils';

const Board = () => {
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const [data, setData] = useState(['', '', '', '', '', '', '', '', '']);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [x, setX] = useState(0);
    const [O, setO] = useState(0);
    const [win, setWin] = useState<string>("")

    const [player1, setPlayer1] = useState("Player 1")
    const [player2, setPlayer2] = useState("Player 2")

    const handleClick = (key: number) => {
        if (lock || data[key]) {
            // Prevent clicking on locked state or already filled cells
            return;
        }

        const newData = [...data];
        const currentPlayer = count % 2 === 0 ? 'X' : 'O';
        newData[key] = currentPlayer;

        setData(newData);
        const winner = checkWin(newData); // Pass the new data to checkWin

        // Update count after checking for win
        setCount(count + 1);

        // Lock the board if there's a winner
        if (winner) {
            setLock(true);
            if (winner == "X") {
                setX(x + 1);
            } else {
                setO(O + 1);
            }
            setWin(winner)
            openDialog();
        } else if (newData.every(cell => cell)) {
            setLock(true);
            setWin("draw")
            openDialog();
        }
    }
    const checkWin = (data: string[]) => {
        const winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6], // Diagonal from top-right to bottom-left
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return data[a]; // Return the winning player ('X' or 'O')
            }
        }

        return null; // No winner yet
    };
    const resetBoard = () => {
        setData(['', '', '', '', '', '', '', '', ''])
        setLock(false)
        setCount(0)
        setWin("")
    }
    const resetGame = () => {
        resetBoard();
        setX(0);
        setO(0)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === "player1") {
            setPlayer1(value);
        } else if (name === "player2") {
            setPlayer2(value);
        }

    }

    return (
        <>
            <h4 className="text-white font-bold text-2xl mb-3 text-center">TicTacToe Game</h4>
            <div className="grid grid-cols-2 gap-2 my-3">
                <div className='bg-white w-full rounded flex items-center text-slate-900 gap-4 px-3 py-4'>
                    <img src='/cross.svg' className='w-8 h-8' />
                    <div>
                        <h4 className='font-bold text-lg'> {truncateText(player1, 5)} </h4>
                        <p className="text-sm">{x}</p>
                    </div>
                </div>
                <div className='bg-white w-full rounded flex items-center text-slate-900 gap-4 px-3 py-4'>
                    <img src='/o.svg' className='w-8 h-8' />
                    <div>
                        <h4 className='font-bold text-lg'> {truncateText(player2, 5)} </h4>
                        <p className="text-sm">{O}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {data.map((item, key) => (
                    <button
                        className="bg-white rounded flex items-center p-7 w-24 h-24"
                        onClick={() => handleClick(key)}
                    >
                        {item == "X" ? <img src='/cross.svg' className='w-full h-full' /> : null}
                        {item == "O" ? <img src='/o.svg' className='w-full h-full' /> : null}
                    </button>
                ))}
            </div>
            <div className="mx-auto mt-3">

                <button className='w-full h-10 bg-red-100 font-bold text-red-900 rounded' onClick={resetGame}>Reset Game</button>
            </div>
            <AlertDialogs open={isDialogOpen} onClose={closeDialog} winner={win} onClick={resetBoard} />
            <AlertDialog defaultOpen={true}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex items-center gap-2'>Give Name of Players Before We Continue.</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>Give The Name of Players To Continue..</AlertDialogDescription>
                    <div className="mt-5">
                        <div className="flex flex-col gap-3">
                            <div className="rounded flex w-full h-14 items-center gap-2 border border-slate-100">
                                <div className="p-4 w-14 h-14"><img src='/cross.svg' /></div>
                                <input
                                    className='w-full h-full border-none outline-none '
                                    name="player1"
                                    value={player1}
                                    onChange={(e) => handleInput(e)} />
                            </div>
                            <div className="rounded flex w-full h-14 items-center gap-2 border border-slate-100">
                                <div className="p-4 w-14 h-14"><img src='/o.svg' /></div>
                                <input
                                    className='w-full h-full border-none outline-none '
                                    name="player2"
                                    value={player2}
                                    onChange={(e) => handleInput(e)} />
                            </div>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction>Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

export default Board