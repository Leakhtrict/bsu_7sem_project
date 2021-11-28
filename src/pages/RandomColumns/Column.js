export const Column = ({ color, height }) => {
    return (
        <div className="column" style={{
            backgroundColor: color,
            height: `${height}%`,
            border: `2px solid ${color}`,
        }}>{Math.floor(height)}</div>
    );
}
