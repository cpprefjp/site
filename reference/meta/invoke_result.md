# invoke_result
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval info invoke_result(info type, R&& type_args);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
呼び出し可能な型の呼び出し結果型を求める。[`std::invoke_result`](/reference/type_traits/invoke_result.md)に対応する。


## 戻り値
`type`が呼び出し可能型を表し、`type_args`が引数型のリフレクションを表す場合、[`std::invoke_result`](/reference/type_traits/invoke_result.md)相当の結果型のリフレクションを返す。


## 例外
`type`または`type_args`の各要素が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <functional>

int f(double);

int main() {
  static_assert(std::meta::invoke_result(^^decltype(f), {^^double}) == ^^int);
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
- [`std::invoke_result`](/reference/type_traits/invoke_result.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
