# swap
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
void swap(hazard_pointer& other) noexcept;
```

## 概要
他の`hazard_pointer`オブジェクトとハザードポインタの所有権を入れ替える。


## 効果
`*this`と`other`のハザードポインタの所有権を入れ替える。


## 戻り値
なし


## 例外
投げない


## 備考
- 所有されているハザードポインタは、入れ替えの前後で変化しない。入れ替え前に保護していたオブジェクトを引き続き保護し続ける。保護期間 (protection epoch) の終了や開始は発生しない。


## 計算量
定数時間


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::swap`](swap_free.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
