# tuple_size
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::size_t tuple_size(info type);
}
```
* info[link info.md]

## 概要
[`std::tuple`](/reference/tuple/tuple.md)や[`std::pair`](/reference/utility/pair.md)などのtuple-like型の要素数を取得する。[`std::tuple_size`](/reference/tuple/tuple_size.md)に対応する。


## 戻り値
`type`が表す型に対して[`std::tuple_size`](/reference/tuple/tuple_size.md)相当の値を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <tuple>
#include <utility>

int main() {
  static_assert(std::meta::tuple_size(^^std::tuple<int, double, char>) == 3);
  static_assert(std::meta::tuple_size(^^std::pair<int, double>) == 2);
}
```
* std::meta::tuple_size[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`tuple_element`](tuple_element.md)
- [`std::tuple_size`](/reference/tuple/tuple_size.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
