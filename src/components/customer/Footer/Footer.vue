<script setup>
import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
} from '@ant-design/icons-vue';
import { AppStore, GGPlay, AppGallery } from '../../../assets';
</script>
<template>
    <div
        class="footer border-t border-green-400 bg-[var(--primary-color)] mt-auto py-12"
    >
        <div class="px-24 flex justify-evenly">
            <div>
                <h3>CHĂM SÓC KHÁCH HÀNG</h3>
                <ul>
                    <li>Trung Tâm Trợ Giúp</li>
                    <li>Hướng Dẫn Mua Hàng</li>
                    <li>Hướng Dẫn Bán Hàng</li>
                </ul>
            </div>
            <div>
                <h3>GIỚI THIỆU</h3>
                <ul>
                    <li>Điều khoản</li>
                    <li>Chính sách bảo mật</li>
                    <li>Tuyển dụng</li>
                </ul>
            </div>
            <div>
                <h3>THEO DÕI CHÚNG TÔI</h3>
                <ul>
                    <li>
                        <FacebookOutlined class="icon" />
                        <span>Facebook</span>
                    </li>
                    <li>
                        <InstagramOutlined class="icon" />
                        <span>Instagram</span>
                    </li>
                    <li>
                        <LinkedinOutlined class="icon" />
                        <span>Linkedin</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3>VÀO CỬA HÀNG TRÊN ỨNG DỤNG</h3>
                <ul>
                    <li>
                        <img :src="AppStore" alt="" />
                    </li>
                    <li>
                        <img :src="GGPlay" alt="" />
                    </li>
                    <li>
                        <img :src="AppGallery" alt="" />
                    </li>
                </ul>
            </div>
        </div>
        <div
            class="border-t border-1 border-custom-gray text-center text-[var(--text-color) ] pt-4 mt-12 text-[18px]"
        >
            @2024-Copyright by GHTK Company
        </div>
    </div>
</template>

<style scoped src="./footer.scss"></style>
