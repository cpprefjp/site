# parse
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp);                                      // (1) C++20

  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp,
          std::basic_string<charT, traits, Alloc>& abbrev);   // (2) C++20

  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp,
          minutes& offset);                                   // (3) C++20

  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp,
          std::basic_string<charT, traits, Alloc>& abbrev,
          minutes& offset);                                   // (4) C++20
}
```
* unspecified[italic]

## 概要
日時文字列を解析する入力マニピュレータ。

- (1) タイムゾーン関係の入力を受け取らない単純な解析を行う
- (2) chronoオブジェクトと、タイムゾーンの略称を解析する
- (3) chronoオブジェクトと、UTCタイムゾーンからのオフセット時間を解析する
- (4) chronoオブジェクトと、タイムゾーンの略称、UTCタイムゾーンからのオフセット時間を解析する


## テンプレートパラメータ制約
- (1) : `from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp)`が妥当な式であること
- (2) : `from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev))`が妥当な式であること
- (3) : 式`from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`declval`](/reference/utility/declval.md)`<`[`basic_string`](/reference/string/basic_string.md)`<charT, traits, Alloc>*>(), &offset)`が評価されないオペランドとして扱われた場合に妥当な式であること
- (4) : `from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev), &offset)`が妥当な式であること


## 戻り値
- (1) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp)`を呼び出して返す
- (2) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev))`を呼び出して返す
- (3) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp, static_cast<`[`basic_string`](/reference/string/basic_string.md)`<charT, traits, Alloc>*>(nullptr), &offset)`を呼び出して返す
- (4) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev), &offset)`を呼び出して返す


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
