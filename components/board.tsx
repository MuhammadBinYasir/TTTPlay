"use client"
import React, { ChangeEvent, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react';
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

    const [turn, setTurn] = useState(true) //true == X && false == O
    const [drawCount, setDrawCount] = useState(0)
    const [playedCount, setPlayedCount] = useState(0)

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
        setTurn(!turn);

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
            setPlayedCount(playedCount+1)
        } else if (newData.every(cell => cell)) {
            setLock(true);
            setWin("draw")
            openDialog();
            setDrawCount(drawCount+1)

            setPlayedCount(playedCount+1)
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
        setTurn(true)
    }
    const resetGame = () => {
        resetBoard();
        setX(0);
        setO(0);
        setDrawCount(0);
        setPlayedCount(0);
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
        <div className='max-w-full w-[650px] bg-white rounded shadow p-7'>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-slate-700 font-bold text-lg sm:text-2xl mb-3 text-left">TicTacToe Game</h4>
                <button className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center text-sm rounded-md" onClick={resetGame}> <RotateCcw /></button>
            </div>
            <hr />
            <div className="grid sm:grid-cols-3 gap-7 my-4">
                <div className="flex flex-wrap sm:flex-col gap-2">
                    <p className='text-slate-500 bg-slate-50 rounded-full text-sm flex items-center gap-2 w-max mx-auto px-5 py-1'>
                        Turn of
                        <img src={turn ? '/cross.svg' : '/o.svg'} className='w-4 h-4 bg-white rounded-full p-[2px]' alt="Cross" />
                    </p>
                    <div className='bg-slate-50 border border-slate-200 w-full rounded flex items-center text-slate-900 gap-4 px-5 py-3'>
                        <img src='/cross.svg' className='w-8 h-8' />
                        <div>
                            <h4 className='font-bold text-base'> {truncateText(player1, 5)} </h4>
                            <p className="text-sm">{x}</p>
                        </div>
                    </div>
                    <div className='bg-slate-50 border border-slate-200 w-full rounded flex items-center text-slate-900 gap-4 px-5 py-3'>
                        <img src='/o.svg' className='w-8 h-8' />
                        <div>
                            <h4 className='font-bold text-base'> {truncateText(player2, 5)} </h4>
                            <p className="text-sm">{O}</p>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='bg-slate-50 border border-slate-200 w-full rounded flex items-center justify-between text-slate-900 gap-4 px-5 py-3'>
                        <h4 className='font-bold text-base'> Drawn </h4>
                        <p className="text-sm">{drawCount}</p>
                    </div>
                    <div className='bg-slate-50 border border-slate-200 w-full rounded flex items-center justify-between text-slate-900 gap-4 px-5 py-3'>
                        <h4 className='font-bold text-base'> Played </h4>
                        <p className="text-sm">{playedCount}</p>
                    </div>
                </div>
                <div className="sm:col-span-2 grid grid-cols-3 gap-4 p-3">
                    {data.map((item, key) => (
                        <button
                            className="bg-slate-50 border border-slate-200 rounded flex items-center p-7 aspect-square"
                            onClick={() => handleClick(key)}
                        >
                            {item == "X" ? <img src='/cross.svg' className='w-full h-full' /> : null}
                            {item == "O" ? <img src='/o.svg' className='w-full h-full' /> : null}
                        </button>
                    ))}
                </div>
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

        </div>
    )
}

export default Board