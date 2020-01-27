# knuth_b
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using knuth_b = shuffle_order_engine<minstd_rand0, 256>;
}
```
* minstd_rand0[link minstd_rand0.md]
* shuffle_order_engine[link shuffle_order_engine.md]

## 概要
`knuth_b`は、MINSTD最小標準乱数生成器である[`minstd_rand0`](minstd_rand0.md)の生成順を並び替えた乱数生成法である。

`knuth_b`では、[`minstd_rand0`](minstd_rand0.md)によって生成された乱数を`256`個バッファリングしておき、順番を入れ替えて値を選択していく。これにより、線形合同法([`minstd_rand0`](minstd_rand0.md) or [`minstd_rand`](minstd_rand.md))を直接使用するよりも出力間の相関関係が小さくなり、乱雑さが増加する。

Donald Knuth氏の著書『The Art of Computer Programming, Second Edition, Volume 2, Seminumerical Algorithms』で考案された、リオーダーアルゴリズムBがそれだ。  

このアルゴリズムは、Microsoft .NET Frameworkの[`System.Random`](https://docs.microsoft.com/ja-jp/dotnet/api/system.random)クラスにも、実装として使用されている。


## 要件
`knuth_b`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`1112339016`であること。


## 乱数列の周期
不明(Boost.Randomのド�ュメントより)


## サイズ
```cpp
(256 + 1) * sizeof(uint_fast32_t)
```
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]

[`shuffle_order_engine`](shuffle_order_engine.md)でバッファリングする要素の数(256) + [`minstd_rand0`](minstd_rand0.md)の状態(1)。


## パフォーマンス
[`minstd_rand0`](minstd_rand0.md)の2〜3倍遅い程度。

詳細は、[`shuffle_order_engine`](shuffle_order_engine.md)ページの動作説明を参照。


## 次元
次元数のトレードオフは、各出力の間(現在の状態と次の状態)の相関関係が、無視できるほどしかないということを意味する。たとえばN次元のランダムなベクトルを生成する場合、各次元の値に相関関係がほぼない状態にできる。

概要で説明したように、この手法は線形合同法によって生成された乱数を`256`個バッファリングして生成順を入れ替えたものである。それによって、出力間の相関関係は小さくなってはいるが、無視できるほど小さい相関関係とは言いにくい。`knuth_b`は、2次元以上のランダムな値を生成するために使用することもできるだろうが、そのような目的に使用するのであれば、[`mt19937`](mt19937.md)や[`mt19937_64`](mt19937_64.md)を使用することを推奨する。


## シード、および生成される値の型
[`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)


## 例
```cpp example
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
* std::knuth_b[color ff0000]
* std::uint64_t[link /reference/cstdint/uint64_t.md]

### 出力例
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N1933 Improvements to TR1's Facility for Random Number Generation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1933.pdf)

