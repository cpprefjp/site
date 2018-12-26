# operator++
* memory[meta header]
* std[meta namespace]
* raw_storage_iterator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
raw_storage_iterator& operator++();   // (1)
raw_storage_iterator operator++(int); // (2)
```

このクラスは、C++17から非推奨となり、C++20で削除された。


## 概要
イテレータをインクリメントする。


## 効果
イテレータを一つ進める。


## 戻り値
- (1) : 前置インクリメント。進めたイテレータへの参照を返す。
- (2) : 後置インクリメント。進める前のイテレータを値として返す。


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
