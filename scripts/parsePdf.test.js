import { describe, it, expect } from 'vitest'
import { parse, parseEnglishAndSoundMark } from './parsePdf'

describe("parsePdf", () => {
  it('happy path', () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "我 \n" +
      "I /aɪ/ \n" +
      "\n" +
      "3 \n" +
      "喜欢 \n" +
      "like /laɪk/ \n";

    expect(parse(pdfText)).toEqual([
      {
        chinese: "我",
        english: "I",
        soundMark: "/aɪ/"
      },
      {
        chinese: "喜欢",
        english: "like",
        soundMark: "/laɪk/"
      }
    ])
  })

  describe('parse English And SoundMark2', () => {
    it.only('complex', () => {
      const pdfText =
        " \n" +
        "你好，我是星荣。 \n" +
        "中文 英文 K.K.音标 \n" +
        "我 \n" +
        "I /aɪ/ \n" +
        '我需要告诉你重要的某些事情 \n' +
        'I need to tell you something important \n' +
        '/aɪ/ /nid/ /tə/ /tɛl/ /ju/ \n' +
        "\n" +
        "3 \n" +
        "喜欢 \n" +
        "like /laɪk/ \n";

      expect(parse(pdfText)).toEqual([
        {
          chinese: "我",
          english: "I",
          soundMark: "/aɪ/"
        },
        {
          chinese: "我需要告诉你重要的某些事情",
          english: "I need to tell you something important",
          soundMark: "/aɪ/ /nid/ /tə/ /tɛl/ /ju/"
        },
        {
          chinese: "喜欢",
          english: "like",
          soundMark: "/laɪk/"
        }
      ])
    })
  })

  describe('parse English And SoundMark', () => {
    it('if simple', () => {
      expect(parseEnglishAndSoundMark('I /aɪ/')).toEqual({
        english: 'I',
        soundMark: '/aɪ/'
      })
    })
    it('if multiunit', () => {
      expect(parseEnglishAndSoundMark('I am /aɪ/ /am/')).toEqual({
        english: 'I am',
        soundMark: '/aɪ/ /am/'
      })
    })
  })
})