# float128_t
* stdfloat[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
#if defined(__STDCPP_FLOAT128_T__)
  using float128_t = implementation-defined;
#endif
}
```

## 概要
128ビット四倍精度の浮動小数点数型。

### 内部表現
この型は、ISO/IEC/IEEE 60559 (IEEE 754) 浮動小数点数規格のbinary128フォーマットをもつ。

| 符号ビット数 | 指数ビット数 | 仮数ビット数 | 最大指数 |
|--------------|--------------|--------------|----------|
| 1            | 15           | 112          | 16383    |

### リテラル
値にサフィックスとして`f128`もしくは`F128`を指定することで、`std::float128_t`のリテラルとすることができる。

```cpp
std::float128_t a = 1.0f128;
std::float128_t b = 2.0F128;
```


### 事前定義マクロ
- この型は、事前定義マクロ`__STDCPP_FLOAT128_T__`が定義されない場合、定義されない
    - ISO/IEC/IEEE 60559 (IEEE 754) のbinary128フォーマットが実装される環境でこのマクロは定義される


### 順位
浮動小数点数の変換で使用される順位 (rank) は、以下のように定義される：

- `long double` > `double` > `float`のように、`long double`が最も高い順位をもつ
- 同じ値集合をもつ2つの拡張浮動小数点数型は、同じ順位をもつ
- 標準浮動小数点数型と同じ値集合をもつ拡張浮動小数点数型は、同じ順位をもつ
- 標準浮動小数点数型より多くの値集合をもつ拡張浮動小数点数型は、`double`と同じ順位をもつ

注意として、浮動小数点数型`T1`の値集合が浮動小数点数型`T2`の値集合の部分集合でも上位集合でもない場合、浮動小数点数型`T1`と`T2`の変換順位は順位通りではない。これは、一方の型が他方より大きな範囲と低い精度の両方を持つ場合に起こり得る。

順位が同じ浮動小数点数型は、サブ順位 (subrank) で順序付けられる。拡張浮動小数点数は、標準浮動小数点数型よりも大きなサブ順位をもつ。


### 昇格と変換
C言語の名残と後方互換性のために、オーバーロード解決での`float`から`double`への変換は昇格と見なされるが、ほかの浮動小数点数型では昇格はない。

2つの浮動小数点型の少なくとも一方が拡張浮動小数点型である場合、変換先の型が変換元の型より大きいか等しい場合にのみ、2つの浮動小数点型間の変換が暗黙的に行われる。いかなる暗黙の変換も損失なく、値を正確に保持する。潜在的に損失のある変換はすべて明示的でなければならない。

小さい精度への変換は、`()`と`{}`による直接初期化、もしくは明示的なキャストのみ許可される。

```cpp
void f(std::float16_t);
void g() {
  std::float16_t a = 1.0; // エラー！小さい精度への暗黙変換はできない
  std::float16_t b(2.0);  // OK : 直接初期化
  std::float16_t c{3.0};  // OK : 直接初期化
  a = 4.0;                // エラー！小さい精度への暗黙変換はできない
  f(5.0);                 // エラー！小さい精度への暗黙変換はできない
  f(static_cast<std::float16_t>(5.0)); // OK : 明示的なキャスト
}
```


### 通常の算術変換
算術演算での型変換は、以下のような規則で行われる。

- どちらかのオペランドが浮動小数点数型である場合、
    - 両方のオペランドが同じ型であれば、型変換は行われない
    - そうでなく、オペランドの一方が浮動小数点数型でなければ、浮動小数点数型のオペランドの型に変換される
    - そうでなく、オペランドの浮動小数点数型の変換順位が等しくない場合、小さい方の順位をもつ浮動小数点数型は、もう一方の浮動小数点数型に変換される
        - `float + double`は`double`に、`std::float16_t + float`は`float`に変換される
    - そうでなく、変換順位が等しい場合、サブ順位で比較が行われ、より大きいサブ順位をもつ浮動小数点数型に変換される
        - `float + std::float32_t`は`std::float32_t`に変換される
    - そうでなければ、式は不適格となる
        - `std::float16_t + std::bfloat16_t`は不適格

```cpp example
#include <stdfloat>
#include <type_traits>

int main() {
  float f32 = 1.0;
  std::float16_t f16{2.0};
  std::bfloat16_t b16{3.0};
  std::float32_t f32b{4.0};

  auto r1 = f32 + f16; // OK : f16は`float`に変換され、結果の型は`float`となる
  auto r2 = f32 + b16; // OK : b16は`float`に変換され、結果の型は`float`となる
  //auto r3 = f16 + b16; // エラー！どちらの型も算術変換でもう一方の型に変換できない
  auto r4 = f32 + f32b;  // OK : f32はより大きいサブ順位をもつ`std::float32_t`に変換される
  static_assert(std::is_same_v<decltype(r4), std::float32_t>);
}
```

### オーバーロード解決
- 浮動小数点数型の変換をともなうオーバーロード解決は、値を維持する変換が優先され、同じ変換順位をもつ他の浮動小数点数型への変換が優先して行われる
    - 値を維持する変換が曖昧な場合、プログラムは不適格となる
        - 「ひとつ上の順位をもつ浮動小数点数型に変換する」のような規則ではないため、ひとつ以上上の順位をもつ浮動小数点数型の候補が複数あると曖昧になる

```cpp
#include <stdfloat>

void f(std::float32_t) {}
void f(std::float64_t) {}
void f(long long) {}

int main() {
  float x;
  std::float16_t y;
  f(x); // f(std::float32_t)が呼び出される。
        // floatとstd::float32_tが同じ変換順位をもつ
  //f(y); // エラー！曖昧。変換順位が等しいオーバーロードが見つからない
}
```



## 備考
- この型は、C23で定義されるオプションキーワード`_Float128`の別名として定義されることになるだろう
    - この型は、`_Float128`と相互運用できるよう実装されることが望ましい
- この型が定義される環境はISO/IEC/IEEE 60559 (IEEE 754) 準拠であるため、同じ変換順位をもつ浮動小数点数型 (`float`と`std::float32_t`のような) は同じ内部表現をもつ


## 例
```cpp example
#include <iostream>
#include <stdfloat>
#include <cmath>

int main() {
  std::float16_t a = 1.0f16;
  auto b = 2.0f32; // bの型はstd::float32_t

  // aはより大きい精度の型float32_tに変換される
  auto c = a + b; // cの型はstd::float32_t

  // 精度を落とす縮小変換は明示的型変換で行う。
  // 拡張浮動小数点数型は数学関数にも渡すことができ、
  // 標準浮動小数点数型への暗黙変換もできる
  double d = std::log(static_cast<std::float16_t>(c));

  // 同じ精度の浮動小数点数型との間で、精度を落とさず変換でき、
  // coutでも拡張浮動小数点数のまま出力できる
  std::cout << static_cast<std::float64_t>(d) << std::endl;
}
```
* std::log[link /reference/cmath/log.md]

### 出力
```
1.09863
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::float16_t`](float16_t.md)
- [`std::float32_t`](float32_t.md)
- [`std::float64_t`](float64_t.md)
- [`std::bfloat16_t`](bfloat16_t.md)
- [`std::numeric_limits<T>::is_iec559`](/reference/limits/numeric_limits/is_iec559.md)
- [`std::basic_ostream::operator<<`](/reference/ostream/basic_ostream/op_ostream.md)
- [`std::basic_istream::operator>>`](/reference/istream/basic_istream/op_istream.md)


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)

