# デストラクタ
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
~hazard_pointer();
```

## 概要
`hazard_pointer`オブジェクトを破棄する。


## 効果
`*this`が空でない場合、`*this`が所有するハザードポインタを破棄し、その保護期間 (protection epoch) を終了する。

これにより、このハザードポインタで保護していたオブジェクトは、他に保護しているハザードポインタがなければ回収可能となる。


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


## 関連項目
- [`std::hazard_pointer::reset_protection`](reset_protection.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
