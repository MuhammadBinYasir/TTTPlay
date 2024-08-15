import React from 'react'
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

interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    winner: string;
    onClick: () => void;
}


const AlertDialogs = ({ open, onClose, winner, onClick }: AlertDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-center gap-2'>
                        {winner === 'draw' ? (
                            "OOPS! It's a Draw!!"
                        ) : (
                            <>
                                Congratulations:
                                {winner === 'X' ? (
                                    <img src="/cross.svg" className='w-6 h-6' alt="Cross" />
                                ) : (
                                    <img src="/o.svg" className='w-6 h-6' alt="Circle" />
                                )}
                                Wins
                            </>
                        )}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>Just press 'Reset' to play the game again..</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClick}>Reset</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AlertDialogs