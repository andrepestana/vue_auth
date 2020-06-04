<template>
    <div class="post-box">
        <h4>{{ post.title }}</h4>
        <p>{{ post.content }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        post: Object
    }
}
</script>
<style scoped>
  .post-box {
    margin: 10px;
    border: 1px solid #eee;
    padding: 10px;
    box-shadow: 0 2px 3px #ccc;
  }
</style>