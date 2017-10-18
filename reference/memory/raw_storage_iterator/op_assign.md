# operator=
* memory[meta header]
* std[meta namespace]
* raw_storage_iterator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]

```cpp
raw_storage_iterator& operator=(const T& element);
```

このクラスは、C++17から非推奨となった。


## 概要
値を出力する


## 効果
現在イテレータが指している位置に、`element`から`T`型オブジェクトを構築する。


## 戻り値
イテレータへの参照を返す。


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
