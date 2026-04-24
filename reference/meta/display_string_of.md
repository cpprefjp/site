# display_string_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* u8display_string_of[meta alias]

```cpp
namespace std::meta {
  consteval string_view display_string_of(info r);
  consteval u8string_view u8display_string_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションの表示用文字列を取得する。


## 戻り値
`r`の人間可読な表示文字列を返す。結果は実装定義である。


## 例
```cpp example
#include <meta>
#include <print>

int main() {
  std::println("{}", std::meta::display_string_of(^^int));
  std::println("{}", std::meta::display_string_of(^^std::vector));
}
```

#### 出力例
```
int
vector
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
