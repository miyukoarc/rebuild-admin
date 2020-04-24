function page() {
  return {
    total: 0, // 总行数
    rows: 10, //pageSize 默认10
    page: 1, //当前page页 默认1
    pageSizes: [10, 20, 30, 50],
    sort: "uuid", //排序字段名 默认uuid
    order: "asc", // asc或者desc
    getZreo: function() {
      return Object.assign({},this , {rows: 0});
    }
  };
}
export default page;
