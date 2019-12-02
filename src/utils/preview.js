// 文档预览
export function preview(path){
  let format = this.matchType(path)
  // 将反斜杠转化为正斜杠
  path = path.replace("\\\\", "\/\/");
  path = path.replace("\\", "\/");
  path = path.replace("\\", "\/");
  path = path.replace("\\", "\/");
  // 在线预览
  if (format == 'office') {
    // 文档预览
    let office = 'https://view.officeapps.live.com/op/view.aspx?src='
    // 新开页面跳转文档预览（需要域名）
    window.open( office + '/api/upload' + path, '_blank');
  }else if(format == 'image'){
    // 图片预览
    this.dialogVisible = true;
    // 图片路径
    this.previewImage ='/api/upload' + path;
  }else if(format == 'pdf'){
    // 新开页面跳转pdf文档预览
    window.open('/api/upload' + path, '_blank');
  }
}