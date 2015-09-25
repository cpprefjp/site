#from_bytes
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
wide_string from_bytes(char byte);              // (1)
wide_string from_bytes(const char* ptr);        // (2)
wide_string from_bytes(const byte_string& str); // (3)
wide_string from_bytes(const char* first,
                       const char* last);       // (4)
```

##概要
バイト文字列からワイド文字列に変換する。


##効果
変換前に、[`state()`](./state.md)メンバ関数が返す状態値が、コンストラクタで明示的に指定されていなかった場合、デフォルト値を設定する。

- (1) : 1バイトからなる文字を、ワイド文字列に変換する。
- (2) : バイト文字配列を、ワイド文字列に変換する。
- (3) : バイト文字列を、ワイド文字列に変換する。
- (4) : バイト文字の範囲`[first, last)`を、ワイド文字列に変換する。

変換に成功した場合、成功した要素数が、[`converted()`](./converted.md)メンバ関数が返す変数に設定される。



##戻り値
変換結果のワイド文字列を返す。

変換に失敗し、コンストラクタで`wide_err`パラメータ(エラー時に返す文字列)が設定された場合、そのパラメータを返す。


##例外
変換に失敗し、コンストラクタで`wide_err`パラメータ(エラー時に返す文字列)が設定されていなかった場合、[`std::range_error`](/reference/stdexcept.md)例外を送出する。


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
  // 1バイト文字からワイド文字列に変換
  {
    char input = 'a';
    std::u32string result = converter.from_bytes(input);
    assert(result.size() == 1);
  }
    
  // (2)
  // バイト文字配列からワイド文字列に変換
  {
    const char input[] = u8"あいうえお";
    std::u32string result = converter.from_bytes(input);
    assert(result.size() == 5);
  }
    
  // (3)
  // バイト文字列からワイド文字列に変換
  {
    std::string input = u8"あいうえお";
    std::u32string result = converter.from_bytes(input);
    assert(result.size() == 5);
  }
    
  // (4)
  // バイト文字の範囲からワイド文字列に変換
  {
    const char input[] = u8"あいうえお";
    std::u32string result = converter.from_bytes(std::begin(input), std::end(input) - 1);
    assert(result.size() == 5);
  }
}
```
* std::codecvt_utf8[link /reference/codecvt/codecvt_utf8.md]
* std::string[link /reference/string/basic_string.md]
* std::u32string[link /reference/string/basic_string.md]
* assert[link /reference/cassert/assert.md.nolink]
* size()[link /reference/string/basic_string/size.md]
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


