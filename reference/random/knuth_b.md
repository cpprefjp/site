#knuth_b(C++11)
```cpp
namespace std {
  typedef
    shuffle_order_engine<minstd_rand0, 256>
  knuth_b;
}
```
* minstd_rand0[link ./minstd_rand0.md]
* shuffle_order_engine[link ./shuffle_order_engine.md]

##概要
`knuth_b`は、線形合同法の生成順を並び替えた乱数生成法である。  
Donald Knuth氏の著書『The Art of Computer Programming, Second Edition, Volume 2, Seminumerical Algorithms』で考案された、リオーダーアルゴリズムBがそれだ。  

このアルゴリズムは、Microsoft .NET Frameworkの[`System.Random`](http://msdn.microsoft.com/ja-jp/library/system.random.aspx)クラスにも、実装として使用されている。


##要件
`knuth_b`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`1112339016`であること。


##乱数列の周期
不明(Boost.Randomのドキュメントより)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::knuth_b engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }
}
```

###出力例
```
1626011263
899717059
1316478681
732866635
512074444
354532979
2021640279
2002307542
2064026990
375634814
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
- [N1933 Improvements to TR1's Facility for Random Number Generation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1933.pdf)

