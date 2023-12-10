export default function Logo() {
    return (
        <div className="flex justify-center items-center">
            <img src="/logo.svg" alt="Logo" className="w-16" />
            <div className="pl-2 font-semibold text-md">Floorplanner</div>
        </div>
    );
}
