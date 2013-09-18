#ranlux48(C++11)
```cpp
namespace std {
  typedef
    discard_block_engine<ranlux48_base, 389, 11>
  ranlux48;
}
```
* ranlux48_base[link ./ranlux48_base.md]
* discard_block_engine[link ./discard_block_engine.md]

##概要
`ranlux48`は。贅沢さレベル4のRANLUX(LUXury RANdom numbers)法エンジンである。  
RANLUX法は、以下の特徴を持つ：

- 低速だが、高品質な乱数を生成する
- 異なるシードのジェネレータ間では、乱数列が重複しない


RANLUX法は、0から4までの贅沢さレベル(luxury level)が選択可能である。  
レベルを高くするほど低速になるが、乱数の品質は高くなる。レベル4が最高品質となる。  
標準では、レベル3の[`ranlux24`](./ranlux24.md)および、レベル4の`ranlux48`が定義される。  
  
モンテカルロ法によるシミュレーションに、よく使用される。  


##要件
`ranlux48`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`249142670248501`であること。


##乱数列の周期
10<sup>171</sup>


##例
```cpp
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

###出力例
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

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


##参照
- [N1398 A Proposal to Add an Extensible Random Number Facility to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1398.html)
- [Uniform Random Numbers of Guaranteed Quality](http://wwwasdoc.web.cern.ch/wwwasdoc/shortwrupsdir/v115/top.html)

