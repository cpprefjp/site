#to_bytes (C++11)
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]

```cpp
byte_string to_bytes(Elem wchar);              // (1)
byte_string to_bytes(const Elem* wptr);        // (2)
byte_string to_bytes(const wide_string& wstr); // (3)
byte_string to_bytes(const Elem* first,
                     const Elem* last);        // (4)
```

##概要
ワイド文字列からバイト文字列に変換する。


##効果
変換前に、[`state()`](./state.md.nolink)メンバ関数が返す状態値が、コンストラクタで明示的に指定されていなかった場合、デフォルト値を設定する。

- (1) : 1つの歪度文字を、バイト文字列に変換する。
- (2) : ワイド文字配列を、バイト文字列に変換する。
- (3) : ワイド文字列を、バイト文字列に変換する。
- (4) : ワイド文字の範囲`[first, last)`を、バイト文字列に変換する。

変換に成功した場合、成功した要素数が、[`converted()`](./converted.md)メンバ関数が返す変数に設定される。



##戻り値
変換結果のバイト文字列を返す。

変換に失敗し、コンストラクタで`byte_err`パラメータ(エラー時に返す文字列)が設定された場合、そのパラメータを返す。


##例外
変換に失敗し、コンストラクタで`byte_err`パラメータ(エラー時に返す文字列)が設定されていなかった場合、[`std::range_error`](/reference/stdexcept.md)例外を送出する。


##例
```cpp
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
  // 1つのワイド文字からバイト文字列に変換
  {
    char32_t input = U'あ';
    std::string u8result = converter.to_bytes(input);
    assert(!u8result.empty());
  }
    
  // (2)
  // ワイド文字配列からバイト文字列に変換
  {
    const char32_t input[] = U"あいうえお";
    std::string u8result = converter.to_bytes(input);
    assert(!u8result.empty());
  }
    
  // (3)
  // ワイド文字列からバイト文字列に変換
  {
    std::u32string input = U"あいうえお";
    std::string u8result = converter.to_bytes(input);
    assert(!u8result.empty());
  }
    
  // (4)
  // ワイド文字の範囲からバイト文字列に変換
  {
    const char32_t input[] = U"あいうえお";
    std::string u8result = converter.to_bytes(std::begin(input), std::end(input) - 1);
    assert(!u8result.empty());
  }
}
```
* std::codecvt_utf8[link /reference/codecvt/codecvt_utf8.md]
* std::string[link /reference/string/basic_string.md]
* std::u32string[link /reference/string/basic_string.md]
* assert[link /reference/cassert/assert.md.nolink]
* empty()[link /reference/string/basic_string/empty.md]
* std::begin[link /reference/iterator/begin.md]
* std::end[link /reference/iterator/end.md]

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC, C++11 mode](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0


