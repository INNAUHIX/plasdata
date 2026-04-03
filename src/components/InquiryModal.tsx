"use client";

import { useState } from "react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialName?: string;
  materialPrice?: string;
}

interface FormData {
  materialModel: string;
  serviceType: "inquiry" | "urgent";
  contactName: string;
  contactPhone: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  materialName = "塞拉尼斯/Celanex@2004-2T PBT",
  materialPrice = "2735",
}: InquiryModalProps) {
  const [formData, setFormData] = useState<FormData>({
    materialModel: materialName,
    serviceType: "inquiry",
    contactName: "张三", // 默认联系人
    contactPhone: "13800138000", // 默认电话
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.materialModel.trim()) {
      newErrors.materialModel = "请输入材料型号";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "请输入联系人姓名";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "请输入联系电话";
    } else if (!/^1[3-9]\d{9}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = "请输入正确的手机号码";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("表单提交数据:", formData);
      alert("询价提交成功！我们会尽快与您联系。");
      onClose();
      setFormData({
        materialModel: "",
        serviceType: "inquiry",
        contactName: "",
        contactPhone: "",
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl">
        {/* 内容区 */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 左侧宣传图 */}
          <div className="hidden h-full rounded-tl-2xl rounded-bl-2xl bg-gradient-to-br from-orange-400 to-orange-500 p-8 flex-col items-center justify-center md:flex">
            <div className="text-center">
              <div className="mb-6 text-6xl">🤖</div>
              <h3 className="mb-2 text-2xl font-bold text-white">AI 选材助手</h3>
              <p className="mb-6 text-white/90">智能驱动高效决策</p>
              <p className="text-sm text-white/80">
                精准分析，科学推荐，<br />
                助力选材新升级
              </p>
              <div className="mt-8 text-white font-semibold">塑库网</div>
            </div>
          </div>

          {/* 右侧表单 */}
          <div className="relative h-full rounded-tr-2xl rounded-br-2xl bg-white p-8">
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            {/* 标题 */}
            <div className="mb-6 pt-2">
              <h2 className="text-lg font-bold text-gray-800">询价采购</h2>
              <p className="text-sm text-gray-500">请填写以下信息，我们将尽快与您联系</p>
            </div>



            {/* 表单 */}
            <div className="space-y-3">
              {/* 材料型号 */}
              <div className="flex items-start gap-2" style={{minHeight: '70px'}}>
                <label className="w-24 pt-3 text-sm font-medium text-gray-700">
                  材料型号
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.materialModel || ""}
                    onChange={(e) => handleInputChange("materialModel", e.target.value)}
                    placeholder="请输入型号"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                      errors.materialModel
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  <div className="h-4">
                    {errors.materialModel && (
                      <p className="mt-1 text-xs text-red-500">{errors.materialModel}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 选择服务 */}
              <div className="flex items-start gap-2" style={{minHeight: '60px'}}>
                <label className="w-24 pt-3 text-sm font-medium text-gray-700">
                  选择服务
                </label>
                <div className="flex-1">
                  <div className="flex gap-4">
                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-lg py-2.5 px-8 text-sm font-medium transition ${formData.serviceType === "inquiry" ? "border-2 border-orange-500 bg-orange-50 text-orange-500" : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50"}`}
                      onClick={() => handleInputChange("serviceType", "inquiry")}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value="inquiry"
                        checked={formData.serviceType === "inquiry"}
                        onChange={() => handleInputChange("serviceType", "inquiry")}
                        className="sr-only"
                      />
                      前期询价
                    </label>
                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-lg py-2.5 px-8 text-sm font-medium transition ${formData.serviceType === "urgent" ? "border-2 border-orange-500 bg-orange-50 text-orange-500" : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50"}`}
                      onClick={() => handleInputChange("serviceType", "urgent")}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value="urgent"
                        checked={formData.serviceType === "urgent"}
                        onChange={() => handleInputChange("serviceType", "urgent")}
                        className="sr-only"
                      />
                      紧急采购
                    </label>
                  </div>
                  <div className="h-4"></div>
                </div>
              </div>

              {/* 联系人 */}
              <div className="flex items-start gap-2" style={{minHeight: '70px'}}>
                <label className="w-24 pt-3 text-sm font-medium text-gray-700">
                  联系人
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="请输入您的名字"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                      errors.contactName
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  <div className="h-4">
                    {errors.contactName && (
                      <p className="mt-1 text-xs text-red-500">{errors.contactName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 联系电话 */}
              <div className="flex items-start gap-2" style={{minHeight: '70px'}}>
                <label className="w-24 pt-3 text-sm font-medium text-gray-700">
                  联系电话
                </label>
                <div className="flex-1">
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="请输入您的手机号"
                    maxLength={11}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                      errors.contactPhone
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  <div className="h-4">
                    {errors.contactPhone && (
                      <p className="mt-1 text-xs text-red-500">{errors.contactPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:from-orange-600 hover:to-orange-500 hover:shadow-xl active:scale-[0.98]"
                >
                  一键询价
                </button>
                <p className="text-center text-xs text-gray-400">
                  快速对接客服，可联系塑库网报价热线
                  <span className="text-orange-500">18823327240</span>（微信同号）
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
