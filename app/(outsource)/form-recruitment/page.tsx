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
    vitriungtuyenthem2: "",
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
      // Kiểm tra định dạng file
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận file PDF, DOC hoặc DOCX!");
        return;
      }

      // Kiểm tra kích thước file (tối đa 5MB)
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
    // Reset input file
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
    // Nếu ẩn công ty thứ 2, xóa dữ liệu của nó
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Tạo nội dung email HTML đẹp
      const emailContent = `
                <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Ứng Tuyển - Email Version</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 800px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
            <td style="padding: 30px; text-align: center; background-color: #4f46e5; color: white;">
                <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Form Ứng Tuyển</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Thông tin ứng viên</p>
                ${
                  cvFile
                    ? `<p style="margin: 10px 0 0 0; font-size: 14px; background: rgba(255,255,255,0.2); padding: 8px; border-radius: 4px;">📎 File CV đính kèm: ${cvFile.name}</p>`
                    : ""
                }
            </td>
        </tr>
        <!-- Thông tin cá nhân -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">👤 Thông tin cá nhân</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table width="100%" cellpadding="8" cellspacing="0">
                                <tr>
                                    <td width="50%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Họ và tên:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.hovaten
                                        }</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Giới tính:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.gioitinh
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Ngày sinh:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.ngaysinh
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Số điện thoại:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.dienthoai
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">CMND/CCCD:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.CMND
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Ngày cấp:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.ngaycap
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Nơi cấp:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.noicap
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Tình trạng hôn nhân:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.honnhan
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Địa chỉ thường trú:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.thuongtru
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Email:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.email
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Facebook:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.facebook
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Chiều cao:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.chieucao
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Cân nặng:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.cannang
                                        }</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Giới thiệu bản thân -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">👥 Giới thiệu bản thân</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <div style="margin-bottom: 15px;">
                                <strong style="color: #374151;">Tự giới thiệu bản thân:</strong><br>
                                <span style="color: #6b7280; line-height: 1.6;">
                                    ${formData.gioithieubanthan}
                                </span>
                            </div>
                            <div>
                                <strong style="color: #374151;">Mục tiêu nghề nghiệp:</strong><br>
                                <span style="color: #6b7280; line-height: 1.6;">
                                    ${formData.muctieunghenghiep}
                                </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Mức lương mong muốn -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">💰 Mức lương mong muốn</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table width="100%" cellpadding="8" cellspacing="0">
                                <tr>
                                    <td width="33%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Lương cơ bản:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.luongcoban
                                        }</span>
                                    </td>
                                    <td width="33%" style="vertical-align: top;">
                                        <strong style="color: #374151;">KPI:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.kpi
                                        }</span>
                                    </td>
                                    <td width="34%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Tổng thu nhập:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.tongthunhapmongmuon
                                        }</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Trình độ học vấn -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">🎓 Trình độ học vấn</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table width="100%" cellpadding="8" cellspacing="0">
                                <tr>
                                    <td width="50%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Tên trường:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.tentruong
                                        }</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Trình độ:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.trinhdo
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Ngành học:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.nganhhoc
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Tình trạng:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.tinhtrang
                                        }</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Kỹ năng -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">⚡ Kỹ năng</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table width="100%" cellpadding="8" cellspacing="0">
                                <tr>
                                    <td width="33%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Ngoại ngữ:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.ngoaingu
                                        }</span>
                                    </td>
                                    <td width="33%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Tin học:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.tinhoc
                                        }</span>
                                    </td>
                                    <td width="34%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Kỹ năng khác:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.kynangkhac
                                        }</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Kinh nghiệm làm việc -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">💼 Kinh nghiệm làm việc</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <!-- Công ty 1 -->
                            <div style="margin-bottom: 25px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 16px;">Công ty gần nhất</h3>
                                <table width="100%" cellpadding="5" cellspacing="0">
                                    <tr>
                                        <td width="50%" style="vertical-align: top;">
                                            <strong style="color: #374151;">Thời gian:</strong><br>
                                            <span style="color: #6b7280;">${
                                              formData.thoigiancty
                                            }</span>
                                        </td>
                                        <td width="50%" style="vertical-align: top;">
                                            <strong style="color: #374151;">Tên công ty:</strong><br>
                                            <span style="color: #6b7280;">${
                                              formData.tencty
                                            }</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align: top; padding-top: 10px;">
                                            <strong style="color: #374151;">Vị trí:</strong><br>
                                            <span style="color: #6b7280;">${
                                              formData.cviecdalam
                                            }</span>
                                        </td>
                                        <td style="vertical-align: top; padding-top: 10px;">
                                            <strong style="color: #374151;">Thu nhập:</strong><br>
                                            <span style="color: #6b7280;">${
                                              formData.thunhapcty
                                            }</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="vertical-align: top; padding-top: 10px;">
                                            <strong style="color: #374151;">Lý do nghỉ việc:</strong><br>
                                            <span style="color: #6b7280;">${
                                              formData.lydonghi
                                            }</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            ${
                              showSecondCompany && formData.tencty1
                                ? `
                            <!-- Công ty 2 -->
                            <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 16px;">Công ty trước đó</h3>
                                <table width="100%" cellpadding="5" cellspacing="0">
                                    <tr>
                                        <td width="50%" style="vertical-align: top;">
                                            <strong style="color: #374151;">Thời gian:</strong><br>
                                            <span style="color: #6b7280;">${formData.thoigiancty1}</span>
                                        </td>
                                        <td width="50%" style="vertical-align: top;">
                                            <strong style="color: #374151;">Tên công ty:</strong><br>
                                            <span style="color: #6b7280;">${formData.tencty1}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align: top; padding-top: 10px;">
                                            <strong style="color: #374151;">Vị trí:</strong><br>
                                            <span style="color: #6b7280;">${formData.cviecdalam1}</span>
                                        </td>
                                        <td style="vertical-align: top; padding-top: 10px;">
                                            <strong style="color: #374151;">Thu nhập:</strong><br>
                                            <span style="color: #6b7280;">${formData.thunhapcty1}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="vertical-align: top; padding-top: 10px;">
                                            <strong style="color: #374151;">Lý do nghỉ việc:</strong><br>
                                            <span style="color: #6b7280;">${formData.lydonghi1}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            `
                                : ""
                            }
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Thông tin công việc mong muốn -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">📍 Thông tin công việc mong muốn</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table width="100%" cellpadding="8" cellspacing="0">
                                <tr>
                                    <td width="50%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Thời gian bận:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.thoigianban
                                        }</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Có thể làm full 1 ngày:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.full1ngay
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Có thể xoay ca:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.xoayca
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Vị trí ứng tuyển thêm:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.vitriungtuyenthem2
                                        }</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Địa điểm mong muốn 1:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.diadiemmongmuonlamviec1
                                        }</span>
                                    </td>
                                    <td style="vertical-align: top; padding-top: 15px;">
                                        <strong style="color: #374151;">Địa điểm mong muốn 2:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.diadiemmongmuonlamviec2
                                        }</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Thông tin khác -->
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">⏰ Thông tin khác</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table width="100%" cellpadding="8" cellspacing="0">
                                <tr>
                                    <td width="33%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Kênh tuyển dụng:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.kenhtuyendung
                                        }</span>
                                    </td>
                                    <td width="33%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Có bảo hiểm:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.baohiem
                                        }</span>
                                    </td>
                                    <td width="34%" style="vertical-align: top;">
                                        <strong style="color: #374151;">Ngày có thể thử việc:</strong><br>
                                        <span style="color: #6b7280;">${
                                          formData.ngaythuviec
                                        }</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 2px solid #e2e8f0;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    📧 Hồ sơ ứng tuyển được gửi tự động<br>
                    📞 Liên hệ: (028) 22.68.68.68 | ✉️ tuyendungbachlong@gmail.com
                </p>
            </td>
        </tr>
    </table>
</body>
</html> `;

      // Tạo FormData để gửi cả text và file
      const submitData = new FormData();

      // Thêm tất cả dữ liệu form
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Thêm email content
      submitData.append("emailContent", emailContent);
      submitData.append("to", "tuyendungbachlong@gmail.com");
      submitData.append(
        "subject",
        `🎯 Hồ sơ ứng tuyển mới từ ${formData.hovaten || "Ứng viên"} - ${
          formData.dienthoai || ""
        }`
      );

      // Thêm file CV nếu có
      if (cvFile) {
        submitData.append("cvFile", cvFile);
      }

      // Gửi email qua API route
      const res = await fetch("/form-recruitment/api/send-email", {
        method: "POST",
        body: submitData, // Không set Content-Type header khi gửi FormData
      });

      const result = await res.json();

      if (result.success) {
        toast.success("✅ Gửi hồ sơ thành công!", {
          description: cvFile
            ? "Hồ sơ và file CV của bạn đã được gửi đến email tuyển dụng dưới dạng file đính kèm. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
            : "Hồ sơ của bạn đã được gửi đến email tuyển dụng. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.",
          duration: 6000,
        });

        // Reset form sau khi gửi thành công
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
          vitriungtuyenthem2: "",
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
          {/* Thông tin cá nhân */}
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
                <Label htmlFor="ngaycap">Ngày cấp</Label>
                <Input
                  id="ngaycap"
                  name="ngaycap"
                  type="date"
                  value={formData.ngaycap}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noicap">Nơi cấp</Label>
                <Input
                  id="noicap"
                  name="noicap"
                  value={formData.noicap}
                  onChange={handleChange}
                  placeholder="Nơi cấp CMND/CCCD"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="honnhan">Tình trạng hôn nhân</Label>
                <Select
                  value={formData.honnhan}
                  onValueChange={(value) =>
                    handleSelectChange("honnhan", value)
                  }
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
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Link Facebook cá nhân"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chieucao">Chiều cao (cm)</Label>
                <Input
                  id="chieucao"
                  name="chieucao"
                  value={formData.chieucao}
                  onChange={handleChange}
                  placeholder="Chiều cao"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cannang">Cân nặng (kg)</Label>
                <Input
                  id="cannang"
                  name="cannang"
                  value={formData.cannang}
                  onChange={handleChange}
                  placeholder="Cân nặng"
                />
              </div>
            </CardContent>
          </Card>

          {/* Upload CV */}
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

                {/* Hiển thị file đã chọn */}
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

          {/* Giới thiệu bản thân */}
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

          {/* Mức lương mong muốn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Mức lương mong muốn
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="luongcoban">Lương cơ bản (VNĐ)</Label>
                <Input
                  id="luongcoban"
                  name="luongcoban"
                  value={formData.luongcoban}
                  onChange={handleChange}
                  placeholder="Lương cơ bản mong muốn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kpi">KPI (VNĐ)</Label>
                <Input
                  id="kpi"
                  name="kpi"
                  value={formData.kpi}
                  onChange={handleChange}
                  placeholder="KPI mong muốn"
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

          {/* Trình độ học vấn */}
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
                <Label htmlFor="nganhhoc">Ngành học</Label>
                <Input
                  id="nganhhoc"
                  name="nganhhoc"
                  value={formData.nganhhoc}
                  onChange={handleChange}
                  placeholder="Ngành học/Chuyên môn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tinhtrang">Tình trạng học tập</Label>
                <Select
                  value={formData.tinhtrang}
                  onValueChange={(value) =>
                    handleSelectChange("tinhtrang", value)
                  }
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

          {/* Kỹ năng */}
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

          {/* Kinh nghiệm làm việc */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Công ty 1 */}
              <div>
                <h4 className="font-semibold mb-4">Công ty gần nhất</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="thoigiancty">Thời gian làm việc</Label>
                    <Input
                      id="thoigiancty"
                      name="thoigiancty"
                      value={formData.thoigiancty}
                      onChange={handleChange}
                      placeholder="01/2020 - 12/2023"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tencty">Tên công ty</Label>
                    <Input
                      id="tencty"
                      name="tencty"
                      value={formData.tencty}
                      onChange={handleChange}
                      placeholder="Tên công ty"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cviecdalam">Công việc đã làm</Label>
                    <Input
                      id="cviecdalam"
                      name="cviecdalam"
                      value={formData.cviecdalam}
                      onChange={handleChange}
                      placeholder="Vị trí/Chức vụ"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thunhapcty">Thu nhập (VNĐ)</Label>
                    <Input
                      id="thunhapcty"
                      name="thunhapcty"
                      value={formData.thunhapcty}
                      onChange={handleChange}
                      placeholder="Thu nhập tại công ty"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="lydonghi">Lý do nghỉ việc</Label>
                    <Textarea
                      id="lydonghi"
                      name="lydonghi"
                      value={formData.lydonghi}
                      onChange={handleChange}
                      placeholder="Lý do nghỉ việc tại công ty này"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Nút thêm/ẩn công ty thứ 2 */}
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

              {/* Công ty 2 - Chỉ hiển thị khi showSecondCompany = true */}
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

          {/* Thông tin công việc mong muốn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Thông tin công việc mong muốn
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="thoigianban">Thời gian bận</Label>
                <Input
                  id="thoigianban"
                  name="thoigianban"
                  value={formData.thoigianban}
                  onChange={handleChange}
                  placeholder="Thời gian không thể làm việc"
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
                <Label htmlFor="vitriungtuyenthem2">
                  Vị trí ứng tuyển thêm
                </Label>
                <Input
                  id="vitriungtuyenthem2"
                  name="vitriungtuyenthem2"
                  value={formData.vitriungtuyenthem2}
                  onChange={handleChange}
                  placeholder="Vị trí khác muốn ứng tuyển"
                />
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
                  Địa điểm mong muốn 2
                </Label>
                <Input
                  id="diadiemmongmuonlamviec2"
                  name="diadiemmongmuonlamviec2"
                  value={formData.diadiemmongmuonlamviec2}
                  onChange={handleChange}
                  placeholder="Địa điểm làm việc thứ 2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Thông tin khác */}
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
                <Label htmlFor="baohiem">Có bảo hiểm</Label>
                <Select
                  value={formData.baohiem}
                  onValueChange={(value) =>
                    handleSelectChange("baohiem", value)
                  }
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

          {/* Submit button */}
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
