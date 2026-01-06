import { memo, ReactNode } from 'react';

interface MenuItemProps {
    icon: ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const MenuItem = memo( function MenuItem({
    icon,
    label,
    isActive,
    onClick,
}: MenuItemProps) {
    return (
        <button
        onClick={onClick}
        className={`flex flex-col border border-black/0 justify-center items-center p-2.5 rounded-md cursor-pointer transition-all
            ${isActive ? " border-secondary" : ""} bg-dark-accent hover:bg-dark-accent/80`}
        >
            <div className='text-accent'>{ icon }</div>
            <div className='font-sans font-regular text-md'>{ label }</div>
        </button>
    );
})

export default MenuItem;