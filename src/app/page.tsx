import CardHolder from "@/components/CardHolder";
import Tabs from "../components/tabs";
export default function Home() {

  return (
    <div className="p-14">
      <div className="Title flex justify-center">
        <h1 className="text-4xl font-black">落地页模版演示</h1>
      </div>
      <Tabs />
      <CardHolder />
    </div>
  );
}
