import { FaCircle } from "react-icons/fa6";
export function Order({ value }) {
  return (
    <>
      <div className="sm:w-10/12 pr-[10vw] mt-3 flex items-center justify-between border h-[17vh] ">
        <div className="flex space-x-4 ml-8 items-center">
          <img src={value.url} width="80px" alt="" />
          <h1 className="font-semibold mt-2 sm:flex hidden text-gray-700">
            Qty-{value.quantity}
          </h1>
        </div>

        <h1 className="font-semibold hidden sm:block">
          ₹{value.quantity * value.price.cost}
        </h1>

        <div>
          <div className="flex items-center space-x-2">
            <FaCircle className="text-green-600" />
            <h1 className="text-gray-500 text-sm">Order Confirmed</h1>
          </div>
        </div>
      </div>
    </>
  );
}
