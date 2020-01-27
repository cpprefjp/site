# generate_canonical
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class RealType, std::size_t bits, class URBG>
  RealType generate_canonical(URBG& g);
}
```

## 概要
実数区間\[0.0, 1.0\)に展開（事実上�規化）された一様分布乱数を得るための関数テンプレート。
テンプレート引数に与える `RealType` 型について、 `bits` だけの分解能を持つ仮数部を `URBG g`を必要な回数だけ繰り返し呼び出して生成する。


## テンプレートパラメータ
- `class RealType` : 生成する実数の型。
- `size_t bits` : 生成する実数における仮数部への分解能の最低要求。最大値は `std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`digits`](/reference/limits/numeric_limits/digits.md) 。
- `class URBG` : 一様乱数生成器の型。

## 関数パラメータ
- URBG& g : 一様乱数生成器。


## 例外
`URBG g` が例外を送出する場合はそれに準ずる。


## 例
```cpp example
#include <random>
#include <iostream>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- GCC 4.9時点において、`float`型を指定した場合に、値`1.0`が生成されることがあるバグがある([Bug 63176](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=63176))
- Clang 3.3時点において、値`1.0`が生成されることがある([Bug 18767](https://llvm.org/bugs/show_bug.cgi?id=18767))

### 参考
- N3337 p.909 §26.5.7.2


## 参照
- [P0346R1 A `<random>` Nomenclature Tweak](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0346r1.pdf)
    - URNGをURBGに変更
