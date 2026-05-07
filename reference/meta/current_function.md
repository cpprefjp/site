# current_function
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info current_function();
}
```
* info[link info.md]

## 概要
`current_function()`を呼び出した時点で囲んでいる関数のリフレクションを返す。


## 戻り値
呼び出し位置を囲んでいる関数のリフレクションを返す。


## 例外
関数スコープ内で呼ばれていない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

void my_function() {
  constexpr auto fn = std::meta::current_function();
  std::println("関数名: {}", std::meta::identifier_of(fn));
}

int main() {
  my_function();
}
```
* std::meta::current_function[color ff0000]
* std::meta::identifier_of[link identifier_of.md]

#### 出力例
```
関数名: my_function
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`current_class`](current_class.md)
- [`current_namespace`](current_namespace.md)


## 参照
- [P3795R2 Miscellaneous Reflection Cleanup](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3795r2.html)
