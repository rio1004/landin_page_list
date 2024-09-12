import { modalUrl, showModal } from "@/store/atoms";
import { useAtom } from "jotai";
import Image from "next/image";

const ModalComponent = () => {
  const [showMd, setShowModal] = useAtom(showModal);
  const [url, setUrl] = useAtom(modalUrl);
  return (
    <div className="fixed top-0 left-0 modal-overlay flex justify-center items-center h-screen w-screen bg-black bg-opacity-70 z-10 ">
      <div className="modal-content opacity">  
        <div className="site-container z-50">
          <iframe
            className="rounded-2xl border-white border-2"
            src={url}
            height="700px"
            width="400px"
          >
            Your browser does not support iframes.
          </iframe>
        </div>
        <div
          className="close text-center mt-[20px] flex justify-center"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <Image
            src="/images/modalClose.svg"
            alt={"close Button"}
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
