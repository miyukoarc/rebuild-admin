function page() {
  return {
    total: 0, // 总行数
    rows: 20, //pageSize 默认10
    page: 1, //当前page页 默认1
    pageSizes: [20, 50, 100],
    sort: "uuid", //排序字段名 默认uuid
    order: "asc", // asc或者desc
    isNull: function() {
      // return Object.assign({},this , {rows: 0});
      return null; //获取所有（无分页）
    }
  };
}
export default page;
