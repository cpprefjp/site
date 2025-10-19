# from_stream
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits,
            class Rep, class Period, class Alloc = std::allocator<charT>>
  basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                duration<Rep, Period>& d,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);  // (1) C++20
}
```

## 概要
フォーマット指定して入力ストリームから`duration`オブジェクトに入力する。


## 効果
- パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`d`に代入する
- 有効な日付・時間の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`d`は変更されない
- タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
- タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される


## 戻り値
```cpp
return is;
```


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <sstream>

namespace chrono = std::chrono;

int main()
{
  {
    std::stringstream ss;
    ss << "3";

    chrono::seconds sec{0};
    chrono::from_stream(ss, "%S", sec);

    std::cout << sec << std::endl;
  }
  {
    std::stringstream ss;
    ss << "0+0900 JST";

    chrono::seconds sec{3};
    std::string abbrev;
    chrono::minutes offset{0};
    chrono::from_stream(ss, "%S%z %Z", sec, &abbrev, &offset);

    std::cout << sec << std::endl;
    std::cout << abbrev << std::endl;
    std::cout << chrono::floor<chrono::hours>(offset) << std::endl;
  }
}
```
* chrono::from_stream[color ff0000]
* chrono::floor[link floor.md]

### 出力
```
3s
0s
JST
9h
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`parse()`](/reference/chrono/parse.md) (入力フォーマットの詳細)
