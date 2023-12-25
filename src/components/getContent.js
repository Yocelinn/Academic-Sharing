export function translateQuery(content, keyword) {
  var obj = require("../components/all_mappings.json");
  var num = 0;
  if (keyword == "articles") num = 0;
  else if (keyword == "patents") num = 1;
  else if (keyword == "reports") num = 3;
  else if (keyword == "sciencedata") num = 4;
  else if (keyword == "books") num = 5;

  // 使用正则表达式替换所有匹配的单词
  const mappings = obj[num];

  // 获取mappings对象的所有键，并将它们连接成一个正则表达式字符串
  const keys = Object.keys(mappings).join("|");
  console.log(mappings)
  return content.replace(
    new RegExp(`\\b(${keys})\\b`, "g"),
    (matched) => mappings[matched]
  );
}
