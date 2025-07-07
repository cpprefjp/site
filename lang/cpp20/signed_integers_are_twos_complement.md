# 符号付き整数型が2の補数表現であることを規定 [P1236R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20では、符号付き整数型のビット表現を「2の補数 (Two's Complement)」に規定する。

これによって、2の補数を前提としたビット演算ができるようになる。また、2の補数には値`-0`を表すビット値が存在しないため、「ビット値が異なる値`0`と値`-0`を等値であるとする」ということが起こらなくなる (1の補数や絶対値表現には`-0`を表すビット値がある)。これにより、符号付き整数型に対するハッシュ値が一意に定まり、全順序の要件を満たすようになる (`-0 < 0`が成り立たなかったが、`-0`がなくなった)。

値`-0`は、`0`を意味する。

符号付き整数型に対する左シフト`<<`は[論理シフト(Logical shift)](https://en.wikipedia.org/wiki/Logical_shift)となる。対応する符号無し整数型における左シフト演算とビット表現が等しい結果が得られる。

符号付き整数型に対する右シフト`>>`は[算術シフト(Arithmetic shift)](https://en.wikipedia.org/wiki/Arithmetic_shift)となる。右シフトでは「符号拡張 (sign extension)」が行われ、符号ビットが右に伝播する。

ただし、符号付き整数型に対する算術演算におけるオーバーフロー時の動作は、これまでと変わらず未定義動作である。[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<符号付き整数型>::`[`is_modulo`](/reference/limits/numeric_limits/is_modulo.md)はデフォルトで`false`のままとなる。


## 備考
- 2の補数表現としては、正数を加算し続けていくと負数になることは規定できる。しかしこの動作はバグの元であることと、コンパイラは加算を続けても正数であることを期待して積極的に最適化を行うために、標準C++としてはオーバーフローは未定義動作のままである
    - オーバーフローして符号反転することを想定したプログラムを記述する場合は、[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<符号付き整数型>::`[`is_modulo`](/reference/limits/numeric_limits/is_modulo.md)が`true`であることを確認するか、コンパイラごとに符号付き整数型の最適化を切るオプションを設定するのがよいだろう


## 例
### ビット値・ビット演算の例
```cpp example
#include <cassert>
#include <cstdint>

int main()
{
  // 符号反転したビット値
  {
    std::int8_t x = 11;
    assert(x == 0b0000'1011);

    std::int8_t y = -x;
    assert(y == (~x + 1)); // 負数は、ビット反転して+1した値
    assert(y == static_cast<std::int8_t>(0b1111'0101));
  }
  // 0と-0は同じビット値
  {
    std::int8_t x = 0;
    std::int8_t y = -0;

    assert(x == static_cast<std::int8_t>(0b0000'0000));
    assert(y == static_cast<std::int8_t>(0b0000'0000));
  }
  // 論理左シフト演算
  {
    std::int8_t x = 64;
    assert(x == static_cast<std::int8_t>(0b0100'0000));

    x <<= 1;

    assert(x == static_cast<std::int8_t>(-128));
    assert(x == static_cast<std::int8_t>(0b1000'0000));
  }
  // 算術右シフト演算
  {
    std::int8_t x = -124;
    assert(x == static_cast<std::int8_t>(0b1000'0100));

    x >>= 2;

    assert(x == static_cast<std::int8_t>(-31));
    assert(x == static_cast<std::int8_t>(0b1110'0001));
  }
}
```

#### 出力
```
```

### 符号付き整数型は一意なオブジェクト表現をもつ
```cpp example
#include <type_traits>
#include <cstdint>

int main()
{
  static_assert(std::has_unique_object_representations<char>::value);
  static_assert(std::has_unique_object_representations<short>::value);
  static_assert(std::has_unique_object_representations<int>::value);
  static_assert(std::has_unique_object_representations<long>::value);
  static_assert(std::has_unique_object_representations<long long>::value);

  static_assert(std::has_unique_object_representations<std::int8_t>::value);
  static_assert(std::has_unique_object_representations<std::int16_t>::value);
  static_assert(std::has_unique_object_representations<std::int32_t>::value);
  static_assert(std::has_unique_object_representations<std::int64_t>::value);
}
```
* std::has_unique_object_representations[link /reference/type_traits/has_unique_object_representations.md]

#### 出力
```
```

### 三方比較演算子の例
```cpp example
#include <type_traits>
#include <compare>

int main()
{
  int a = 1;
  int b = 2;

  // 符号付き整数型は全順序をもつ
  auto r = a <=> b;
  static_assert(std::is_same_v<decltype(r), std::strong_ordering>);
}
```
* std::strong_ordering[link /reference/compare/strong_ordering.md]

#### 出力
```
```


## この機能が必要になった背景・経緯
Visual Studio、GCC、Clangといった主要な処理系が、2の補数以外をサポートしていなかった。

C11規格は、2の補数のほかに、1の補数表現 (Ones' complement) と符号ビット付き絶対値表現 (Signed magnitude) を許可しているが、C++では本文書の概要にも記載したように、ハッシュ値の一意性と全順序をサポートするため、2の補数に規定する。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`std::has_unique_object_representations`](/reference/type_traits/has_unique_object_representations.md)


## 参照
- [P1236R1: Alternative Wording for P0907R4 Signed Integers are Two's Complement](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1236r1.html)
    - C++20に採択された提案文書
- [P0907R4 Signed Integers are Two's Complement](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0907r4.html)
    - 元になった提案文書
- [符号付き整数型の負数表現を 2 の補数と規定 (P1236R1) - cppmap](https://cppmap.github.io/standardization/cpp20/#2-p1236r1)
- [2の補数表現における演算](http://www.cc.kyoto-su.ac.jp/~kbys/kiso/number/int-op.html)