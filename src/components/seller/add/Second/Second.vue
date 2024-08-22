<script setup>
import { ref, toRefs } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useAuthToken } from '../../../../storage/useAuthToken';
import mainServices from '../../../../domain/mainServices';
import axios from 'axios';

const { token } = useAuthToken();
const img = ref([]);
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const result = ref(null);

const props = defineProps({
    idProduct: Number,
});

const { idProduct } = toRefs(props);

/*
const fileList = ref([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-xxx',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error',
  },
]);
*/

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};

const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const getSignedUrl = async () => {
    try {
        const response = await mainServices.getImg();
        //console.log(response);
        result.value = response.data.result;
    } catch (error) {
        console.log(error);
    }
};

const uploadFileToSignedUrl = async (url, file) => {
    try {
        await axios.put(url, file, {
            headers: {
                'Content-Type': file.type, // Đảm bảo đúng Content-Type của file (image/jpeg, image/png, etc.)
            },
        });
        //console.log('success');
    } catch (error) {
        console.log(error);
    }
};

const handleUpload = async ({ onSuccess, file }) => {
    await getSignedUrl();
    await uploadFileToSignedUrl(result.value.url, file);

    try {
        const response = await mainServices.addImgProduct(
            idProduct.value,
            result.value.fileName
        );
        console.log(response);
        onSuccess(response);
    } catch (error) {
        console.log(error);
    }
};

const handleRemove = async file => {
    console.log(file.name);
    console.log(file.response.fileName);

    try {
        const fileName = file.name || file.response.fileName;

        const response = await mainServices.deleteImgProduct(fileName);

        console.log('Image removed successfully', response);
    } catch (error) {
        console.error('Error removing image:', error);
    }
};
</script>

<template>
    <h3 class="text-[2.5rem] font-semibold mb-[24px]">Tải ảnh sản phẩm</h3>
    <a-form-item
        label="Hình ảnh"
        name="img"
        :rules="[{ required: true, message: 'Please input your productImg!' }]"
    >
        <div class="clearfix">
            <a-upload
                v-model:file-list="img"
                list-type="picture-card"
                @preview="handlePreview"
                :custom-request="handleUpload"
                @remove="handleRemove"
            >
                <div v-if="img.length < 6">
                    <plus-outlined />
                    <div style="margin-top: 8px">Upload(max: 6 ảnh)</div>
                </div>
            </a-upload>
            <a-modal
                :open="previewVisible"
                :title="previewTitle"
                :footer="null"
                @cancel="handleCancel"
            >
                <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </div>
    </a-form-item>
</template>

<style scoped>
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.ant-form-item .ant-form-item-label > label {
    font-size: 3rem !important;
}
</style>
