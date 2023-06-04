<template>
  <div class="render-opt-container">
    <div class="renderItem" v-for="(item, index) in 2000" :key="index">
      {{ item }}<br />
      contain-intrinsic-size是一个CSS属性，它可以用于控制元素的内在尺寸（intrinsic size）的计算方式。内在尺寸是指元素的本身的尺寸，而不是指元素所占据的空间大小。 contain-intrinsic-size属性有两个值，分别是auto和具体数值。 auto：表示元素的内在尺寸应该由浏览器根据内容和样式自动计算。这是默认值。
      具体数值：表示元素的内在尺寸应该固定为指定的数值，可以使用长度单位或百分比。 使用contain-intrinsic-size属性可以实现以下效果： 控制元素的最小内在尺寸：可以将contain-intrinsic-size设置为一个具体数值，以确保元素的内在尺寸不会小于指定的数值。
      控制元素的最大内在尺寸：可以将contain-intrinsic-size设置为一个具体数值，以确保元素的内在尺寸不会大于指定的数值。 控制元素的宽高比：可以将contain-intrinsic-size设置为一个百分比，以确保元素的宽高比保持固定。 需要注意的是，contain-intrinsic-size属性目前只在Chrome
      90及以上版本中支持。在不支持该属性的浏览器中，将会被忽略，不会产生任何效果。此外，该属性也只能用于可替代元素（replaced element），如img、video、iframe等元素，而不能用于普通的HTML元素。哈哈哈
    </div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.render-opt-container {
  .renderItem {
    margin-top: 15px;
    width: 80vw;
    padding: 15px;
    height: 300px;
    text-align: justify;
    background-color: rgba(0, 255, 255, 0.2);

    content-visibility: auto; // 只渲染可视页面，提高性能
  }
}
</style>
