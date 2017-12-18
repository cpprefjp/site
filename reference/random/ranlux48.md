# ranlux48
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using ranlux48 = discard_block_engine<ranlux48_base, 389, 11>;
}
```
* ranlux48_base[link ranlux48_base.md]
* discard_block_engine[link discard_block_engine.md]

## 概要
`ranlux48`は、贅沢さレベル4のRANLUX(LUXury RANdom numbers)法エンジンである。  
RANLUX法は、以下の特徴を持つ：

- 低速だが、高品質な乱数を生成する
- シードを系統的に選ぶ (例えばスレッド ID) と、特に初期において生成した値の間に線型の相関 (nearly affine dependence) がみられる。これを避けるには
    - [`random_device`](random_device.md) 等の非決定論的な乱数をシードとして使う
    - [最初の方の値を捨てる](discard_block_engine/discard.md) (少なくとも 11 個)


RANLUX法は、0から4までの贅沢さレベル(luxury level)が選択可能である。  
レベルを高くするほど低速になるが、乱数の品質は高くなる。レベル4が最高品質となる。  
標準では、レベル3の[`ranlux24`](ranlux24.md)および、レベル4の`ranlux48`が定義される。  
  
モンテカルロ法によるシミュレーションに、よく使用される。  


## 要件
`ranlux48`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`249142670248501`であること。


## 乱数列の周期
10<sup>171</sup>


## サイズ
```cpp
12 * sizeof(uint_fast64_t)
```
* uint_fast64_t[link /reference/cstdint/uint_fast64_t.md]


## パフォーマンス
[`ranlux24`](ranlux24.md)に比べて、40%ほど遅い。


## シード、および生成される値の型
[`uint_fast64_t`](/reference/cstdint/uint_fast64_t.md)


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::ranlux48 engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::ranlux48[color ff0000]
* std::random_device[link random_device.md]
* seed_gen()[link random_device/op_call.md]
* std::uint64_t[link /reference/cstdint/uint64_t.md]
* engine()[link discard_block_engine/op_call.md]

### 出力例
```
150487143042812
271824176483188
144262504480630
41969914011396
182011784013906
108124382624549
17607643147140
165775445584215
85439168429936
199504771218332
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照
- [N1398 A Proposal to Add an Extensible Random Number Facility to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1398.html)
- [Ranlux - Random number generator](http://luscher.web.cern.ch/luscher/ranlux/)
- [Uniform Random Numbers of Guaranteed Quality](http://cmd.inp.nsk.su/old/cmd2/manuals/cernlib/shortwrups/node244.html)
- [M. Matsumoto, et al., Common Defects in Initialization of Pseudorandom Number Generators, *ACM Trans. Model. Comput. Simul.* **17**, 15 (2007)](https://doi.org/10.1145/1276927.1276928)
