const fs = require('fs');
const pdf = require('pdf-parse');

function main() {
  let dataBuffer = fs.readFileSync('./01.pdf');

  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text)
    // fs.writeFileSync('./01-raw.txt', data.text)
    fs.writeFileSync('./01.json', JSON.stringify(result))
  })
}
main()

const STARTSIGN = '中文 英文 K.K.音标';
function parse(text) {
  const rawTextList = text.split('\n').map(t => {
    return t.trim()
  })
  // 1. 找到开始的标志
  const startIndex = rawTextList.findIndex(t => t === STARTSIGN)
  // 2. 过滤掉没有用的
  //   - 空的
  //   - 数字开头的
  const textList = rawTextList.slice(startIndex + 1).filter(t => t && !/\d/.test(Number(t)))
  console.log(textList);
  // 3. 每两个一组
  const result = []

  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: '',
      english: '',
      soundMark: ''
    }

    function run() {
      const element = textList[i];
      let chinese = ''
      let englishAndSoundMark = ''
      if (isChinese(element)) {
        chinese += element
        while (isChinese(textList[i + 1])) {
          chinese += '，' + textList[i + 1]
          i++;
        }

        data.chinese = chinese
      } else {
        englishAndSoundMark += element
        while (textList[i + i] && !isChinese(textList[i + 1])) {
          englishAndSoundMark += ' ' + textList[i + 1]
          i++;
        }

        const { english, soundMark } = parseEnglishAndSoundMark(englishAndSoundMark)
        data.english = english
        data.soundMark = soundMark
      }
    }

    run()
    i++
    run()
    result.push(data)
  }
  console.log(result);
  return result
}

function isChinese(str) {
  var pattern = /^[\u4E00-\u9FA5]/; // 中文字符的Unicode范围
  return pattern.test(str);
}


// 根据英文和音标，解析出英文和音标 以 / 分割
function parseEnglishAndSoundMark(text) {
  const list = text.split(' ')
  const soundMarkStartIndex = list.findIndex(t => t.startsWith('/'))
  const english = list.slice(0, soundMarkStartIndex).join(' ')
  const soundMark = list.slice(soundMarkStartIndex).join(' ')
  return {
    english,
    soundMark,
  }
}
