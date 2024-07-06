const paginate = function (reqQuery, query) {
  const page = reqQuery.page * 1 || 1;
  return query.skip((page - 1) * 10).limit(10);
};
module.exports=paginate