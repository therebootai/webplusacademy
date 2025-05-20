const DisplayTable = ({
  children,
  tableHeader,
}: {
  children?: React.ReactNode;
  tableHeader: string[];
}) => {
  return (
    <div className="flex flex-col border border-[#eeeeee] rounded-md">
      <div className="flex flex-row p-2 py-4 gap-2 rounded-t-md text-base font-medium bg-site-yellow">
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
      <div className="h-[60vmin] overflow-hidden overflow-y-scroll bg-white">
        {children}
      </div>
    </div>
  );
};

export default DisplayTable;
