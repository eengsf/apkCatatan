

export default function Header({ onSearch, search }) {
   return (
      <div className="flex justify-between items-center p-3 border-b-2 border-black">
         <div className="">
            <h1 className="font-bold text-xl">Notes</h1>
         </div>
         <div className="">
            <input type="text" placeholder="search..." className=" border-2 border-black rounded-md p-2 resize-none w-full text-sm" value={search} onChange={onSearch} />
         </div>
      </div>
   );
}