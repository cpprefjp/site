#ranlux24_base
* random[meta header]
* std[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using ranlux24_base = subtract_with_carry_engine<uint_fast32_t, 24, 10, 24>;
}
```
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]
* subtract_with_carry_engine[link subtract_with_carry_engine.md]

##概要
パラメータ設定済みの[`subtract_with_carry_engine`](subtract_with_carry_engine.md)。  
`ranlux24_base`は、贅沢さレベル4のRANLUX法エンジンである[`ranlux24`](ranlux24.md)を定義するために使用する型である。  
  
##要件
`ranlux24_base`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`7937952`であること。


##乱数列の周期
10<sup>171</sup>


##シード、および生成される値の型
[`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1
