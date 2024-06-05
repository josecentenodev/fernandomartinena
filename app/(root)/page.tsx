"use client";
import Image from "next/image";

export default function Home() {
  const images = Array.from({ length: 9 }, (_, index) => index + 1);
  return (
    <main className="grid grid-cols-3 gap-5 mx-auto min-h-screen pt-10">
      {images.map((number) => (
        <>
          <button
            key={number}
            className="relative w-full h-64"
            onClick={()=>(document.getElementById(`my_modal_${number}`) as HTMLDialogElement).showModal()
            }
          >
            <Image
              src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${number}.png`}
              alt={`Image ${number}`}
              layout="fill"
              objectFit="cover"
            />
          </button>
          <dialog
            id={`my_modal_${number}`}
            className="modal"
          >
            <Image
              src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${number}.png`}
              alt={`Image ${number}`}
              objectFit="cover"
              width={700}
              height={700}
            />
            <form
              method="dialog"
              className="modal-backdrop absolute w-screen h-screen"
            >
              <button>close</button>
            </form>
          </dialog>
        </>
      ))}
    </main>
  );
}
