# converted
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp26removed[meta cpp]

```cpp
std::size_t converted() const;          // C++11
std::size_t converted() const noexcept; // C++14
```

このクラスはC++17から非推奨となり、C++26で削除された。

## 概要
変換した要素数を取得する。


## 戻り値
[`from_bytes()`](from_bytes.md)もしくは[`to_bytes()`](to_bytes.md)関数で変換した、変換元となった文字列の要素数を返す。


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <string>
#include <locale>
#include <codecvt>

int main()
{
  // UTF-8とUTF-32の相互変換を行うコンバーター
  std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> converter;

  // UTF-32からUTF-8への変換
  {
    std::u32string input = U"あいうえお";
    std::string u8result = converter.to_bytes(input);
    std::cout << input.size() << " : " << converter.converted() << std::endl;
  }

  // UTF-8からUTF-32への変換
  {
    std::string input = u8"あいうえお";
    std::u32string result = converter.from_bytes(input);
    std::cout << input.size() << " : " << converter.converted() << std::endl;
  }
}
```
* std::codecvt_utf8[link /reference/codecvt/codecvt_utf8.md]
* size()[link /reference/string/basic_string/size.md]

### 出力
```
5 : 5
15 : 15
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 5.1 [mark verified]
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [LWG Issue 2174. `wstring_convert::converted()` should be `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2174)
- [P2872R3 Remove `wstring_convert` From C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2872r3.pdf)
