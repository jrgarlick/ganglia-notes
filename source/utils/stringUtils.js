
class StringUtils {

  static parseTags(prefix, title, tags) {
    let parsedTags = [];
    let tagPatternString = "(^|\\W+)\\"+prefix+"(\\w{3}\\w*)";
    let tagPattern = new RegExp(tagPatternString,"g");
    [title, tags].forEach((item) => {
      item.split("\n").forEach((line) => {
        let result;
        while(result = tagPattern.exec(line)) {
          parsedTags.push(result[2].toLowerCase().replace(/\_/g, ' '));
        }
      })
    });

    return parsedTags.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  static cleanTitle(title) {
    return title.replace(/#|@/g, "").replace(/\_/g, ' ');
  }

}

export default StringUtils;