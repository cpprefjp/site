# operator*
* memory[meta header]
* std[meta namespace]
* raw_storage_iterator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
raw_storage_iterator& operator*();
```

このクラスは、C++17から非推奨となり、C++20で削除された。


## 概要
イテレータを間接参照する


## 戻り値
`*this`


## 備考
間接参照で返された型への代入で出力する必要があるので、この関数は自身を返す。


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
