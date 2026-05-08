# current_namespace
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info current_namespace();
}
```
* info[link info.md]

## 概要
`current_namespace()`を呼び出した時点で囲んでいる名前空間のリフレクションを返す。


## 戻り値
呼び出し位置を囲んでいる名前空間のリフレクションを返す。名前空間スコープ外から呼ばれた場合は、もっとも近い囲んでいる名前空間（最終的にはグローバル名前空間）のリフレクションを返す。


## 例
```cpp example
#include <meta>
#include <print>

namespace my_ns {
  void info_in_ns() {
    constexpr auto ns = std::meta::current_namespace();
    std::println("my_ns内: {}", std::meta::display_string_of(ns));
  }
}

void info_global() {
  constexpr auto ns = std::meta::current_namespace();
  std::println("グローバル: {}", std::meta::display_string_of(ns));
  // グローバル名前空間のリフレクションは ^^:: と等しい
  static_assert(ns == ^^::);
}

int main() {
  my_ns::info_in_ns();
  info_global();
}
```
* std::meta::current_namespace[color ff0000]
* std::meta::display_string_of[link display_string_of.md]

#### 出力例
```
my_ns内: my_ns
グローバル: ::
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`current_function`](current_function.md)
- [`current_class`](current_class.md)


## 参照
- [P3795R2 Miscellaneous Reflection Cleanup](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3795r2.html)
