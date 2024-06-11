# end
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_parse_context[meta class]
* cpp20[meta cpp]

```cpp
constexpr const_iterator end() const noexcept;
```

## 概要
書式文字列の末尾を指すイテレータを取得する。


## 効果
メンバ変数として保持している、書式文字列の末尾を指すイテレータを返す。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <format>

enum color { red, green, blue };

const char* color_names[] = { "red", "green", "blue" };

template<>
class std::formatter<color> {
  bool enable_quote = false;
public:
  constexpr auto parse(std::format_parse_context& ctx) {
    auto it = ctx.begin();
    if (it == ctx.end()) {
      return it;
    }

    if (*it == '%') {
      enable_quote = true;
      ++it;
    }
    return it;
  }

  auto format(color c, std::format_context& ctx) const {
    if (enable_quote) {
      return std::format_to(ctx.out(), "\"{}\"", color_names[c]);
    }
    else {
      return std::format_to(ctx.out(), "{}", color_names[c]);
    }
  }
};

int main()
{
  std::cout << std::format("{:%}", red) << std::endl;
}
```
* ctx.end()[color ff0000]
* ctx.begin()[link begin.md]
* std::format[link /reference/format/format.md]
* std::format_to[link /reference/format/format_to.md]
* std::format_context[link /reference/format/basic_format_context.md]
* ctx.out()[link /reference/format/basic_format_context/out.md]

#### 出力
```
"red"
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
