# generate_canonical
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class RealType, std::size_t bits, class URBG>
  RealType generate_canonical(URBG& g);  // (1) C++11

  template<class RealType, std::size_t digits, class URBG>
  RealType generate_canonical(URBG& g);  // (1) C++26
}
```

## 概要
実数区間\[0.0, 1.0\)に展開（事実上正規化）された一様分布乱数を得るための関数テンプレート。
テンプレート引数に与える `RealType` 型について、 `bits` だけの分解能を持つ仮数部を `URBG g`を必要な回数だけ繰り返し呼び出して生成する。


## テンプレートパラメータ
- `class RealType` : 生成する実数の型。
- `size_t bits` : 生成する実数における仮数部への分解能の最低要求。最大値は `std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`digits`](/reference/limits/numeric_limits/digits.md)
    - C++26で`digits`に名称変更
- `size_t digits` : 生成する実数における基数非依存の桁数としての分解能の最低要求。最大値は `std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`digits`](/reference/limits/numeric_limits/digits.md) 。
- `class URBG` : 一様乱数生成器の型。

## 関数パラメータ
- URBG& g : 一様乱数生成器。


## 効果
- C++11からC++23まで :
    以下の変数を定義する。
    - `R` = `g.`[`max()`](/reference/random/uniform_random_bit_generator.md) `-` `g.`[`min()`](/reference/random/uniform_random_bit_generator.md) `+ 1`
    - `k` = max(1, ⌈`bits` / log<sub>2</sub>`R`⌉)
    - `S` = `g()` から `k` 回呼び出した結果を `R` のべき乗で重み付けして累積した値

    戻り値は `S` / `R`<sup>`k`</sup> となる。ただし浮動小数点数の丸めにより、結果が1.0になる場合がある。

- C++26 :
    以下の変数を定義する。
    - `r` = [`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`radix`](/reference/limits/numeric_limits/radix.md)
    - `R` = `g.`[`max()`](/reference/random/uniform_random_bit_generator.md) `-` `g.`[`min()`](/reference/random/uniform_random_bit_generator.md) `+ 1`
    - `d` = min(`digits`, [`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`digits`](/reference/limits/numeric_limits/digits.md))
    - `k` = `R`<sup>`k`</sup> ≥ `r`<sup>`d`</sup> を満たす最小の整数
    - `x` = ⌊`R`<sup>`k`</sup> / `r`<sup>`d`</sup>⌋

    以下の手順で乱数を生成する。

    1. `g()` を `k` 回呼び出して値 `S` を生成する
    2. `S` ≥ `x` · `r`<sup>`d`</sup> の場合、手順1に戻って再試行する（棄却法）
    3. 戻り値は ⌊`S` / `x`⌋ / `r`<sup>`d`</sup> となる

    この棄却法により、浮動小数点数の丸めで結果が1.0になる問題が解消され、戻り値は必ず0以上1未満となることが保証される。


## 例外
`URBG g` が例外を送出する場合はそれに準ずる。


## 備考
- C++23まではアルゴリズムの仕様上、浮動小数点数の丸めにより値`1.0`が生成されることがあった
- C++26では棄却法（reject-and-retry）方式が導入され、戻り値が\[0.0, 1.0\)の範囲内であることが保証されるようになった


## 例
```cpp example
#include <random>
#include <iostream>
#include <cstdint>

int main()
{
  std::random_device seed_gen;
  std::uint32_t seed = seed_gen();
  std::mt19937 engine(seed);

  for(int i = 0; i < 10; ++i) {
    // floatの仮数部桁数で、範囲[0.0, 1.0)のランダムなfloat値を生成する
    constexpr std::size_t bits = std::numeric_limits<float>::digits;
    float result = std::generate_canonical<float, bits>(engine);
    std::cout << result << std::endl;
  }
}
```
* std::generate_canonical[color ff0000]
* digits[link /reference/limits/numeric_limits/digits.md]

### 出力
```
0.93695
0.880826
0.0535227
0.174785
0.989711
0.393811
0.588513
0.383415
0.920717
0.216669
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- GCC 4.9時点において、`float`型を指定した場合に、値`1.0`が生成されることがあるバグがある([Bug 63176](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=63176))
- Clang 3.3時点において、値`1.0`が生成されることがある([Bug 18767](https://llvm.org/bugs/show_bug.cgi?id=18767))

## 参照
- [P0346R1 A `<random>` Nomenclature Tweak](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0346r1.pdf)
    - URNGをURBGに変更
- [P0952R2 A New Specification for `generate_canonical`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0952r2.html)
    - C++26でテンプレートパラメータ名を`bits`から`digits`に変更し、棄却法による新しいアルゴリズムを導入
