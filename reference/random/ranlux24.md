#ranlux24
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using ranlux24 = discard_block_engine<ranlux24_base, 223, 23>;
}
```
* ranlux24_base[link ranlux24_base.md]
* discard_block_engine[link discard_block_engine.md]

##概要
`ranlux24`は、贅沢さレベル3のRANLUX(LUXury RANdom numbers)法エンジンである。  
RANLUX法は、以下の特徴を持つ：

- 低速だが、高品質な乱数を生成する
- 異なるシードのジェネレータ間では、乱数列が重複しない


RANLUX法は、0から4までの贅沢さレベル(luxury level)が選択可能である。  
レベルを高くするほど低速になるが、乱数の品質は高くなる。レベル4が最高品質となる。  
標準では、レベル3の`ranlux24`および、レベル4の[`ranlux48`](ranlux48.md)が定義される。  
  
モンテカルロ法によるシミュレーションに、よく使用される。  


##要件
`ranlux24`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`9901578`であること。


##乱数列の周期
10<sup>171</sup>


##サイズ
```cpp
24 * sizeof(uint_fast32_t)
```
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]


##パフォーマンス
[`minstd_rand`](minstd_rand.md)や[`minstd_rand0`](minstd_rand0.md)に比べて、5倍ほど遅い。


##シード、および生成される値の型
[`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::ranlux24 engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::ranlux24[color ff0000]
* std::random_device[link random_device.md]
* seed_gen()[link random_device/op_call.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* engine()[link discard_block_engine/op_call.md]

###出力例
```
14989051
4145629
9009933
15957878
252315
15191713
10652539
8111899
16296385
3893002
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1


##参照
- [N1398 A Proposal to Add an Extensible Random Number Facility to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1398.html)
- [Uniform Random Numbers of Guaranteed Quality](http://wwwasdoc.web.cern.ch/wwwasdoc/shortwrupsdir/v115/top.html)

