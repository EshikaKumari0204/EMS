import { useState, useEffect, useCallback } from "react";
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets";
import { Plus, Search, XIcon } from "lucide-react";
import EmployeeCard from "../Components/EmployeeCard";
import Loading from "../Components/Loading";
import FormComp from "../Components/FormComp";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setSelectDept] = useState("");
  const [onEdit, setOnEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectDept ? emp.department === selectDept : true
      )
    );
    setTimeout(() => setLoading(false), 1000);
  }, [selectDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filtered = employees.filter((emp) =>
    `${emp.firstName}${emp.lastName}${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  <div className="px-4 sm:px-8 py-6 max-w-6xl w-full flex flex-col gap-6 mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center  sm:justify-between gap-4">
        <div className="flex flex-col  items-center justify-center sm:items-start">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
            Employees
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage your team members</p>
        </div>
        <div className="flex items-center justify-center"><button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Employee
        </button></div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          />
        </div>
        <select
          value={selectDept}
          onChange={(e) => setSelectDept(e.target.value)}
          className="sm:w-48 px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition bg-white"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}
      {loading ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg font-medium">No employees found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1  justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {filtered.map((emp) => (
            <EmployeeCard
              emp={emp}
              key={emp.id}
              setonEdit={() => setOnEdit(true)}
              ondelete={fetchEmployees}
            />
          ))}
        </div>
      )}

      {/* Add Employee Modal */}
      {showCreateModal && (
        <div
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">Add New Employee</h2>
                <p className="text-sm text-slate-400 mt-0.5">Create an employee account and profile</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>
            <div className="px-6 py-5">
              <FormComp initialData={onEdit} onSuccess={()=>{setShowCreateModal(true);fetchEmployees();}} onCancel={()=>setShowCreateModal(false)}/>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {onEdit && (
        <div
          onClick={() => setOnEdit(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">Edit Employee</h2>
                <p className="text-sm text-slate-400 mt-0.5">Update employee details</p>
              </div>
              <button
                onClick={() => setOnEdit(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>
            <div className="px-6 py-5">
              <FormComp initialData={onEdit} onSuccess={()=>{setShowCreateModal(true);fetchEmployees();}} onCancel={()=>setShowCreateModal(false)}/>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Employees;
