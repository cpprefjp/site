# text_encoding::name
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const char* name() const noexcept;
```

## 概要
エンコーディング名を取得する。


## 戻り値
`name_[0] != '\0'`の場合は`name_`を返す。そうでなければ空文字列へのポインタを返す。

`name()`が空文字列でない場合、返される値はヌル終端バイト文字列（NTBS）である。

- [`string_view`](/reference/string_view/basic_string_view.md)コンストラクタで構築された場合、コンストラクタに渡された名前がそのまま返される
- [`id`](id.md)から構築された場合、実装定義のエイリアス一覧に含まれる名前が返される
- [`literal()`](literal.md)や[`environment()`](environment.md)から返された場合、実装定義の名前が返される


## 備考
- [P2862R1](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2862r1.html)の適用により、この関数は`nullptr`を返さない。[`id::unknown`](id.md)や[`id::other`](id.md)のMIBを持つ`text_encoding`オブジェクトに対しては空文字列を返す。
    - これにより、`std::cout << te.name()`や`std::format()`への直接渡し、`std::string_view`の構築が常に安全に行える。


## 例外
投げない。


## 例
```cpp example
#include <text_encoding>
#include <print>
#include <string_view>

int main() {
  // リテラルエンコーディングの名前
  std::println("Literal: {}", std::text_encoding::literal().name());

  // 環境エンコーディングの名前
  std::println("Environment: {}", std::text_encoding::environment().name());

  // ユーザー構築した場合、渡した名前がそのまま返される
  std::text_encoding enc{"utf-8"};
  std::println("User: {}", enc.name());

  // unknownの場合は空文字列
  std::text_encoding unknown;
  std::println("Unknown: [{}]", unknown.name());
  std::println("Is empty: {}", std::string_view(unknown.name()).empty());
}
```

### 出力例
```
Literal: UTF-8
Environment: UTF-8
User: utf-8
Unknown: []
Is empty: 1
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
- [P2862R1 `text_encoding::name()` should never return null values](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2862r1.html)
