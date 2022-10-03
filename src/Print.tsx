import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card, CardProps } from "./Card";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import domtoimage from "dom-to-image";

function Print() {
  const [cards, setCards] = useState<CardProps[] | undefined>(undefined);
  const [print, setPrint] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const printRefs = useRef<Array<HTMLTableDataCellElement | null>>([]);

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

    // window.document.documentElement.classList.remove("big");
    console.log("done");
  }

  useEffect(() => {
    if (cards) return;
    const jsonCards = localStorage.getItem("cards");
    if (!jsonCards) {
      setCards([]);
      return;
    }
    setCards(JSON.parse(jsonCards));
  }, [cards]);

  return (
    <>
      <div className="m-8">
        <img src={print} />
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={prepareZip}
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
      </div>
      <table className="seamless">
        <tbody>
          <tr>
            {cards?.map((card, idx) => (
              <td
                className="inline-block"
                key={card.id}
                ref={(ref) => (printRefs.current[idx] = ref)}
              >
                <Card {...card} noBorder />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Print;

const getBase64StringFromDataURL = (dataURL: string) =>
  dataURL.replace("data:", "").replace(/^.+,/, "");
