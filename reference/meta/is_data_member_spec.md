# is_data_member_spec
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_data_member_spec(info r);
}
```
* info[link info.md]

## 概要
[`data_member_spec()`](data_member_spec.md)によって作成されたデータメンバの仕様であるかを判定する。


## 戻り値
`r`が[`data_member_spec()`](data_member_spec.md)によって作成されたデータメンバの仕様を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S;

consteval {
  std::meta::define_aggregate(^^S, {
    std::meta::data_member_spec(^^int, {.name = "x"}),
    std::meta::data_member_spec(^^double, {.name = "y"})
  });
}

int main() {
  S s{1, 2.0};
  static_assert(std::meta::is_data_member_spec(
    std::meta::data_member_spec(^^int, {.name = "z"})));
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


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
