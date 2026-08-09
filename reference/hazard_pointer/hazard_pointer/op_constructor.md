# コンストラクタ
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
hazard_pointer() noexcept;                       // (1) C++26
hazard_pointer(hazard_pointer&& other) noexcept; // (2) C++26
```

## 概要
- (1): デフォルトコンストラクタ。空の`hazard_pointer`オブジェクトを構築する。
- (2): ムーブコンストラクタ。

コピーコンストラクタは提供されない（ムーブ専用型である）。空でない`hazard_pointer`オブジェクトは、通常[`make_hazard_pointer()`](../make_hazard_pointer.md)関数で構築する。


## 事後条件
- (1): `*this`は空である。
- (2): `other`が空だった場合、`*this`は空である。そうでない場合、`*this`は`other`がもともと所有していたハザードポインタを所有し、`other`は空になる。


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
- [`std::make_hazard_pointer`](../make_hazard_pointer.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
