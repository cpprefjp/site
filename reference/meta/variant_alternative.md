# variant_alternative
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info variant_alternative(std::size_t index, info type);
}
```
* info[link info.md]

## 概要
[`std::variant`](/reference/variant/variant.md)の指定位置の候補型を取得する。[`std::variant_alternative`](/reference/variant/variant_alternative.md)に対応する。


## 戻り値
`type`が表す型の`index`番目の候補型のリフレクションを返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <variant>

int main() {
  using V = std::variant<int, double, char>;
  static_assert(std::meta::variant_alternative(0, ^^V) == ^^int);
  static_assert(std::meta::variant_alternative(1, ^^V) == ^^double);
  static_assert(std::meta::variant_alternative(2, ^^V) == ^^char);
}
```
* std::meta::variant_alternative[color ff0000]

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
- [`variant_size`](variant_size.md)
- [`std::variant_alternative`](/reference/variant/variant_alternative.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
