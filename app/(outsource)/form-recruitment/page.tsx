"use client";
import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  Mail,
  Users,
  Loader2,
  FileText,
  Upload,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

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
    fullorpart: "",
    vitriungtuyen1: "",
    vitriungtuyen2: "",
    diadiemmongmuonlamviec1: "",
    diadiemmongmuonlamviec2: "",
    kenhtuyendung: "",
    baohiem: "",
    ngaythuviec: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showSecondCompany, setShowSecondCompany] = useState(false);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug"); // 👉 lấy được slug từ URL
  console.log("slug từ PHP truyền vào:", slug);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận file PDF, DOC hoặc DOCX!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File không được vượt quá 5MB!");
        return;
      }

      setCvFile(file);
      toast.success("File CV đã được chọn thành công!");
    }
  };

  const removeFile = () => {
    setCvFile(null);
    const fileInput = document.getElementById("cvFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const toggleSecondCompany = () => {
    setShowSecondCompany(!showSecondCompany);
    if (showSecondCompany) {
      setFormData((prev) => ({
        ...prev,
        thoigiancty1: "",
        tencty1: "",
        cviecdalam1: "",
        thunhapcty1: "",
        lydonghi1: "",
      }));
    }
  };
  const branchOptions = [
    "81-83 Đường Trần Phú, Phường 04, Quận 05, Hồ Chí Minh",
    "251-253 Đường Trần Hưng Đạo, Phường Cô Giang, Quận 1, Hồ Chí Minh",
    "480-482 Đường Quang Trung, Phường 10, Quận Gò Vấp, Hồ Chí Minh",
    "194 Đường Võ Văn Ngân, Phường Bình Thọ, Thành phố Thủ Đức, Hồ Chí Minh",
    "316-318 Đường 3 Tháng 2 Phường 12, Quận 10, Hồ Chí Minh",
    "225F Đường Trần Quang Khải, Phường Tân Định, Quận 1, Hồ Chí Minh",
    "581C Đường Nguyễn Thị Thập, Phường Tân Phong, Quận 7, Hồ Chí Minh",
    "134-136 Đường Trần Phú, Phường 04, Quận 05, Hồ Chí Minh",
  ];

  const positionOptions = [
    "Kế toán thu ngân",
    "Tư vấn bán hàng",
    "Hỗ trợ kỹ thuật",
    "Kế toán bán hàng",
    "Quản lý/ Phó quản lý cửa hàng",
    "Kỹ thuật sửa chữa trên main điện thoại IOS và ANDROID",
    "Chuyên viên Tiếp nhận bảo hành",
    "Kỹ thuật thay thế linh kiện ngoại vi",
    "Kế toán Kho",
    "Kế toán viên",
    "Brand Marketing Thương Hiệu Apple",
    "Brand Marketing Thương Hiệu Samsung",
    "Kế Toán Thuế",
    "Phó Phòng Kinh Doanh",
    "Phó Phòng Marketing",
    "Kế Toán Kiểm Toán",
    "Kế Toán Tài Chánh",
    "Chuyên viên kinh doanh qua sàn thương mại điện tử",
    "Chuyên viên TikTok",
    "Chuyên viên Sáng tạo nội dung – Nền tảng TikTok",
    "Chuyên viên Brand Marketing",
    "Chuyên viên Marketing",
    "Chuyên viên Content Writer (chuẩn SEO)",
    "Kế toán tổng hợp",
    "Chuyên Viên Chăm Sóc Khách Hàng",
    "Quản trị Website",
    "Chuyên viên Digital Marketing",
    "Trưởng phòng Media",
    "Chuyên viên Graphic Designer",
    "Chuyên viên Lập trình Website",
    "Chuyên viên Video Editor",
    "Chuyên viên Reviewer",
    "Chuyên viên Ngành hàng Điện thoại/MTB/Laptop",
    "Chuyên viên ngành hàng Phụ kiện",
    "Chuyên viên Trả góp Dịch vụ tiện ích",
    "Chuyên viên Social Marketing",
    "Chuyên viên Hành chánh nhân sự",
    "Chuyên viên Giám sát",
    "Chuyên viên Tuyển dụng",
    "Chuyên viên Hành chính văn phòng",
    "Chuyên viên Đào Tạo",
    "Kế Toán Nội Bộ",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailContent = `
      <!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hồ sơ ứng tuyển</title>
  <style>
  body {
    font-family: Arial, sans-serif;
    background: #fff;
    margin: 0;
    padding: 20px;
    font-size: 12px;
  }
  .apply-position {
  font-size: 16px;
  font-weight: bold;
  color: #0284c7; /* màu xanh dương */
  padding: 8px 0;
  border-bottom: 2px solid #facc15; /* vàng nhạt */
  margin-bottom: 6px;
}

  .container {
    width: 794px;
    margin: 0 auto;
    padding: 20px 25px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
    margin: 0;
    font-size: 18px;
  }

  .sub-title {
    text-align: center;
    font-size: 12px;
    margin: 4px 0 16px;
  }

  .section {
    margin-bottom: 18px;
  }

  .section-title {
    font-weight: bold;
    background: #fff8dc;
    border: 1px solid #ffd700;
    padding: 4px 8px;
    font-size: 13px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    margin-top: 10px;
  }

  td {
    padding: 4px 3px;
    vertical-align: top;
  }

td.label {
  font-weight: bold;
  white-space: nowrap;
  width: 16.66%; /* phù hợp cho 3 cột */
}
  .note {
    font-size: 11px;
    font-style: italic;
    text-align: right;
    margin-top: 15px;
  }

  .checkbox {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid #000;
    margin-right: 5px;
  }
      .section table + table {
  margin-top: 10px;
  border-top: 1px dashed #ccc;
  padding-top: 6px;
}
.section table td[colspan="2"]:last-child {
  text-align: right;
  font-weight: bold;
}
  .signature {
    text-align: right;
    margin-top: 20px;
  }

  .underline {
    display: inline-block;
    border-bottom: 1px dotted #000;
    width: 100%;
    height: 1em;
  }
  
  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    html, body {
      width: 210mm;
      height: 297mm;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    body {
      transform: scale(0.85); /* Thu nhỏ toàn bố cục */
      transform-origin: top left;
      width: 117.6%; /* 100 / 0.85 */
    }

    .container {
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    table, td {
      font-size: 10px !important;
    }

    h1 {
      font-size: 16px;
    }

    .section {
      margin-bottom: 10px;
    }

    .section-title {
      font-size: 12px;
      padding: 3px 6px;
    }

    .checkbox {
      transform: scale(0.9);
    }
  }
</style>

</head>
<body>
  <div class="container">
    <h1>HỒ SƠ ỨNG TUYỂN</h1>
    <div class="sub-title">Ngày phỏng vấn: ....../....../......</div>
    <div class="apply-position">
  ${formData.vitriungtuyen1 || "Vị trí ứng tuyển"}
</div>

    <!-- THÔNG TIN CÁ NHÂN -->
    <div class="section">
      <div class="section-title">THÔNG TIN CÁ NHÂN</div>
      <table>
        <tr><td class="label">Họ tên:</td><td>${
          formData.hovaten || ""
        }</td><td class="label">Giới tính:</td><td>${
        formData.gioitinh || ""
      }</td></tr>
        <tr><td class="label">Ngày sinh:</td><td>${
          formData.ngaysinh || ""
        }</td><td class="label">CMND/CCCD:</td><td>${
        formData.CMND || ""
      }</td></tr>
        <tr><td class="label">Ngày cấp:</td><td>${
          formData.ngaycap || ""
        }</td><td class="label">Nơi cấp:</td><td>${
        formData.noicap || ""
      }</td></tr>
        <tr><td class="label">Điện thoại:</td><td>${
          formData.dienthoai || ""
        }</td><td class="label">Hôn nhân:</td><td>${
        formData.honnhan || ""
      }</td></tr>
        <tr><td class="label">Nơi ở hiện tại:</td><td>${
          formData.thuongtru || ""
        }</td><td class="label">Email:</td><td><a href="mailto:${
        formData.email || ""
      }">${formData.email || ""}</a></td></tr>
        <tr><td class="label">Facebook:</td><td colspan="3"><a href="${
          formData.facebook || "#"
        }">${formData.facebook || ""}</a></td></tr>
        <tr><td class="label">Giới thiệu bản thân:</td><td colspan="3">${
          formData.gioithieubanthan || ""
        }</td></tr>
        <tr><td class="label">Mục tiêu nghề nghiệp:</td><td colspan="3">${
          formData.muctieunghenghiep || ""
        }</td></tr>
        <tr><td class="label">Chiều cao:</td><td>${
          formData.chieucao || ""
        }</td><td class="label">Cân nặng:</td><td>${
        formData.cannang || ""
      }</td></tr>
      </table>
    </div>

    <!-- THU NHẬP -->
    <div class="section">
      <div class="section-title">THU NHẬP MONG MUỐN</div>
      <table>
        <tr><td class="label">Lương cơ bản:</td><td>${
          formData.luongcoban || ""
        }</td><td class="label">KPI:</td><td>${formData.kpi || ""}</td></tr>
        <tr><td colspan="4"><strong>Tổng thu nhập mong muốn:</strong> ${
          formData.tongthunhapmongmuon || ""
        }</td></tr>
      </table>
    </div>

    <!-- HỌC VẤN -->
    <div class="section">
      <div class="section-title">TRÌNH ĐỘ HỌC VẤN</div>
      <table>
        <tr><td class="label">Tên trường:</td><td>${
          formData.tentruong || ""
        }</td><td class="label">Ngành học:</td><td>${
        formData.nganhhoc || ""
      }</td></tr>
        <tr><td class="label">Trình độ:</td><td>${
          formData.trinhdo || ""
        }</td><td class="label">Tình trạng:</td><td>${
        formData.tinhtrang || ""
      }</td></tr>
      </table>
    </div>

    <!-- CHỨNG CHỈ -->
    <div class="section">
      <div class="section-title">CHỨNG CHỈ</div>
      <table>
        <tr><td class="label">Ngoại ngữ:</td><td>${
          formData.ngoaingu || ""
        }</td><td class="label">Kỹ năng khác:</td><td>${
        formData.kynangkhac || ""
      }</td></tr>
      </table>
    </div>

    <!-- KINH NGHIỆM -->
<div class="section">
  <div class="section-title">QUÁ TRÌNH LÀM VIỆC TRƯỚC ĐÂY</div>
  <table>
    <tr><td colspan="6"><strong>Công ty 1</strong></td></tr>
    <tr>
      <td class="label">Thời gian:</td><td>${formData.thoigiancty || ""}</td>
      <td class="label">Tên công ty:</td><td>${formData.tencty || ""}</td>
      <td class="label">Thu nhập:</td><td>${formData.thunhapcty || ""}</td>
    </tr>
    <tr>
      <td class="label">Công việc:</td><td>${formData.cviecdalam || ""}</td>
      <td class="label">Lý do nghỉ:</td><td colspan="4">${
        formData.lydonghi || ""
      }</td>
    </tr>
    <tr><td colspan="6"><strong>Công ty 2</strong></td></tr>
    <tr>
      <td class="label">Thời gian:</td><td>${formData.thoigiancty1 || ""}</td>
      <td class="label">Tên công ty:</td><td>${formData.tencty1 || ""}</td>
      <td class="label">Thu nhập:</td><td>${formData.thunhapcty1 || ""}</td>
    </tr>
    <tr>
      <td class="label">Công việc:</td><td>${formData.cviecdalam1 || ""}</td>
      <td class="label">Lý do nghỉ:</td><td colspan="4">${
        formData.lydonghi1 || ""
      }</td>
    </tr>
  </table>
</div>


    <!-- CA LÀM VIỆC -->
<div class="section">
  <div class="section-title">CA LÀM VIỆC</div>
    <!-- Phần trên -->
  <table>
    <tr>
      <td class="label">Làm full time hoặc xoay ca:</td>
      <td>${formData.fullorpart || ""}</td>
    </tr>
    <tr>
      <td class="label">Vị trí ưu tiên 1:</td>
      <td>${formData.vitriungtuyen1 || ""}</td>
      <td class="label">Ưu tiên 2:</td>
      <td>${formData.vitriungtuyen2 || ""}</td>
    </tr>
    <tr>
      <td class="label">Chi nhánh 1:</td>
      <td>${formData.diadiemmongmuonlamviec1 || ""}</td>
      <td class="label">Chi nhánh 2:</td>
      <td>${formData.diadiemmongmuonlamviec2 || ""}</td>
    </tr>
  </table>
 <!-- Phần dưới -->
<table>
  <tr>
    <td class="label">Thời gian bận việc cá nhân:</td>
    <td>${formData.thoigianban || ""}</td>
    <td colspan="2" font-weight: bold;">Chữ ký ứng viên</td>
  </tr>
  <tr>
    <td class="label">Kênh tuyển dụng:</td>
    <td>${formData.kenhtuyendung || ""}</td>
  </tr>
  <tr>
    <td class="label">Tham gia bảo hiểm:</td>
    <td>${formData.baohiem || ""}</td>
  </tr>
  <tr>
    <td class="label">Ngày thử việc:</td>
    <td colspan="3">${formData.ngaythuviec || ""}</td>
  </tr>
</table>

</div>


    <!-- NHẬN XÉT -->
    <div class="section">
      <div class="section-title">NHẬN XÉT NHÀ TUYỂN DỤNG</div>
      <table>
        <tr>
          <td class="label">Phù hợp:</td><td><span class="checkbox"></span>Phù hợp &nbsp;&nbsp;&nbsp; <span class="checkbox"></span>Chưa phù hợp</td>
          <td class="label">Điểm:</td><td>......</td>
        </tr>
        <tr><td class="label">Ngày:</td><td>....../....../......</td><td colspan="2" style="text-align: right;">(Dành cho nhà tuyển dụng)</td></tr>
        <tr><td class="label">Vị trí chốt thử việc:</td><td colspan="3"><span class="underline"></span></td></tr>
        <tr><td class="label">Chi nhánh thử việc:</td><td colspan="3"><span class="underline"></span></td></tr>
        <tr><td class="label">Nhận xét khác:</td><td colspan="3"><span class="underline"></span></td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;

      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      submitData.append("emailContent", emailContent);
      submitData.append("to", "tuyendungbachlong@gmail.com");
      submitData.append(
        "subject",
        `🎯 Hồ sơ ứng tuyển mới từ ${formData.hovaten || "Ứng viên"} - ${
          formData.dienthoai || ""
        }`
      );

      if (cvFile) {
        submitData.append("cvFile", cvFile);
      }

      const res = await fetch("/form-recruitment/api/send-email", {
        method: "POST",
        body: submitData,
      });

      const result = await res.json();

      if (result.success) {
        toast.success("✅ Gửi hồ sơ thành công!", {
          description: cvFile
            ? "Hồ sơ và file CV của bạn đã được gửi đến email tuyển dụng dưới dạng file đính kèm. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
            : "Hồ sơ của bạn đã được gửi đến email tuyển dụng. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.",
          duration: 6000,
        });

        setFormData({
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
          fullorpart: "",
          vitriungtuyen1: "",
          vitriungtuyen2: "",
          diadiemmongmuonlamviec1: "",
          diadiemmongmuonlamviec2: "",
          kenhtuyendung: "",
          baohiem: "",
          ngaythuviec: "",
        });
        setCvFile(null);
        setShowSecondCompany(false);
      } else {
        toast.error("❌ Lỗi gửi hồ sơ!", {
          description:
            result.message ||
            "Có lỗi xảy ra khi gửi hồ sơ. Vui lòng thử lại sau.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Lỗi kết nối!", {
        description:
          "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Form Ứng Tuyển
          </h1>
          <p className="text-gray-600">
            Vui lòng điền đầy đủ thông tin để ứng tuyển vào vị trí mong muốn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="hovaten">Họ và tên *</Label>
                <Input
                  id="hovaten"
                  name="hovaten"
                  value={formData.hovaten}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên đầy đủ"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gioitinh">Giới tính *</Label>
                <Select
                  value={formData.gioitinh}
                  onValueChange={(value) =>
                    handleSelectChange("gioitinh", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ngaysinh">Ngày sinh *</Label>
                <Input
                  id="ngaysinh"
                  name="ngaysinh"
                  type="date"
                  value={formData.ngaysinh}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dienthoai">Số điện thoại *</Label>
                <Input
                  id="dienthoai"
                  name="dienthoai"
                  type="tel"
                  value={formData.dienthoai}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="CMND">CMND/CCCD *</Label>
                <Input
                  id="CMND"
                  name="CMND"
                  value={formData.CMND}
                  onChange={handleChange}
                  placeholder="Số CMND/CCCD"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ngaycap">Ngày cấp *</Label>
                <Input
                  id="ngaycap"
                  name="ngaycap"
                  type="date"
                  value={formData.ngaycap}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noicap">Nơi cấp *</Label>
                <Input
                  id="noicap"
                  name="noicap"
                  value={formData.noicap}
                  onChange={handleChange}
                  placeholder="Nơi cấp CMND/CCCD"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="honnhan">Tình trạng hôn nhân *</Label>
                <Select
                  value={formData.honnhan}
                  onValueChange={(value) =>
                    handleSelectChange("honnhan", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Độc thân">Độc thân</SelectItem>
                    <SelectItem value="Đã kết hôn">Đã kết hôn</SelectItem>
                    <SelectItem value="Ly hôn">Ly hôn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="thuongtru">Địa chỉ thường trú *</Label>
                <Input
                  id="thuongtru"
                  name="thuongtru"
                  value={formData.thuongtru}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ thường trú"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook *</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Link Facebook cá nhân"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chieucao">Chiều cao (cm) *</Label>
                <Input
                  id="chieucao"
                  name="chieucao"
                  value={formData.chieucao}
                  onChange={handleChange}
                  placeholder="Chiều cao"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cannang">Cân nặng (kg) *</Label>
                <Input
                  id="cannang"
                  name="cannang"
                  value={formData.cannang}
                  onChange={handleChange}
                  placeholder="Cân nặng"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tải lên CV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cvFile">
                    File CV (PDF, DOC, DOCX - Tối đa 5MB)
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Input
                        id="cvFile"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Label
                        htmlFor="cvFile"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Upload className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">
                          {cvFile
                            ? "Thay đổi file CV"
                            : "Chọn file CV để tải lên"}
                        </span>
                      </Label>
                    </div>
                  </div>
                </div>

                {cvFile && (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">
                          {cvFile.name}
                        </p>
                        <p className="text-sm text-green-600">
                          {formatFileSize(cvFile.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  <p>• Chấp nhận file: PDF, DOC, DOCX</p>
                  <p>• Kích thước tối đa: 5MB</p>
                  <p>
                    • File CV sẽ được gửi kèm theo email ứng tuyển dưới dạng
                    file đính kèm
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Giới thiệu bản thân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gioithieubanthan">
                  Tự giới thiệu bản thân *
                </Label>
                <Textarea
                  id="gioithieubanthan"
                  name="gioithieubanthan"
                  value={formData.gioithieubanthan}
                  onChange={handleChange}
                  placeholder="Hãy giới thiệu về bản thân, kinh nghiệm và điểm mạnh của bạn..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="muctieunghenghiep">Mục tiêu nghề nghiệp</Label>
                <Textarea
                  id="muctieunghenghiep"
                  name="muctieunghenghiep"
                  value={formData.muctieunghenghiep}
                  onChange={handleChange}
                  placeholder="Mục tiêu nghề nghiệp của bạn trong 3-5 năm tới..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Mức lương mong muốn
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="luongcoban">Lương cơ bản (VNĐ) *</Label>
                <Input
                  id="luongcoban"
                  name="luongcoban"
                  value={formData.luongcoban}
                  onChange={handleChange}
                  placeholder="Lương cơ bản mong muốn"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kpi">KPI (VNĐ) *</Label>
                <Input
                  id="kpi"
                  name="kpi"
                  value={formData.kpi}
                  onChange={handleChange}
                  placeholder="KPI mong muốn"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tongthunhapmongmuon">
                  Tổng thu nhập mong muốn (VNĐ) *
                </Label>
                <Input
                  id="tongthunhapmongmuon"
                  name="tongthunhapmongmuon"
                  value={formData.tongthunhapmongmuon}
                  onChange={handleChange}
                  placeholder="Tổng thu nhập mong muốn"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Trình độ học vấn
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tentruong">Tên trường *</Label>
                <Input
                  id="tentruong"
                  name="tentruong"
                  value={formData.tentruong}
                  onChange={handleChange}
                  placeholder="Tên trường đã học"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trinhdo">Trình độ *</Label>
                <Select
                  value={formData.trinhdo}
                  onValueChange={(value) =>
                    handleSelectChange("trinhdo", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trình độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="THPT">THPT</SelectItem>
                    <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                    <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                    <SelectItem value="Đại học">Đại học</SelectItem>
                    <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                    <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nganhhoc">Ngành học *</Label>
                <Input
                  id="nganhhoc"
                  name="nganhhoc"
                  value={formData.nganhhoc}
                  onChange={handleChange}
                  placeholder="Ngành học/Chuyên môn"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tinhtrang">Tình trạng học tập *</Label>
                <Select
                  value={formData.tinhtrang}
                  onValueChange={(value) =>
                    handleSelectChange("tinhtrang", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đã tốt nghiệp">Đã tốt nghiệp</SelectItem>
                    <SelectItem value="Đang học">Đang học</SelectItem>
                    <SelectItem value="Tạm nghỉ">Tạm nghỉ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kỹ năng</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ngoaingu">Ngoại ngữ</Label>
                <Input
                  id="ngoaingu"
                  name="ngoaingu"
                  value={formData.ngoaingu}
                  onChange={handleChange}
                  placeholder="Tiếng Anh, Tiếng Nhật..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tinhoc">Tin học</Label>
                <Input
                  id="tinhoc"
                  name="tinhoc"
                  value={formData.tinhoc}
                  onChange={handleChange}
                  placeholder="Word, Excel, PowerPoint..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kynangkhac">Kỹ năng khác</Label>
                <Input
                  id="kynangkhac"
                  name="kynangkhac"
                  value={formData.kynangkhac}
                  onChange={handleChange}
                  placeholder="Kỹ năng mềm, chứng chỉ..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h4 className="font-semibold mb-4">Công ty gần nhất</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="thoigiancty">Thời gian làm việc *</Label>
                    <Input
                      id="thoigiancty"
                      name="thoigiancty"
                      value={formData.thoigiancty}
                      onChange={handleChange}
                      placeholder="01/2020 - 12/2023"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tencty">Tên công ty *</Label>
                    <Input
                      id="tencty"
                      name="tencty"
                      value={formData.tencty}
                      onChange={handleChange}
                      placeholder="Tên công ty"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cviecdalam">Công việc đã làm *</Label>
                    <Input
                      id="cviecdalam"
                      name="cviecdalam"
                      value={formData.cviecdalam}
                      onChange={handleChange}
                      placeholder="Vị trí/Chức vụ"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thunhapcty">Thu nhập (VNĐ) *</Label>
                    <Input
                      id="thunhapcty"
                      name="thunhapcty"
                      value={formData.thunhapcty}
                      onChange={handleChange}
                      placeholder="Thu nhập tại công ty"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="lydonghi">Lý do nghỉ việc *</Label>
                    <Textarea
                      id="lydonghi"
                      name="lydonghi"
                      value={formData.lydonghi}
                      onChange={handleChange}
                      placeholder="Lý do nghỉ việc tại công ty này"
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleSecondCompany}
                  className="flex items-center gap-2"
                >
                  {showSecondCompany ? (
                    <>
                      <Minus className="h-4 w-4" />
                      Ẩn công ty thứ 2
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Thêm công ty thứ 2
                    </>
                  )}
                </Button>
              </div>

              {showSecondCompany && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-4">Công ty trước đó</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="thoigiancty1">Thời gian làm việc</Label>
                        <Input
                          id="thoigiancty1"
                          name="thoigiancty1"
                          value={formData.thoigiancty1}
                          onChange={handleChange}
                          placeholder="01/2018 - 12/2019"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tencty1">Tên công ty</Label>
                        <Input
                          id="tencty1"
                          name="tencty1"
                          value={formData.tencty1}
                          onChange={handleChange}
                          placeholder="Tên công ty"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cviecdalam1">Công việc đã làm</Label>
                        <Input
                          id="cviecdalam1"
                          name="cviecdalam1"
                          value={formData.cviecdalam1}
                          onChange={handleChange}
                          placeholder="Vị trí/Chức vụ"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="thunhapcty1">Thu nhập (VNĐ)</Label>
                        <Input
                          id="thunhapcty1"
                          name="thunhapcty1"
                          value={formData.thunhapcty1}
                          onChange={handleChange}
                          placeholder="Thu nhập tại công ty"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="lydonghi1">Lý do nghỉ việc</Label>
                        <Textarea
                          id="lydonghi1"
                          name="lydonghi1"
                          value={formData.lydonghi1}
                          onChange={handleChange}
                          placeholder="Lý do nghỉ việc tại công ty này"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Thông tin công việc mong muốn
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="thoigianban">Thời gian bận *</Label>
                <Input
                  id="thoigianban"
                  name="thoigianban"
                  value={formData.thoigianban}
                  onChange={handleChange}
                  placeholder="Thời gian không thể làm việc"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full1ngay">
                  Có thể làm full 1 ngày Hoặc xoay ca* (Ca làm việc dành cho vị
                  trí ứng tuyển KHỐI CỬA HÀNG )
                </Label>
                <Select
                  value={formData.fullorpart}
                  onValueChange={(value) =>
                    handleSelectChange("fullorpart", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Làm full 1 ngày">
                      Làm full 1 ngày
                    </SelectItem>
                    <SelectItem value="Xoay ca">Xoay ca</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-gray-500">
                  Ca làm việc dành cho vị trí ứng tuyển KHỐI VĂN PHÒNG (Thời
                  gian làm việc cố định: 08h30 - 17h30 từ thứ 2 đến thứ 7)
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vitriungtuyenthem1">
                  Vị trí ứng tuyển ưu tiên 1 *
                </Label>
                <Select
                  value={formData.vitriungtuyen1}
                  onValueChange={(value) =>
                    handleSelectChange("vitriungtuyen1", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Quản lý/phó quản lý cửa hàng" />
                  </SelectTrigger>
                  <SelectContent className="max-h-56 overflow-auto">
                    {positionOptions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vitriungtuyen2">
                  Vị trí ứng tuyển ưu tiên 2 *
                </Label>
                <Select
                  value={formData.vitriungtuyen2}
                  onValueChange={(value) =>
                    handleSelectChange("vitriungtuyen2", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vị trí thứ 2 (tùy chọn)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-56 overflow-auto">
                    {positionOptions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diadiemmongmuonlamviec1">
                  Địa điểm mong muốn 1 *
                </Label>
                <Select
                  value={formData.diadiemmongmuonlamviec1}
                  onValueChange={(value) =>
                    handleSelectChange("diadiemmongmuonlamviec1", value)
                  }
                  required
                >
                  <SelectTrigger className="max-w-full truncate">
                    <SelectValue placeholder="Chọn địa điểm làm việc ưu tiên 1" />
                  </SelectTrigger>
                  <SelectContent className="max-h-56 overflow-auto">
                    {branchOptions.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diadiemmongmuonlamviec2">
                  Địa điểm mong muốn 2 *
                </Label>
                <Select
                  value={formData.diadiemmongmuonlamviec2}
                  onValueChange={(value) =>
                    handleSelectChange("diadiemmongmuonlamviec2", value)
                  }
                  required
                >
                  <SelectTrigger className="max-w-full truncate">
                    <SelectValue placeholder="Chọn địa điểm làm việc thứ 2" />
                  </SelectTrigger>
                  <SelectContent className="max-h-56 overflow-auto">
                    {branchOptions.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Thông tin khác
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="kenhtuyendung">Kênh tuyển dụng *</Label>
                <Select
                  value={formData.kenhtuyendung}
                  onValueChange={(value) =>
                    handleSelectChange("kenhtuyendung", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Biết tin qua đâu?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website công ty</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Báo chí">Báo chí</SelectItem>
                    <SelectItem value="Bạn bè">Bạn bè giới thiệu</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baohiem">Có bảo hiểm *</Label>
                <Select
                  value={formData.baohiem}
                  onValueChange={(value) =>
                    handleSelectChange("baohiem", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Có">Có</SelectItem>
                    <SelectItem value="Không">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ngaythuviec">Ngày có thể thử việc *</Label>
                <Input
                  id="ngaythuviec"
                  name="ngaythuviec"
                  type="date"
                  value={formData.ngaythuviec}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="px-12 py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang gửi hồ sơ...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Gửi hồ sơ ứng tuyển
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
