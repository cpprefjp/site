# is_string_literal
* meta[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  consteval bool is_string_literal(const char* p);      // (1) C++26
  consteval bool is_string_literal(const wchar_t* p);   // (2) C++26
  consteval bool is_string_literal(const char8_t* p);   // (3) C++26
  consteval bool is_string_literal(const char16_t* p);  // (4) C++26
  consteval bool is_string_literal(const char32_t* p);  // (5) C++26
}
```

## 概要
ポインタが文字列リテラル（またはそのサブオブジェクト）を指しているかどうかを判定する。

主に[`reflect_constant_string()`](reflect_constant_string.md)の内部実装で使用される。`reflect_constant_string()`は入力が既にヌル終端された文字列リテラルであればヌル終端文字を追加せず、そうでなければ追加する必要があるため、この関数で文字列リテラルかどうかを判定する。

ユーザーが直接使用する場合は、`const char*`の出自をコンパイル時に検査して、文字列リテラルに由来するポインタとそうでないポインタを区別する用途が考えられる。

- (1) : 通常の文字列リテラル（`"hello"`）を判定する
- (2) : ワイド文字列リテラル（`L"hello"`）を判定する
- (3) : UTF-8文字列リテラル（`u8"hello"`）を判定する
- (4) : UTF-16文字列リテラル（`u"hello"`）を判定する
- (5) : UTF-32文字列リテラル（`U"hello"`）を判定する


## 戻り値
`p`が文字列リテラルまたはそのサブオブジェクトを指している場合に`true`を返す。そうでなければ`false`を返す。


## 備考
この関数は`std`名前空間に定義される（`std::meta`名前空間ではない）。


## 例
```cpp example
#include <meta>
#include <print>

// 文字列リテラルならそのまま使い、そうでなければコピーして使う
consteval const char* ensure_static(const char* p) {
  if (std::is_string_literal(p)) {
    return p;  // 文字列リテラルは静的ストレージに既に存在する
  }
  return std::define_static_string(std::string_view(p));
}

int main() {
  // 文字列リテラル
  constexpr auto s1 = ensure_static("hello");
  std::println("{}", s1);

  // 文字列リテラルの部分文字列（サブオブジェクト）
  static_assert(std::is_string_literal("hello" + 2));  // "llo"を指す
}
```
* std::is_string_literal[color ff0000]

### 出力
```
hello
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_string`](define_static_string.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
