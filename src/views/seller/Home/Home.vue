<script setup>
import Notification from '../../../components/seller/Notification';
</script>

<template>
    <div class="flex mt-6">
        <div class="flex-1 mx-6">
            <div
                class="bg-white w-full p-[24px] rounded"
                style="boxshadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
            >
                <h3 class="text-[2.3rem] leading-7 font-bold">
                    Danh sách cần làm
                </h3>
                <span class="mt-3 text-[13px] text-[#999] font-[400]"
                    >Những việc bạn sẽ cần làm</span
                >

                <div class="my-[24px] max-h-[136px] flex flex-wrap text-[16px]">
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Chờ xác nhận</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Chờ lấy hàng</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Đã xử lý</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Đơn huỷ</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Trả hàng/Hoàn tiền chở</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Sản phẩm hết hàng</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Đang chờ hoá đơn</span>
                    </a>
                    <a
                        href=""
                        class="mb-[15px] relative text-center flex flex-col w-[25%] py-[8px] cursor-pointer rounded-md hover:bg-[#0000000a] contenth"
                    >
                        <span
                            class="mb-3 text-[#2673dd] font-bold text-[1.8rem]"
                            >0</span
                        >
                        <span>Sản phẩm bị tạm khoá</span>
                    </a>
                </div>
            </div>
        </div>
        <Notification />
    </div>
</template>

<style lang="scss" scoped>
.contenth {
    &:nth-child(4n)::after {
        width: 0;
    }
    &::after {
        content: '';
        width: 1px;
        height: calc(100% - 16px);
        background-color: #e5e5e5;
        position: absolute;
        right: 0;
    }
}
</style>
