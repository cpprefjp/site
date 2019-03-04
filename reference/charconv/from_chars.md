# from_chars
* charconv[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class Tuple>
  constexpr T make_from_tuple(Tuple&& t);
}
```

## 概要

## 要件

## 引数
- `t` -- tuple-likeな型`Tuple`のオブジェクト

## 戻り値

## 例外
投げない。

## 備考

## 例

```cpp example
#include <tuple>
#include <array>
#include <iostream>

int main()
{
}
```
* std::make_from_tuple[color ff0000]
* std::make_tuple[link ../tuple/make_tuple.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7, update 9(full suport)


## 関連項目
- [`chars_format`](../charconv/chars_format.md)
- [`from_chars_result`](../charconv/from_chars_result.md)
- [`to_chars`](../charconv/to_chars.md)

## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)