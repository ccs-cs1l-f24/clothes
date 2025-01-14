import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 py-16 lg:pl-16">
      <div className="flex flex-col space-y-2">
        <div className="text-2xl font-bold">Recently Added</div>
        <div className="no-scrollbar blur-right-edge relative flex w-full space-x-2 overflow-x-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className="h-48 w-48 flex-shrink-0 rounded-md bg-gray-300"
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col space-y-2 lg:pr-16">
        <div className="text-2xl font-bold">Clothing Library</div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 36 }, (_, i) => i + 1).map((idx) => (
            <div
              key={idx}
              className="flex h-48 w-full items-center justify-center rounded-md bg-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
