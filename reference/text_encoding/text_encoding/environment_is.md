# environment_is
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<id i>
static bool environment_is();
```

## 概要
環境エンコーディングが指定したエンコーディングかどうかを判定する。

この関数は[`environment()`](environment.md)を呼び出して比較するのと同等だが、実装によっては指定されたエンコーディングに関する情報のみをプログラムに取り込むことで、エイリアスデータベース全体を取り込まずに済む最適化が可能である。


## 適格要件
`CHAR_BIT == 8`であること。


## 戻り値
[`environment()`](environment.md) `== i`


## 例
```cpp example
#include <text_encoding>
#include <print>

int main() {
  if (std::text_encoding::environment_is<std::text_encoding::id::UTF8>()) {
    std::println("Environment uses UTF-8");
  } else {
    std::println("Environment does not use UTF-8");
    std::println("Encoding: {}", std::text_encoding::environment().name());
  }
}
```
* name()[link name.md]
* id::UTF8[link id.md]
* environment()[link environment.md]

### 出力例
```
Environment uses UTF-8
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
