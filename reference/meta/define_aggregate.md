# define_aggregate
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval info define_aggregate(info type_class, R&& members);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
不完全なクラス型を、指定されたデータメンバを持つ集成体として定義する。


## 戻り値
不完全なクラス型`type_class`を、`members`で指定されたデータメンバを持つ集成体として定義し、完全型となったクラスのリフレクションを返す。


## 備考
`type_class`は不完全なクラス型を表すリフレクションでなければならない。`members`の各要素は[`is_data_member_spec()`](is_data_member_spec.md)が`true`を返すリフレクションでなければならない。


## 例
```cpp example
#include <meta>
#include <print>

struct MyStruct;

consteval {
  std::meta::define_aggregate(^^MyStruct, {
    std::meta::data_member_spec(^^int, {.name = "id"}),
    std::meta::data_member_spec(^^double, {.name = "value"})
  });
}

int main() {
  MyStruct s{42, 3.14};
  std::println("id={}, value={}", s.id, s.value);
}
```

### 出力
```
id=42, value=3.14
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`data_member_spec`](data_member_spec.md)
- [`data_member_options`](data_member_options.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
