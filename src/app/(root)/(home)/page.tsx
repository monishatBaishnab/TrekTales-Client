import { Input } from "@nextui-org/input";

import TDatePicker from "@/components/form/TDatePicker";

const Home = () => {
  return (
    <div className="m-10 mx-auto max-w-96">
      <Input
        label="Label"
        labelPlacement="outside"
        name="email"
        placeholder="name"
        radius="sm"
        size="lg"
      />
      <TDatePicker label="Label" name="ema" />
    </div>
  );
};

export default Home;
