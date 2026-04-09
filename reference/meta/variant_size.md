# variant_size
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::size_t variant_size(info type);
}
```
* info[link info.md]

## 概要
[`std::variant`](/reference/variant/variant.md)の候補型の数を取得する。[`std::variant_size`](/reference/variant/variant_size.md)に対応する。


## 戻り値
`type`が表す型に対して[`std::variant_size`](/reference/variant/variant_size.md)相当の値を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <variant>

int main() {
  static_assert(std::meta::variant_size(^^std::variant<int, double, char>) == 3);
}
```
* std::meta::variant_size[color ff0000]

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
- [`variant_alternative`](variant_alternative.md)
- [`std::variant_size`](/reference/variant/variant_size.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
