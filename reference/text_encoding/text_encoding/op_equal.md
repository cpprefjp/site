# text_encoding::operator==
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr bool operator==(const text_encoding& a,
                                 const text_encoding& b) noexcept; // (1) C++26
friend constexpr bool operator==(const text_encoding& encoding,
                                 id i) noexcept;                   // (2) C++26
```

## 概要
`text_encoding`オブジェクト同士、または`text_encoding`オブジェクトと[`id`](id.md)列挙値の等値比較を行う。

- (1) : 2つの`text_encoding`オブジェクトが同じエンコーディングを表すかを判定する
- (2) : `text_encoding`オブジェクトが指定したMIB値に対応するエンコーディングかを判定する


## 戻り値
- (1) : `a.mib_ == id::other && b.mib_ == id::other`が`true`の場合、[`comp-name`](comp-name.md)`(a.name_, b.name_)`を返す。そうでなければ`a.mib_ == b.mib_`を返す
- (2) : `encoding.mib_ == i`を返す


## 備考
- (1) : IANA登録済みエンコーディングはMIB値で比較される。未登録エンコーディング（[`id::other`](id.md)）は名前で比較される
- (2) : `i != id::other`の場合に限り、引数に対する同値関係を導く。`id::other`との比較は同値関係にならない（`a == id::other && b == id::other`であっても`a == b`とは限らない）


## 例
```cpp example
#include <text_encoding>
#include <cassert>

int main() {
  // MIBによる比較
  std::text_encoding utf8_a{"utf-8"};
  std::text_encoding utf8_b{"UTF8"};
  assert(utf8_a == utf8_b); // 同じMIBを持つ

  // id列挙値との比較
  assert(utf8_a == std::text_encoding::id::UTF8);

  // 未登録エンコーディングは名前で比較
  std::text_encoding wtf8_a{"WTF-8"};
  std::text_encoding wtf8_b{"wtf8"};
  assert(wtf8_a == wtf8_b); // comp-nameで比較

  // 異なる未登録エンコーディング
  std::text_encoding other_a{"WTF-8"};
  std::text_encoding other_b{"Some-Other"};
  assert(other_a != other_b);
}
```

### 出力
```
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
