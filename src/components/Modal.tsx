import React, { type ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { X } from 'lucide-react';

const Modal = ({children, setShowModal, onConfirm}: {children: ReactNode, setShowModal: (state: boolean) => void, onConfirm: () => void})
: React.JSX.Element => {

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                onClick={() => setShowModal(false)}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        className="absolute right-3 top-3 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowModal(false)}
                    >
                        <X size={18} />
                    </button>

                    {/* Content */}
                    <div className="px-6 pt-6 pb-4">
                        {children}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 px-6 pb-6 pt-2 justify-end">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-neon text-black hover:brightness-110 transition-all"
                        >
                            Confirm
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Modal;
