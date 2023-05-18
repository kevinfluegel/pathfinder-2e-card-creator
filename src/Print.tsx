import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card, CardProps } from "./Card";
import JSZip from "jszip";
import domtoimage from "dom-to-image";
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import {Button} from "./Button";

type Pages = {
  [key: string]: CardProps[]
}

function Print() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [print, setPrint] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const printRefs = useRef<Array<HTMLElement | null>>([]);

  const [pages, setPages] = useState<Pages>({});


  useEffect(() => {
    if (isPrint) {
      prepareZip();
    }
  }, [isPrint]);

  // function handleOnDragEnd(result: any) {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }
  //
  //   const items = Array.from(cards);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  //
  //   setCards(items);
  // }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Moving between sections
      const sourceSectionItems = Array.from(pages[source.droppableId]);
      const destSectionItems = Array.from(pages[destination.droppableId]);
      const [removed] = sourceSectionItems.splice(source.index, 1);
      destSectionItems.splice(destination.index, 0, removed);

      setPages({
        ...pages,
        [source.droppableId]: sourceSectionItems,
        [destination.droppableId]: destSectionItems,
      });
    } else {
      // Moving within a section
      const sectionItems = Array.from(pages[source.droppableId]);
      const [removed] = sectionItems.splice(source.index, 1);
      sectionItems.splice(destination.index, 0, removed);

      setPages({
        ...pages,
        [source.droppableId]: sectionItems,
      });
    }
  }


  var zip = new JSZip();
  async function prepareZip() {
    for (const element of printRefs.current) {
      const index = printRefs.current.indexOf(element);
      // if (index > 0) break;
      if (!element || !cards) continue;
      // const canvas = await html2canvas(element, {
      //   scale: 4,
      //   useCORS: true,
      //   allowTaint: true,
      // });
      window.document.documentElement.classList.add("big");
      await domtoimage.toJpeg(element, {}).then(function (dataUrl: string) {
        const base64 = getBase64StringFromDataURL(dataUrl);
        zip.file(`${cards[index].title}-${cards[index].lvl}.jpeg`, base64, {
          base64: true,
        });
      });
      console.log(index);
      // element.classList.remove("big");
    }
    await zip.generateAsync({ type: "base64" }).then(function (base64) {
      setDownloadLink(`data:application/zip;base64,${base64}`);
    });

    window.document.documentElement.classList.remove("big");
    setIsPrint(false);
    console.log("done");
  }

  useEffect(() => {
    if (cards.length > 0) return;
    const jsonCards = localStorage.getItem("cards");
    if (!jsonCards) {
      setCards([]);
      return;
    }
    setCards(JSON.parse(jsonCards));
    setPages({1: JSON.parse(jsonCards)})
  }, [cards]);

  function addPage() {
    const newPage = Object.keys(pages).length + 1;
    setPages({...pages, [newPage]: []})
  }

  return (
    <>
      <div className="m-8 print:hidden">
        <img src={print} />
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setIsPrint(true)}
        >
          prepare Images
        </button>
        <a
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 ml-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          href={downloadLink}
          download={true}
        >
          download
        </a>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 ml-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={addPage}
        >Add Page</button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.entries(pages).map(([pageId, pageCards]) => (
          <>
          <h2 className="text-5xl p-8 bg-slate-400 w-full mb-8 print:hidden">{pageId}</h2>
          <Droppable droppableId={pageId} key={pageId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[300px] page-break card-container'>
                {pageCards?.map((card, idx) => (
                  <Draggable draggableId={card.id} index={idx} key={card.id}>
                    {(provided) => (
                      <div
                        className="inline-block draggable h-[396px] w-[279px]"
                        ref={(ref) => {
                          printRefs.current[idx] = ref
                          provided.innerRef(ref)
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card {...card} noBorder isPrint={isPrint}/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          </>
        ))}
      </DragDropContext>
    </>
  );
}

export default Print;

const getBase64StringFromDataURL = (dataURL: string) =>
  dataURL.replace("data:", "").replace(/^.+,/, "");
