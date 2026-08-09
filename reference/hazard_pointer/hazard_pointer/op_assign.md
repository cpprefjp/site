# operator=
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
hazard_pointer& operator=(hazard_pointer&& other) noexcept;
```

## 概要
ムーブ代入演算子。`other`が所有するハザードポインタを`*this`へ移動する。

コピー代入演算子は提供されない（ムーブ専用型である）。


## 効果
- `this == &other`が`true`の場合、何もしない。
- そうでない場合、`*this`が空でなければ、`*this`が所有するハザードポインタを破棄し、その保護期間を終了する。


## 事後条件
- `other`が空だった場合、`*this`は空である。そうでない場合、`*this`は`other`がもともと所有していたハザードポインタを所有する。
- `this != &other`が`true`の場合、`other`は空になる。


## 戻り値
`*this`


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
