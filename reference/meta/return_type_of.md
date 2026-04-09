# return_type_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info return_type_of(info r);
}
```
* info[link info.md]

## 概要
関数または関数型の戻り値型のリフレクションを取得する。


## 戻り値
`r`が関数または関数型を表す場合、その戻り値型のリフレクションを返す。


## 例外
`r`が関数または関数型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int f();
double g();

int main() {
  static_assert(std::meta::return_type_of(^^f) == ^^int);
  static_assert(std::meta::return_type_of(^^g) == ^^double);
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
- [`parameters_of`](parameters_of.md)
- [`type_of`](type_of.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
