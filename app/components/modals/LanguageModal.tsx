"use client";
import Heading from "../Heading";
import Modal from "./Modal";

const LanguageModal = () => {
  const bodyContent = (
    <div className="">
      <div className="border-b-[1px]  flex items-center justify-start gap-4 py-4">
        <p className="cursor-pointer">Language and region</p>
        <p className="cursor-pointer">Currency</p>
      </div>
      <div className="w-full  mt-6 ">
        <div className="w-1/2 p-4 bg-neutral-100 rounded-lg flex items-center">
          <div className="flex flex-col gap-2">
            <p className="text-black">Translation</p>
            <p className="text-sm text-neutral-400  ">
              Automatically translate descriptions and reviews to English.
            </p>
          </div>

          <div>placeholder</div>
        </div>
      </div>
      <div className="my-4 flex flex-col gap-1.5">
        <Heading title="Suggested language and region" />
        <div className="flex items-center gap-2">
          <div className="cursor-pointer transition hover:bg-neutral-100  w-1/5 py-[9px] px-3 rounded-lg ">
            <p>English</p>
            <p className="text-sm text-neutral-400 ">Worldwide</p>
          </div>
        </div>
      </div>
      <div className="my-4">
        <Heading title="Choose a language and region"/>
        <div className="flex items-center my-4">
            <p className="cursor-pointer transition hover:bg-neutral-100   py-[9px] px-3 rounded-lg ">
                Feature under construction 
            </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={false}
      onClose={() => {}}
      onSubmit={() => {}}
      wide
      body={bodyContent}
    />
  );
};

export default LanguageModal;
