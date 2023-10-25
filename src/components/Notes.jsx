import { useState, useEffect } from "react";

export default function Notes({ data, format, onDeleteItem, onDataChange }) {

   const [copy, setCopy] = useState(data);
   const [activeItems, setActiveItems] = useState(copy.filter((item) => item.archived === false));
   const [archivedItems, setArchivedItems] = useState(copy.filter((item) => item.archived === true));

   useEffect(() => {
      setCopy(data);
      setActiveItems(data.filter((item) => item.archived === false));
      setArchivedItems(data.filter((item) => item.archived === true));
   }, [data]);

   function handleArchived(id) {
      const updatedData = copy.map((item) => {
         if (item.id === id) {
            return { ...item, archived: true };
         }
         return item;
      });

      setCopy(updatedData);
      setActiveItems(updatedData.filter((item) => item.archived === false));
      setArchivedItems(updatedData.filter((item) => item.archived === true));
      onDataChange(updatedData);
   }

   function handleActive(id) {
      const updatedData = copy.map((item) => {
         if (item.id === id) {
            return { ...item, archived: false };
         }
         return item;
      });
      setCopy(updatedData);
      setActiveItems(updatedData.filter((item) => item.archived === false));
      setArchivedItems(updatedData.filter((item) => item.archived === true));
      onDataChange(updatedData);
   }

   return (
      <>
         <div className="flex flex-col">
            <h1 className="w-[80vw] m-auto text-xl mb-3 mt-3 font-bold">
               Catatan Aktif
            </h1>
            {activeItems.length > 0 ?
               <div className="grid grid-cols-4 gap-1 w-[80vw] m-auto">
                  {activeItems.map((article) => (
                     <div key={article.id}>
                        <div className="flex flex-col justify-center border-2 border-black rounded-md ">
                           <div className="p-2 ">
                              <h1 className="font-bold">{article.title}</h1>
                              <p className="text-xs mb-2">{format(article.createdAt)}</p>
                              <p className="text-sm mb-2">{article.body}</p>
                           </div>
                           <div className="flex justify-around text-center border-t-2 border-black">
                              <button className=" w-full h-full border-e-2 border-black hover:bg-black hover:text-white" onClick={() => onDeleteItem(article.id)}>Delete</button>
                              <button className=" w-full h-full border-black hover:bg-black hover:text-white" onClick={() => handleArchived(article.id)}>Arsipkan</button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div> :
               <div className="w-[80vw] m-auto" >
                  <p>Tidak ada catatan saat ini.</p>
               </div>
            }
         </div>
         <div className="flex flex-col">
            <h1 className="w-[80vw] m-auto text-xl mb-3 mt-3 font-bold">
               Arsip
            </h1>
            {archivedItems.length > 0 ?
               <div className="grid grid-cols-4 gap-1 w-[80vw] m-auto" >
                  {archivedItems.map((article) => (
                     <div key={article.id}>
                        <div className="flex flex-col justify-center border-2 border-black rounded-md">
                           <div className="p-2 ">
                              <h1 className="font-bold">{article.title}</h1>
                              <p className="text-xs mb-2">{format(article.createdAt)}</p>
                              <p className="text-sm mb-2 ">{article.body}</p>
                           </div>
                           <div className="flex justify-around text-center border-t-2 border-black">
                              <button className=" w-full h-full border-e-2 border-black hover:bg-black hover:text-white" onClick={() => onDeleteItem(article.id)}>Delete</button>
                              <button className=" w-full h-full border-black hover:bg-black hover:text-white" onClick={() => handleActive(article.id)}>Pindahkan</button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div> :
               <div className="w-[80vw] m-auto" >
                  <p>Tidak ada catatan saat ini.</p>
               </div>
            }
         </div>
      </>
   );
}
