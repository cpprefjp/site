# tuple_element
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info tuple_element(size_t index, info type);
}
```
* info[link info.md]

## 概要
[`std::tuple`](/reference/tuple/tuple.md)や[`std::pair`](/reference/utility/pair.md)などのtuple-like型の指定位置の要素型を取得する。[`std::tuple_element`](/reference/tuple/tuple_element.md)に対応する。


## 戻り値
`type`が表す型の`index`番目の要素型のリフレクションを返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <tuple>

int main() {
  using T = std::tuple<int, double, char>;
  static_assert(std::meta::tuple_element(0, ^^T) == ^^int);
  static_assert(std::meta::tuple_element(1, ^^T) == ^^double);
  static_assert(std::meta::tuple_element(2, ^^T) == ^^char);
}
```
* std::meta::tuple_element[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`tuple_size`](tuple_size.md)
- [`std::tuple_element`](/reference/tuple/tuple_element.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
