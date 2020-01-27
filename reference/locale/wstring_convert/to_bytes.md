# to_bytes
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

```cpp
byte_string to_bytes(Elem wchar);              // (1)
byte_string to_bytes(const Elem* wptr);        // (2)
byte_string to_bytes(const wide_string& wstr); // (3)
byte_string to_bytes(const Elem* first,
                     const Elem* last);        // (4)
```

このクラスはC++17から非推奨となった。

## 概要
ワイド文�列からバイト文�列に変換する。


## 効果
変換前に、[`state()`](state.md)メンバ関数が返す状態値が、コンストラクタで明示的に指定されていなかった場合、デフォルト値を�定する。

- (1) : 1つのワイド文�を、バイト文�列に変換する。
- (2) : ワイド文�配列を、バイト文�列に変換する。
- (3) : ワイド文�列を、バイト文�列に変換する。
- (4) : ワイド文�の範囲`[first, last)`を、バイト文�列に変換する。

変換に成功した場合、成功した要素数が、[`converted()`](converted.md)メンバ関数が返す変数に�定される。



## 戻り値
変換結果のバイト文�列を返す。

変換に失敗し、コンストラクタで`byte_err`パラメータ(エラー時に返す文�列)が�定された場合、そのパラメータを返す。


## 例外
変換に失敗し、コンストラクタで`byte_err`パラメータ(エラー時に返す文�列)が�定されていなかった場合、[`std::range_error`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <cassert>
#include <string>
#include <locale>
#include <codecvt>
#include <iterator>

int main()
{
  // UTF-8とUTF-32の相互変換を行うコンバーター
  std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> converter;

  // (1)
  // 1つのワイド文�からバイト文�列に変換
  {
    char32_t input = U'あ';
    std::string u8result = converter.to_bytes(input);
    assert(!u8result.empty());
  }

  // (2)
  // ワイド文�配列からバイト文�列に変換
  {
    const char32_t input[] = U"あいうえお";
    std::string u8result = converter.to_bytes(input);
    assert(!u8result.empty());
  }

  // (3)
  // ワイド文�列からバイト文�列に変換
  {
    std::u32string input = U"あいうえお";
    std::string u8result = converter.to_bytes(input);
    assert(!u8result.empty());
  }

  // (4)
  // ワイド文�の範囲からバイト文�列に変換
  {
    const char32_t input[] = U"あいうえお";
    std::string u8result = converter.to_bytes(std::begin(input), std::end(input) - 1);
    assert(!u8result.empty());
  }
}
```
* std::codecvt_utf8[link /reference/codecvt/codecvt_utf8.md]
* empty()[link /reference/string/basic_string/empty.md]
* std::begin[link /reference/iterator/begin.md]
* std::end[link /reference/iterator/end.md]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


