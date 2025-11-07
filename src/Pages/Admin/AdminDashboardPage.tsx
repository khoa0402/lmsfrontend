import React, { useEffect, useState } from "react";
import { createUser, getAllDepartment } from "../../Service/UserService";

const AdminDashboardPage = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    title: "",
    departmentId: "",
    role: "ROLE_EMPLOYEE",
  });

  const roles = ["ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_MANAGER"];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartment();
        setDepartments(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng ban:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(form);
      alert("Tạo người dùng thành công!");
      setForm({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        title: "",
        departmentId: "",
        role: "ROLE_EMPLOYEE",
      });
    } catch (error) {
      console.error(error);
      alert("Tạo người dùng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Create New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-transparent px-3 py-2 rounded-md transition"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-transparent px-3 py-2 rounded-md transition"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 px-3 py-2 rounded-md transition"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 px-3 py-2 rounded-md transition"
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 px-3 py-2 rounded-md transition"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 px-3 py-2 rounded-md transition"
              placeholder="VD: Customer Service Staff"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Department:
            </label>
            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 px-3 py-2 rounded-md transition bg-white"
            >
              <option value="">-- Choose Department --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Role:
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-2 focus:ring-teal-400 px-3 py-2 rounded-md transition bg-white"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
