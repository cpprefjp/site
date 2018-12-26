# コンストラクタ
* memory[meta header]
* std[meta namespace]
* raw_storage_iterator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
explicit raw_storage_iterator(OutputIterator x);
```

このクラスは、C++17から非推奨となり、C++20で削除された。


## raw_storage_iteratorオブジェクトの構築
未初期化領域を指すイテレータ`x`を内部に保持する。


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
