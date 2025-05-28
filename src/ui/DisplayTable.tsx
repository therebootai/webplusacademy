const DisplayTable = ({
  children,
  tableHeader,
}: {
  children?: React.ReactNode;
  tableHeader: string[];
}) => {
  return (
    <div className="flex flex-col border border-[#eeeeee] rounded-md">
      <div className="flex flex-row p-2 py-4 gap-2 rounded-t-md text-sm font-medium bg-site-yellow">
        {tableHeader.map((item, index) => (
          <div
            key={index}
            className={`capitalize flex-1 text-site-darkgreen`}
            style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[50vmin] overflow-hidden overflow-y-scroll bg-white no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default DisplayTable;
