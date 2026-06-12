
import { format } from "date-fns";
import { Download } from "lucide-react";

const PayslipList = ({ isAdmin, payslips }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700">Payslip Records</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {payslips.length} record{payslips.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              {isAdmin && (
                <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Employee
                </th>
              )}
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Period
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Basic Salary
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Net Salary
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="text-center py-12 text-slate-400 text-sm"
                >
                  No payslips found
                </td>
              </tr>
            ) : (
              payslips.map((slip, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  {isAdmin && (
                    <td className="px-5 py-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {slip.employee.firstName} {slip.employee.lastName}
                    </td>
                  )}
                  <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                    {format(new Date(slip.year, slip.month - 1), "MMMM yyyy")}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                    ${slip.basicSalary.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium whitespace-nowrap">
                    ${slip.netSalary.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors duration-150 ml-auto" onClick={()=>window.open(`/print/payslips/${slip.id}`)}>
                      <Download size={13} />
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipList;
