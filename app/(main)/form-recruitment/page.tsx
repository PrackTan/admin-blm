"use client";
import { useState } from "react";

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    hovaten: "",
    gioitinh: "",
    ngaysinh: "",
    dienthoai: "",
    CMND: "",
    ngaycap: "",
    honnhan: "",
    noicap: "",
    thuongtru: "",
    email: "",
    facebook: "",
    gioithieubanthan: "",
    muctieunghenghiep: "",
    chieucao: "",
    cannang: "",
    luongcoban: "",
    kpi: "",
    tongthunhapmongmuon: "",
    tentruong: "",
    trinhdo: "",
    nganhhoc: "",
    tinhtrang: "",
    ngoaingu: "",
    tinhoc: "",
    kynangkhac: "",
    thoigiancty: "",
    tencty: "",
    cviecdalam: "",
    thunhapcty: "",
    lydonghi: "",
    thoigiancty1: "",
    tencty1: "",
    cviecdalam1: "",
    thunhapcty1: "",
    lydonghi1: "",
    thoigianban: "",
    full1ngay: "",
    xoayca: "",
    vitriungtuyenthem2: "",
    diadiemmongmuonlamviec1: "",
    diadiemmongmuonlamviec2: "",
    kenhtuyendung: "",
    baohiem: "",
    ngaythuviec: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      "https://vieclam.bachlongmobile.com/wp-json/custom-api/v1/nop-ho-so",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (res.ok) {
      alert("Nộp hồ sơ thành công!");
    } else {
      alert("Gửi không thành công!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Form ứng tuyển</h2>
      <input
        name="hovaten"
        value={formData.hovaten}
        onChange={handleChange}
        placeholder="Họ và tên"
        required
      />
      <select name="gioitinh" value={formData.gioitinh} onChange={handleChange}>
        <option value="">--Giới tính--</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>
      <input
        name="ngaysinh"
        type="date"
        value={formData.ngaysinh}
        onChange={handleChange}
      />
      <input
        name="dienthoai"
        type="tel"
        value={formData.dienthoai}
        onChange={handleChange}
      />
      <textarea
        name="gioithieubanthan"
        value={formData.gioithieubanthan}
        onChange={handleChange}
        placeholder="Tự giới thiệu bản thân"
      />
      {/* Thêm tiếp các trường khác giống vậy */}
      <button type="submit">Gửi hồ sơ</button>
    </form>
  );
}
