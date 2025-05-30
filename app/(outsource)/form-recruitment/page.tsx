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
  const positionOptions = [
    "Quản lý/phó quản lý cửa hàng",
    "Nhân viên kế toán bán hàng",
    "Nhân viên thu ngân",
    "Nhân viên Kế Toán Kho – Linh Kiện Sửa Chữa",
    "Nhân viên tư vấn bán hàng",
    "Nhân viên tiếp nhận bảo hành",
    "Nhân viên kỹ thuật phần mềm",
    "Nhân viên kỹ thuật thay thế linh kiện",
    "Nhân viên kỹ thuật sửa chữa mainboard",
    "Chuyên viên kế toán nội bộ",
    "Chuyên viên kế toán thuế",
    "Chuyên viên kế toán kiểm toán",
    "Chuyên viên kế toán tài chính",
    "Chuyên viên kế toán thanh toán",
    "Chuyên viên kế toán công nợ",
    "Trưởng phòng media",
    "Chuyên viên digital marketing",
    "Chuyên viên sáng tạo nội dung - reviewer",
    "Chuyên viên brand marketing",
    "Chuyên viên social marketing",
    "Chuyên viên content SEO",
    "Chuyên viên video editor",
    "Chuyên viên graphic designer",
    "Chuyên viên vận hành sàn TMĐT (Shopee-Tiktok)",
    "Trưởng phòng IT",
    "Chuyên viên quản trị Website",
    "Chuyên viên lập trình Website",
    "Chuyên viên ngành hàng Điện thoại/MTB/Laptop",
    "Chuyên viên ngành hàng phụ kiện - dịch vụ tiện ích",
    "Chuyên viên hành chính Chuyên sự",
    "Chuyên viên hành chính văn phòng",
    "Chuyên viên giám sát",
    "Chuyên viên đào tạo",
    "Chuyên viên call center",
    "Nhân viên Tiếp Đón Khách Hàng (Bảo Vệ)",
    "Nhân viên kho vận",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ ứng tuyển "${formData.hovaten || "Ứng viên"} - ${
        formData.dienthoai || ""
      }" - tuyendungbachlong@gmail.com - Gmail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #000;
            line-height: 1.5;
            max-width: 900px;
            margin: 0 auto;
        }

        .header {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }

        .job-title {
            color: #0088cc;
            font-size: 24px;
            font-weight: normal;
            margin: 0 0 10px 0;
        }

        .section {
            margin: 32px auto 32px auto; /* cách trên dưới, tự động căn giữa ngang */
            border: 1.5px solid #eee;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 10px 0;
            text-transform: uppercase;
        }

        .section-divider {
            border-bottom: 1px solid #ffd700;
            margin: 5px 0 15px 0;
        }

        .info-row {
            display: flex;
            margin-bottom: 5px;
        }

        .info-label {
            font-weight: bold;
            width: 120px;
            min-width: 120px;
            margin-right: 10px;
        }

        .info-value {
            flex: 1;
        }

        .info-group {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .info-item {
            width: 33%;
            min-width: 250px;
            margin-bottom: 5px;
        }

        .company-section {
            margin-bottom: 15px;
        }

        .company-title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .checkbox {
            margin-right: 5px;
        }

        .signature-section {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }

        .signature-box {
            text-align: center;
            width: 200px;
        }

        .employer-section {
            margin-top: 20px;
        }

        .checkbox-container {
            display: flex;
            align-items: center;
            margin-right: 30px;
        }

        .checkbox-square {
            width: 12px;
            height: 12px;
            border: 1px solid #000;
            margin-right: 5px;
            display: inline-block;
        }

        .dotted-line {
            border-bottom: 1px dotted #000;
            flex: 1;
        }

        .employer-note {
            text-align: right;
            font-style: italic;
            margin-top: 5px;
            font-size: 14px;
        }

        .link {
            color: #0088cc;
            text-decoration: none;
        }

        @media print {
            body {
                padding: 0;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
        }

        .container {
            max-width: 1024px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .header p {
            color: #6b7280;
            margin-bottom: 1rem;
        }

        .email-notice {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 0.5rem;
            padding: 0.75rem;
            margin-top: 1rem;
            display: inline-block;
        }

        .email-notice p {
            color: #15803d;
            font-size: 0.875rem;
            margin: 0;
        }

        .card {
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
            overflow: hidden;
        }

        .card-header {
            background: #f9fafb;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .card-content {
            padding: 1.5rem;
        }

        .grid {
            display: grid;
            gap: 1.5rem;
        }

        .grid-cols-1 {
            grid-template-columns: 1fr;
        }

        .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
        }

        .grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 768px) {
            .grid-cols-2,
            .grid-cols-3 {
                grid-template-columns: 1fr;
            }
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .form-group.col-span-2 {
            grid-column: span 2;
        }

        @media (max-width: 768px) {
            .form-group.col-span-2 {
                grid-column: span 1;
            }
        }

        label {
            font-weight: 500;
            color: #374151;
            font-size: 0.875rem;
        }

        .required::after {
            content: " *";
            color: #ef4444;
        }

        input,
        select,
        textarea {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        .separator {
            height: 1px;
            background: #e5e7eb;
            margin: 2rem 0;
        }

        .section-title {
            font-weight: 600;
            margin-bottom: 1rem;
            color: #111827;
        }

        .submit-container {
            display: flex;
            justify-content: center;
            padding-top: 1.5rem;
        }

        .submit-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 3rem;
            border-radius: 0.5rem;
            font-size: 1.125rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .submit-btn:hover {
            background: #2563eb;
        }

        .submit-btn:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }

        .icon {
            width: 1.25rem;
            height: 1.25rem;
        }
    </style>
</head>
<body>
    <h1 class="job-title">${formData.vitriungtuyen1}</h1>

    <div class="section">
        <h2 class="section-title">THÔNG TIN CÁ NHÂN</h2>
        <div class="section-divider"></div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Họ tên:</div>
                    <div class="info-value">${formData.hovaten}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Giới tính:</div>
                    <div class="info-value">${formData.gioitinh}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Ngày sinh:</div>
                    <div class="info-value">${formData.ngaysinh}</div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Điện thoại:</div>
                    <div class="info-value">${formData.dienthoai}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">CMND/CCCD:</div>
                    <div class="info-value">
                    ${formData.CMND}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Ngày cấp:</div>
                    <div class="info-value">${formData.ngaycap}</div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Hôn nhân:</div>
                    <div class="info-value">${formData.honnhan}</div>
                </div>
            </div>
            <div class="info-item"></div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Nơi cấp:</div>
                    <div class="info-value">${formData.noicap}</div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item" style="width: 50%;">
                <div class="info-row">
                    <div class="info-label">Nơi ở hiện tại:</div>
                    <div class="info-value">${formData.thuongtru}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value"><a href="mailto:${
                      formData.email
                    }" class="link">${formData.email}</a></div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Facebook:</div>
                    <div class="info-value"><a href="${
                      formData.facebook
                    }" class="link">${formData.facebook}</a></div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item"></div>
            <div class="info-item"></div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Facebook:</div>
                    <div class="info-value"><a href="${
                      formData.facebook
                    }" class="link">${formData.facebook}</a></div>
                </div>
            </div>
        </div>

        <div class="info-row">
            <div class="info-label">Giới thiệu bản thân:</div>
            <div class="info-value">${formData.gioithieubanthan}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Mục tiêu nghề nghiệp:</div>
            <div class="info-value">${formData.muctieunghenghiep}</div>
        </div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Chiều cao:</div>
                    <div class="info-value">${formData.chieucao}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Cân nặng:</div>
                    <div class="info-value">${formData.cannang}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">THU NHẬP MONG MUỐN</h2>
        <div class="section-divider"></div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Lương cơ bản:</div>
                    <div class="info-value">${formData.luongcoban}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">KPI:</div>
                    <div class="info-value">${formData.kpi}</div>
                </div>
            </div>
        </div>

        <div class="info-row">
            <div class="info-label">Tổng thu nhập mong muốn tháng đầu tiên (Bao gồm lương cơ bản và KPI ):</div>
            <div class="info-value">${formData.tongthunhapmongmuon}</div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">TRÌNH ĐỘ HỌC VẤN</h2>
        <div class="section-divider"></div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Tên trường:</div>
                    <div class="info-value">${formData.tentruong}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Ngành học:</div>
                    <div class="info-value">${formData.nganhhoc}</div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Trình độ:</div>
                    <div class="info-value">${formData.trinhdo}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Tình trạng:</div>
                    <div class="info-value">${formData.tinhtrang}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">CHỨNG CHỈ</h2>
        <div class="section-divider"></div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Ngoại ngữ:</div>
                    <div class="info-value">${formData.ngoaingu}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Tin học:</div>
                    <div class="info-value">${formData.tinhoc || ""}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Kỹ năng khác (nếu có):</div>
                    <div class="info-value">${formData.kynangkhac || ""}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">QUÁ TRÌNH LÀM VIỆC TRƯỚC ĐÂY</h2>
        <div class="section-divider"></div>

        <div class="company-section">
            <div class="company-title">Công ty 1</div>
            <div class="info-group">
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Thời gian:</div>
                        <div class="info-value">${formData.thoigiancty}</div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Tên công ty:</div>
                        <div class="info-value">${formData.tencty}</div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Công việc đã làm:</div>
                        <div class="info-value">${formData.cviecdalam}</div>
                    </div>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Thu nhập:</div>
                        <div class="info-value">${formData.thunhapcty}</div>
                    </div>
                </div>
                <div class="info-item" style="width: 66%;">
                    <div class="info-row">
                        <div class="info-label">Lý do nghỉ việc:</div>
                        <div class="info-value">${formData.lydonghi}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="company-section">
            <div class="company-title">Công ty 2</div>
            <div class="info-group">
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Thời gian:</div>
                        <div class="info-value">${formData.thoigiancty1}</div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Tên công ty:</div>
                        <div class="info-value">${formData.tencty1}</div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Công việc đã làm:</div>
                        <div class="info-value">${formData.cviecdalam1}</div>
                    </div>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                    <div class="info-row">
                        <div class="info-label">Thu nhập:</div>
                        <div class="info-value">${formData.thunhapcty1}</div>
                    </div>
                </div>
                <div class="info-item" style="width: 66%;">
                    <div class="info-row">
                        <div class="info-label">Lý do nghỉ việc:</div>
                        <div class="info-value">${formData.lydonghi1}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">CA LÀM VIỆC</h2>
        <div class="section-divider"></div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Một ngày Full, một ngày 6,5 tiếng:</div>
                    <div class="info-value">${formData.full1ngay}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Xoay ca 8 tiếng:</div>
                    <div class="info-value">${formData.xoayca}</div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Vị trí ứng tuyển ưu tiên 1:</div>
                    <div class="info-value">${formData.vitriungtuyen1}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Vị trí ứng tuyển ưu tiên 2:</div>
                    <div class="info-value">${formData.vitriungtuyen2}</div>
                </div>
            </div>
        </div>
         <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                  <div class="info-label">Chi nhánh mong muốn đến Thử việc/Làm việc ưu tiên 1:</div>
                  <div class="info-value">${
                    formData.diadiemmongmuonlamviec1
                  }</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                   <div class="info-label">Chi nhánh mong muốn đến Thử việc/Làm việc ưu tiên 2:</div>
                    <div class="info-value">${
                      formData.diadiemmongmuonlamviec2
                    }</div>
                </div>
            </div>
        </div>            
        
        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Thời gian bận việc cá nhân:</div>
                    <div class="info-value">${formData.thoigianban}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Chữ ký ứng viên</div>
                </div>
            </div>
        </div>

        <div class="info-group">
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Kênh tuyển dụng:</div>
                    <div class="info-value">${formData.kenhtuyendung}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Tham gia bảo hiểm:</div>
                    <div class="info-value">${formData.baohiem}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-row">
                    <div class="info-label">Ngày thử việc:</div>
                    <div class="info-value">${formData.ngaythuviec}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">NHẬN XÉT NHÀ TUYỂN DỤNG</h2>
        <div class="section-divider"></div>

        <div style="display: flex; margin-bottom: 15px;">
            <div class="checkbox-container">
                <div class="checkbox-square"></div>
                <div>Phù hợp:</div>
            </div>
            <div class="checkbox-container">
                <div class="checkbox-square"></div>
                <div>Chưa phù hợp:</div>
            </div>
            <div style="flex: 1;"></div>
            <div style="display: flex; align-items: center;">
                <div style="margin-right: 10px;">Điểm:</div>
                <div style="width: 50px;"></div>
                <div style="margin: 0 10px;">Ngày: ...../...../......</div>
            </div>
        </div>

        <div class="info-row">
            <div class="info-label">Vị trí chốt thử việc:</div>
            <div class="info-value dotted-line"></div>
        </div>

        <div class="info-row">
            <div class="info-label">Chi nhánh thử việc:</div>
            <div class="info-value dotted-line"></div>
        </div>

        <div class="info-row">
            <div class="info-label">Nhận xét khác:</div>
            <div class="info-value dotted-line"></div>
        </div>

        <div class="employer-note">(Dành cho nhà tuyển dụng)</div>
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
          full1ngay: "",
          xoayca: "",
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
                <Label htmlFor="full1ngay">Có thể làm full 1 ngày *</Label>
                <Select
                  value={formData.full1ngay}
                  onValueChange={(value) =>
                    handleSelectChange("full1ngay", value)
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
                <Label htmlFor="xoayca">Có thể xoay ca *</Label>
                <Select
                  value={formData.xoayca}
                  onValueChange={(value) => handleSelectChange("xoayca", value)}
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
                <Label htmlFor="vitriungtuyenthem1">Vị trí ứng tuyển 1 *</Label>
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
                  <SelectContent>
                    {positionOptions.map((position) => (
                      <SelectItem
                        key={position}
                        value={position}
                        className="h-3"
                      >
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vitriungtuyen2">Vị trí ứng tuyển 2</Label>
                <Select
                  value={formData.vitriungtuyen2}
                  onValueChange={(value) =>
                    handleSelectChange("vitriungtuyen2", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vị trí thứ 2 (tùy chọn)" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((position) => (
                      <SelectItem
                        key={position}
                        value={position}
                        className="h-3"
                      >
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
                <Input
                  id="diadiemmongmuonlamviec1"
                  name="diadiemmongmuonlamviec1"
                  value={formData.diadiemmongmuonlamviec1}
                  onChange={handleChange}
                  placeholder="Địa điểm làm việc ưu tiên"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diadiemmongmuonlamviec2">
                  Địa điểm mong muốn 2 *
                </Label>
                <Input
                  id="diadiemmongmuonlamviec2"
                  name="diadiemmongmuonlamviec2"
                  value={formData.diadiemmongmuonlamviec2}
                  onChange={handleChange}
                  placeholder="Địa điểm làm việc thứ 2"
                  required
                />
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
