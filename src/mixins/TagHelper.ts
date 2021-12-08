import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue{
  createTag(){
    const name = window.prompt('请输入标签名');
    if (!name) {
      return window.alert('标签名不能为空！');
    }else if(name.length>4){
      return window.alert('标签名最长4个字符！')
    }
    this.$store.commit('addTag', name);
  }
}

export default TagHelper;