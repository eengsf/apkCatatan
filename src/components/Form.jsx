import { useState } from "react";

export default function Form({ onAddItem }) {
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [sisalimit, setSisaLimit] = useState(50);
   const limited = 50;

   const now = new Date();
   const createdAt = now.toISOString();

   function handleChangeTitle(e) {
      const newTitle = e.target.value;
      if (newTitle.length <= limited) {
         setTitle(newTitle);
         setSisaLimit(limited - newTitle.length);
      }
      else { setSisaLimit('Karakter Judul Melebihi Batas..'); }
   }

   function handleSubmit(e) {
      e.preventDefault();
      const timestamp = +new Date();
      if (!title && !body) return;

      const newItem = {
         title: title,
         body: body,
         createdAt: createdAt,
         archived: false,
         id: timestamp
      };
      onAddItem(newItem);

      setTitle('');
      setBody('');
      setSisaLimit(50);
   }


   return (
      <div className="flex justify-center mt-5 mb-5" onSubmit={handleSubmit}>
         <form className="flex flex-col w-1/2 bg-white items-center rounded-lg p-2 outline outline-2 shadow-2xl">
            <div className="w-full text-center text-black mb-2 [text-shadow:_1px_1px_1px_rgb(255,255,255)]">
               <h3 className="font-bold">Buat Catatan</h3>
               <p>sisa karakter: {sisalimit}</p>
            </div>
            <div className="w-full mb-1">
               <input type="text" placeholder="title..." className=" border-2 border-black rounded-md p-2 resize-none w-full" value={title} onChange={handleChangeTitle} />
            </div>
            <div className="w-full mb-1">
               <textarea name="komentar" rows="4" className=" border-2 border-black rounded-md p-2 resize-none w-full" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </div>
            <div>
               <button className="bg-white hover:bg-black hover:text-white text-black font-semibold py-1 px-4 rounded-full shadow-md text-sm outline outline-2">Buat</button>
            </div>
         </form>
      </div>
   );
}