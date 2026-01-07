const Card = ({ icon, title, value }) => {
  return (
    <div className="my-4 flex item-center gap-5 p-6 bg-blue-200 rounded-lg shadow-sm">
      <div className="p-2 h-10 w-10 rounded-full bg-white text-primary">
        {icon}
      </div>
      <div>
        <h2 className="font-bold text-xl">{title}</h2>
        <h2 className="text-lg">{value}</h2>
      </div>
    </div>
  );
};

export default Card;
