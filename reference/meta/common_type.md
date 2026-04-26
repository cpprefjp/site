# common_type
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval info common_type(R&& type_args);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
複数の型の共通型を求める。[`std::common_type`](/reference/type_traits/common_type.md)に対応する。


## 戻り値
`type_args`の各要素が表す型に対して[`std::common_type`](/reference/type_traits/common_type.md)相当の変換を適用した結果の型のリフレクションを返す。


## 例外
`type_args`の各要素が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int main() {
  static_assert(std::meta::common_type({^^int, ^^double}) == ^^double);
}
```

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
- [`std::common_type`](/reference/type_traits/common_type.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
