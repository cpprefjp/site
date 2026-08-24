# operator=
* memory[meta header]
* std[meta namespace]
* raw_storage_iterator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
raw_storage_iterator& operator=(const T& element); // (1) C++98
raw_storage_iterator& operator=(T&& element);      // (2) C++17
```

このクラスは、C++17から非推奨となり、C++20で削除された。


## 概要
値を出力する


## テンプレートパラメータ制約
- (1) : 型`T`がコピー構築可能（Cpp17CopyConstructible）であること
- (2) : 型`T`がムーブ構築可能（Cpp17MoveConstructible）であること


## 効果
- (1) : 現在イテレータが指している位置に、`element`をコピーして`T`型オブジェクトを構築する。
- (2) : 現在イテレータが指している位置に、`std::move(element)`をムーブして`T`型オブジェクトを構築する。


## 戻り値
イテレータへの参照を返す。


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
- [LWG Issue 2127. Move-construction with `raw_storage_iterator`](https://cplusplus.github.io/LWG/issue2127)
    - C++17で、ムーブ構築のためのオーバーロード (2) が追加され、あわせて各オーバーロードにクラステンプレートパラメータ`T`のコピー構築可能／ムーブ構築可能の制約が明記された
