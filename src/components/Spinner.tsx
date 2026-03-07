type SpinnerProps = {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
};

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
};

const Spinner = ({ size = 'md', className = '' }: SpinnerProps): React.JSX.Element => {
    return (
        <span
            className={`inline-block animate-spin rounded-full border-white/30 border-t-neon ${sizeMap[size]} ${className}`}
            aria-hidden='true'
        />
    );
};

export default Spinner;
