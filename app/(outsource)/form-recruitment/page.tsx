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
} from "lucide-react";
import { Toaster as Sonner, toast, ToasterProps } from "sonner";

export default function RecruitmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Gửi đến API route mới để xử lý email
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast("Thành công!", {
          description:
            "Hồ sơ đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.",
          duration: 5000,
        });

        // Reset form
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
      } else {
        toast("Lỗi!", {
          description:
            result.message || "Có lỗi xảy ra khi gửi hồ sơ. Vui lòng thử lại.",
          duration: 5000,
        });
      }
    } catch (error) {
      toast("Lỗi!", {
        description:
          "Có lỗi xảy ra khi gửi hồ sơ. Vui lòng kiểm tra kết nối mạng và thử lại.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
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
                <Label htmlFor="ngaysinh">Ngày sinh</Label>
                <Input
                  id="ngaysinh"
                  name="ngaysinh"
                  type="date"
                  value={formData.ngaysinh}
                  onChange={handleChange}
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
                <Label htmlFor="CMND">CMND/CCCD</Label>
                <Input
                  id="CMND"
                  name="CMND"
                  value={formData.CMND}
                  onChange={handleChange}
                  placeholder="Số CMND/CCCD"
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
                <Label htmlFor="thuongtru">Địa chỉ thường trú</Label>
                <Input
                  id="thuongtru"
                  name="thuongtru"
                  value={formData.thuongtru}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ thường trú"
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
                <Label htmlFor="gioithieubanthan">Tự giới thiệu bản thân</Label>
                <Textarea
                  id="gioithieubanthan"
                  name="gioithieubanthan"
                  value={formData.gioithieubanthan}
                  onChange={handleChange}
                  placeholder="Hãy giới thiệu về bản thân, kinh nghiệm và điểm mạnh của bạn..."
                  rows={4}
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
                  Tổng thu nhập mong muốn (VNĐ)
                </Label>
                <Input
                  id="tongthunhapmongmuon"
                  name="tongthunhapmongmuon"
                  value={formData.tongthunhapmongmuon}
                  onChange={handleChange}
                  placeholder="Tổng thu nhập mong muốn"
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
                <Label htmlFor="tentruong">Tên trường</Label>
                <Input
                  id="tentruong"
                  name="tentruong"
                  value={formData.tentruong}
                  onChange={handleChange}
                  placeholder="Tên trường đã học"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trinhdo">Trình độ</Label>
                <Select
                  value={formData.trinhdo}
                  onValueChange={(value) =>
                    handleSelectChange("trinhdo", value)
                  }
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

              <Separator />

              {/* Công ty 2 */}
              <div>
                <h4 className="font-semibold mb-4">
                  Công ty trước đó (nếu có)
                </h4>
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
                <Label htmlFor="full1ngay">Có thể làm full 1 ngày</Label>
                <Select
                  value={formData.full1ngay}
                  onValueChange={(value) =>
                    handleSelectChange("full1ngay", value)
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
                <Label htmlFor="xoayca">Có thể xoay ca</Label>
                <Select
                  value={formData.xoayca}
                  onValueChange={(value) => handleSelectChange("xoayca", value)}
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
                  Địa điểm mong muốn 1
                </Label>
                <Input
                  id="diadiemmongmuonlamviec1"
                  name="diadiemmongmuonlamviec1"
                  value={formData.diadiemmongmuonlamviec1}
                  onChange={handleChange}
                  placeholder="Địa điểm làm việc ưu tiên"
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
                <Label htmlFor="kenhtuyendung">Kênh tuyển dụng</Label>
                <Select
                  value={formData.kenhtuyendung}
                  onValueChange={(value) =>
                    handleSelectChange("kenhtuyendung", value)
                  }
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
                <Label htmlFor="ngaythuviec">Ngày có thể thử việc</Label>
                <Input
                  id="ngaythuviec"
                  name="ngaythuviec"
                  type="date"
                  value={formData.ngaythuviec}
                  onChange={handleChange}
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
                  Đang gửi...
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
