import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { TLayout } from "@/types/global.types";

const RootLayout = ({ children }: TLayout) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
