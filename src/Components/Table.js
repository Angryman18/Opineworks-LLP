import { useSelector } from "react-redux";

import TableData from "./TableData";

const Table = () => {
  const expenceDetail = useSelector((state) => state.userSlicer.userData);
  return (
    <div className="w-11/12 mx-auto flex justify-center items-center">
      <table>
        <thead>
          <tr className="sm:text-base h-12 text-sm border-b border-t border-gray-100 bg-purple-800 text-white">
            <th className="text-left px-2 min-w-20px w-20 text-center rounded-tl-lg rounded-bl-lg">
              Sl. No
            </th>
            <th className="text-left px-2 min-w-400px w-80">
              Expence Name
            </th>
            <th className="px-2 w-40 text-left">Amount</th>
            <th className="px-2 w-40 text-left rounded-tr-lg rounded-br-lg">
              Actions
            </th>
          </tr>
        </thead>
        {expenceDetail && expenceDetail.length > 0 ? (
          expenceDetail.map((item, idx) => {
            return (
              <TableData
                key={item.id}
                serial={idx+1}
                expenceName={item.expenceName}
                amount={item.amount}
                id={item.id}
              />
            );
          })
        ) : (
          <tbody>
            <tr>
              <td colSpan="4"><p className="text-xl">No Item Found</p></td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
