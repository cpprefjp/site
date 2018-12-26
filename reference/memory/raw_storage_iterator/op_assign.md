# operator=
* memory[meta header]
* std[meta namespace]
* raw_storage_iterator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
raw_storage_iterator& operator=(const T& element);
```

このクラスは、C++17から非推奨となり、C++20で削除された。


## 概要
値を出力する


## 効果
現在イテレータが指している位置に、`element`から`T`型オブジェクトを構築する。


## 戻り値
イテレータへの参照を返す。


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
