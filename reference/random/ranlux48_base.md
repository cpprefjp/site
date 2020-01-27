# ranlux48_base
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using ranlux48_base = subtract_with_carry_engine<uint_fast64_t, 48, 5, 12>;
}
```
* uint_fast64_t[link /reference/cstdint/uint_fast64_t.md]
* subtract_with_carry_engine[link subtract_with_carry_engine.md]

## 概要
パラメータ�定済みの[`subtract_with_carry_engine`](subtract_with_carry_engine.md)。  
`ranlux48_base`は、贅沢さレベル4のRANLUX法エンジンである[`ranlux48`](ranlux48.md)を定義するために使用する型である。  
  
## 要件
`ranlux48_base`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`61839128582725`であること。


## 乱数列の周期
10<sup>171</sup>


## シード、および生成される値の型
[`uint_fast64_t`](/reference/cstdint/uint_fast64_t.md)


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017
