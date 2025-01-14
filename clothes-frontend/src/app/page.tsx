import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen p-4 lg:px-36 lg:py-16">
      <div className="text-3xl font-bold">You</div>
      <div className="h-full w-full pt-4">
        <div className="flex h-[500px] w-full flex-col items-center justify-center space-y-2 rounded-lg bg-gray-300 lg:w-[400px]">
          <div className="text-lg font-bold">Upload</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
