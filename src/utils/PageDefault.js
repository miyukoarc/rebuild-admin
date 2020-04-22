function page() {
  return {
    total: 100, // 总行数
    rows: 50, //0时返回所有
    page: 1, //当前page页
    pageSizes: [10, 20, 30, 50],
    sort: "", //排序字段名
    order: "asc", // asc或者desc
    getZreo: function() {
      return Object.assign({},this , {rows: 0});
    }
  };
}
export default page;
