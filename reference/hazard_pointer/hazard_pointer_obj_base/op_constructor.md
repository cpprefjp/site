# コンストラクタ
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer_obj_base[meta class]
* cpp26[meta cpp]

```cpp
protected:
  hazard_pointer_obj_base() = default;                               // (1) C++26
  hazard_pointer_obj_base(const hazard_pointer_obj_base&) = default; // (2) C++26
  hazard_pointer_obj_base(hazard_pointer_obj_base&&) = default;      // (3) C++26
```

## 概要
- (1): デフォルトコンストラクタ
- (2): コピーコンストラクタ
- (3): ムーブコンストラクタ

いずれも`protected`メンバであり、派生クラスからのみ使用できる。


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
