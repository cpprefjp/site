# pubsync
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int pubsync();

    ……
  };
}
```

## 概要
出力列の同期。

## 効果
protected virtualの[`sync()`](sync.md)を呼ぶ。

## 戻り値
[`sync()`](sync.md)。

## バージョン
### 言語
- C++98

## 参照
- [`sync()`](sync.md)
