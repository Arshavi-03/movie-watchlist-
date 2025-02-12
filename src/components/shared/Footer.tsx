'use client';
import { Film } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="flex items-center space-x-2">
                        <Film className="h-6 w-6 text-purple-500" />
                        <span className="text-lg font-bold text-white">CineStream</span>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} CineStream. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}