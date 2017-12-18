# converted
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_t converted() const;          // C++11
size_t converted() const noexcept; // C++14
```
* size_t[link /reference/cstddef/size_t.md]

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
* std::string[link /reference/string/basic_string.md]
* std::u32string[link /reference/string/basic_string.md]
* size()[link /reference/string/basic_string/size.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

### 出力
```
5 : 5
15 : 15
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC, C++11 mode](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 参照
- [LWG Issue 2174. `wstring_convert::converted()` should be `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2174)

