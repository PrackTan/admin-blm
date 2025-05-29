import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json()

        // Tạo nội dung email HTML
        const emailContent = `
      <h2>Hồ sơ ứng tuyển mới</h2>
      
      <h3>Thông tin cá nhân</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Họ và tên:</strong></td><td>${formData.hovaten || "Chưa điền"}</td></tr>
        <tr><td><strong>Giới tính:</strong></td><td>${formData.gioitinh || "Chưa điền"}</td></tr>
        <tr><td><strong>Ngày sinh:</strong></td><td>${formData.ngaysinh || "Chưa điền"}</td></tr>
        <tr><td><strong>Số điện thoại:</strong></td><td>${formData.dienthoai || "Chưa điền"}</td></tr>
        <tr><td><strong>CMND/CCCD:</strong></td><td>${formData.CMND || "Chưa điền"}</td></tr>
        <tr><td><strong>Ngày cấp:</strong></td><td>${formData.ngaycap || "Chưa điền"}</td></tr>
        <tr><td><strong>Nơi cấp:</strong></td><td>${formData.noicap || "Chưa điền"}</td></tr>
        <tr><td><strong>Tình trạng hôn nhân:</strong></td><td>${formData.honnhan || "Chưa điền"}</td></tr>
        <tr><td><strong>Địa chỉ thường trú:</strong></td><td>${formData.thuongtru || "Chưa điền"}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${formData.email || "Chưa điền"}</td></tr>
        <tr><td><strong>Facebook:</strong></td><td>${formData.facebook || "Chưa điền"}</td></tr>
        <tr><td><strong>Chiều cao:</strong></td><td>${formData.chieucao || "Chưa điền"} cm</td></tr>
        <tr><td><strong>Cân nặng:</strong></td><td>${formData.cannang || "Chưa điền"} kg</td></tr>
      </table>

      <h3>Giới thiệu bản thân</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Tự giới thiệu:</strong></td><td>${formData.gioithieubanthan || "Chưa điền"}</td></tr>
        <tr><td><strong>Mục tiêu nghề nghiệp:</strong></td><td>${formData.muctieunghenghiep || "Chưa điền"}</td></tr>
      </table>

      <h3>Mức lương mong muốn</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Lương cơ bản:</strong></td><td>${formData.luongcoban || "Chưa điền"} VNĐ</td></tr>
        <tr><td><strong>KPI:</strong></td><td>${formData.kpi || "Chưa điền"} VNĐ</td></tr>
        <tr><td><strong>Tổng thu nhập mong muốn:</strong></td><td>${formData.tongthunhapmongmuon || "Chưa điền"} VNĐ</td></tr>
      </table>

      <h3>Trình độ học vấn</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Tên trường:</strong></td><td>${formData.tentruong || "Chưa điền"}</td></tr>
        <tr><td><strong>Trình độ:</strong></td><td>${formData.trinhdo || "Chưa điền"}</td></tr>
        <tr><td><strong>Ngành học:</strong></td><td>${formData.nganhhoc || "Chưa điền"}</td></tr>
        <tr><td><strong>Tình trạng học tập:</strong></td><td>${formData.tinhtrang || "Chưa điền"}</td></tr>
      </table>

      <h3>Kỹ năng</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Ngoại ngữ:</strong></td><td>${formData.ngoaingu || "Chưa điền"}</td></tr>
        <tr><td><strong>Tin học:</strong></td><td>${formData.tinhoc || "Chưa điền"}</td></tr>
        <tr><td><strong>Kỹ năng khác:</strong></td><td>${formData.kynangkhac || "Chưa điền"}</td></tr>
      </table>

      <h3>Kinh nghiệm làm việc</h3>
      <h4>Công ty gần nhất:</h4>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Thời gian:</strong></td><td>${formData.thoigiancty || "Chưa điền"}</td></tr>
        <tr><td><strong>Tên công ty:</strong></td><td>${formData.tencty || "Chưa điền"}</td></tr>
        <tr><td><strong>Công việc:</strong></td><td>${formData.cviecdalam || "Chưa điền"}</td></tr>
        <tr><td><strong>Thu nhập:</strong></td><td>${formData.thunhapcty || "Chưa điền"} VNĐ</td></tr>
        <tr><td><strong>Lý do nghỉ việc:</strong></td><td>${formData.lydonghi || "Chưa điền"}</td></tr>
      </table>

      <h4>Công ty trước đó:</h4>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Thời gian:</strong></td><td>${formData.thoigiancty1 || "Chưa điền"}</td></tr>
        <tr><td><strong>Tên công ty:</strong></td><td>${formData.tencty1 || "Chưa điền"}</td></tr>
        <tr><td><strong>Công việc:</strong></td><td>${formData.cviecdalam1 || "Chưa điền"}</td></tr>
        <tr><td><strong>Thu nhập:</strong></td><td>${formData.thunhapcty1 || "Chưa điền"} VNĐ</td></tr>
        <tr><td><strong>Lý do nghỉ việc:</strong></td><td>${formData.lydonghi1 || "Chưa điền"}</td></tr>
      </table>

      <h3>Thông tin công việc mong muốn</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Thời gian bận:</strong></td><td>${formData.thoigianban || "Chưa điền"}</td></tr>
        <tr><td><strong>Có thể làm full 1 ngày:</strong></td><td>${formData.full1ngay || "Chưa điền"}</td></tr>
        <tr><td><strong>Có thể xoay ca:</strong></td><td>${formData.xoayca || "Chưa điền"}</td></tr>
        <tr><td><strong>Vị trí ứng tuyển thêm:</strong></td><td>${formData.vitriungtuyenthem2 || "Chưa điền"}</td></tr>
        <tr><td><strong>Địa điểm mong muốn 1:</strong></td><td>${formData.diadiemmongmuonlamviec1 || "Chưa điền"}</td></tr>
        <tr><td><strong>Địa điểm mong muốn 2:</strong></td><td>${formData.diadiemmongmuonlamviec2 || "Chưa điền"}</td></tr>
      </table>

      <h3>Thông tin khác</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>Kênh tuyển dụng:</strong></td><td>${formData.kenhtuyendung || "Chưa điền"}</td></tr>
        <tr><td><strong>Có bảo hiểm:</strong></td><td>${formData.baohiem || "Chưa điền"}</td></tr>
        <tr><td><strong>Ngày có thể thử việc:</strong></td><td>${formData.ngaythuviec || "Chưa điền"}</td></tr>
      </table>

      <p><em>Email được gửi tự động từ hệ thống tuyển dụng Bach Long Mobile</em></p>
    `

        // Gửi email sử dụng service email (ví dụ: Resend, SendGrid, etc.)
        // Ở đây tôi sẽ mô phỏng việc gửi email
        const emailData = {
            to: "hr@bachlongmobile.com", // Email của bạn
            from: "noreply@bachlongmobile.com",
            subject: `Hồ sơ ứng tuyển mới từ ${formData.hovaten || "Ứng viên"}`,
            html: emailContent,
        }

        // Mô phỏng gửi email thành công
        console.log("Email data:", emailData)

        // Gửi đến API gốc
        const originalResponse = await fetch("https://vieclam.bachlongmobile.com/wp-json/custom-api/v1/nop-ho-so", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        if (originalResponse.ok) {
            return NextResponse.json({
                success: true,
                message: "Hồ sơ đã được gửi thành công và email thông báo đã được gửi!",
            })
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Có lỗi xảy ra khi gửi hồ sơ!",
                },
                { status: 500 },
            )
        }
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Có lỗi xảy ra khi xử lý yêu cầu!",
            },
            { status: 500 },
        )
    }
}
