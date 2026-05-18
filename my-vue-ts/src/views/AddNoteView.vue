<template>
    <div class="add-note-box">
        <van-nav-bar left-arrow >
            <template #right>
                <van-icon name="success" size="18" />
            </template>
        </van-nav-bar>
        <van-field class="filed" rows="1" autosize  type="textarea" placeholder="请输入笔记内容" ></van-field>
    </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

// const note=ref<Note>({
//     content:"",
//     dates:""
// })
</script>

<style lang="scss" scoped>
.add-note-box{
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    background: #fff;
    .filed{
        font-size: 0.22rem;
    }

}
</style>
