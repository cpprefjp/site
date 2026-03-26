# text_encoding::mib
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr id mib() const noexcept;
```

## 概要
エンコーディングのMIB（Management Information Base）列挙値を取得する。


## 戻り値
`mib_`を返す。


## 例外
投げない。


## 例
```cpp example
#include <text_encoding>
#include <print>

int main() {
  auto enc = std::text_encoding::literal();
  std::println("MIB: {}", static_cast<int>(enc.mib()));

  if (enc.mib() == std::text_encoding::id::UTF8) {
    std::println("Literal encoding is UTF-8");
  }
}
```
* std::text_encoding::literal()[link literal.md]

### 出力例
```
MIB: 106
Literal encoding is UTF-8
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1885R12 Naming Text Encodings to Demystify Them](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1885r12.pdf)
