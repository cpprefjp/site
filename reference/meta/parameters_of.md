# parameters_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> parameters_of(info r);
}
```
* info[link info.md]

## 概要
関数の仮引数のリフレクションを取得する。


## 戻り値
`r`が関数を表す場合、その仮引数のリフレクションを宣言順に格納した`std::vector`オブジェクトを返す。`r`が関数型を表す場合、パラメータ型リスト中の型のリフレクションを返す。


## 例外
`r`が関数または関数型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

void process(int id, double value, const char* name) {}

int main() {
  template for (constexpr auto p : std::meta::parameters_of(^^process)) {
    std::println("{}: {}",
      std::meta::identifier_of(p),
      std::meta::display_string_of(std::meta::type_of(p)));
  }
}
```
* std::meta::identifier_of[link identifier_of.md]
* std::meta::type_of[link type_of.md]
* std::meta::display_string_of[link display_string_of.md]

### 出力
```
id: int
value: double
name: const char*
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`return_type_of`](return_type_of.md)
- [`variable_of`](variable_of.md)
- [`has_default_argument`](has_default_argument.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
