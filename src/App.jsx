import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Notes from "./components/Notes";
import { getInitialData, showFormattedDate } from "./utils/index";

function App() {
  const initialData = getInitialData();
  const [originalItems, setOriginalItems] = useState(initialData);
  const [items, setItems] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(originalItems);
  }, [originalItems]);

  function handleAddItem(item) {
    const updatedItems = [...originalItems, item];
    setOriginalItems(updatedItems);
  }

  function handleDeleteItem(id) {
    const updatedItems = originalItems.filter((item) => item.id !== id);
    setOriginalItems(updatedItems);
  }

  function handleSearch(e) {
    const keySearch = e.target.value.toLowerCase();
    setSearchTerm(keySearch);

    if (keySearch.trim() === '') {
      setItems(originalItems);
    } else {
      const matchingNotes = originalItems.filter((item) =>
        item.title.toLowerCase().includes(keySearch)
      );
      setItems(matchingNotes);
    }
  }

  function handleDataChange(updatedData) {
    const updatedItems = originalItems.map((item) => {
      const matchingData = updatedData.find((updatedItem) => updatedItem.id === item.id);
      return matchingData ? matchingData : item;
    });
    setOriginalItems(updatedItems);
  }


  return (
    <>
      <Header onSearch={handleSearch} search={searchTerm} />
      <Form onAddItem={handleAddItem} />
      <Notes data={items} format={showFormattedDate} onDeleteItem={handleDeleteItem} onDataChange={handleDataChange} />

      <div className="w-10 h-10"></div>
    </>
  )
}

export default App;
