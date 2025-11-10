# subview
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_string_view<charT, traits>
  subview(size_type pos = 0,
          size_type n = npos) const;
```

## 概要
部分文字列の[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を構築する。
`pos`番目から`n`要素の[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を返す。
引数省略時は、先頭位置（`0`番目）から全要素（`npos`）の文字列を返す。


## 要件
`pos <=` [`size()`](size.md)


## 効果
次と等価 : `return` [`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>(*this).`[`subview`](/reference/string_view/basic_string_view/subview.md)`(pos, n)`。


## 注意
本関数は使い方を誤ると、ぶら下がり参照が発生し得る。
```cpp example
#include <print>
#include <string>
#include <string_view>

int main() {
    // OK
    std::string s(3, 'A');
    std::string_view sv = s.subview();
    std::println("{}", sv);

    // OK
    std::println("{}", std::string(3, 'A').subview());

    // NG!
    std::string_view d = std::string(3, 'A').subview();  // ぶら下がり参照発生
    std::println("{}", d);  // 不定動作
}
```


## 例
```cpp example
#include <iostream>
#include <string>
#include <string_view>

int main() {
    std::string s = "Hello world!";

    std::string_view sv = s.subview(6, 5);

    std::cout << sv;
}
```
* subview[color ff0000]

### 出力
```
world
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照

- [P3044R2 sub-string_view from string](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3044r2.pdf)


## 関連項目
- [`basic_string_view::subview`](/reference/string_view/basic_string_view/subview.md)
