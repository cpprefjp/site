# enumerators_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> enumerators_of(info type_enum);
}
```
* info[link info.md]

## 概要
列挙型の列挙子のリフレクションを取得する。


## 戻り値
`type_enum`が列挙型を表す場合、そのすべての列挙子のリフレクションを宣言順に格納した`std::vector`オブジェクトを返す。


## 例外
`r`が列挙型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

enum class Color { red, green, blue };

int main() {
  template for (constexpr auto e : std::define_static_array(std::meta::enumerators_of(^^Color))) {
    std::println("{}", std::meta::identifier_of(e));
  }
}
```

### 出力
```
red
green
blue
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
