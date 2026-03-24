# locale::encoding
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
text_encoding encoding() const; // (1) C++26
```
* text_encoding[link /reference/text_encoding/text_encoding.md]

## 概要
ロケールに関連付けられたエンコーディングを取得する。


## 適格要件
- `CHAR_BIT == 8`であること


## 戻り値
`*this`に関連付けられた実装定義のエンコーディングスキームを表す[`std::text_encoding`](/reference/text_encoding/text_encoding.md)オブジェクトを返す。


## 例
```cpp example
#include <locale>
#include <text_encoding>
#include <print>

int main() {
  // デフォルト（"C"）ロケールのエンコーディング
  std::locale c_loc;
  std::println("C locale encoding: {}", c_loc.encoding().name());

  // 環境ロケールのエンコーディング
  std::locale env_loc("");
  std::println("Environment locale encoding: {}", env_loc.encoding().name());

  // 環境エンコーディングとの比較
  if (env_loc.encoding() == std::text_encoding::environment()) {
    std::println("Locale encoding matches environment encoding");
  }
}
```

### 出力例
```
C locale encoding: US-ASCII
Environment locale encoding: UTF-8
Locale encoding matches environment encoding
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
