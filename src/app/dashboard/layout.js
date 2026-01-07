import Header from "./_components/Header";
import Navbar from "./_components/Navbar";

function layout({ children }) {
  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <Navbar />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;
