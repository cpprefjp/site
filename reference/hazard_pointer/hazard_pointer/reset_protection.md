# reset_protection
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
template <class T>
void reset_protection(const T* ptr) noexcept;      // (1) C++26
void reset_protection(nullptr_t = nullptr) noexcept; // (2) C++26
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]

## 概要
- (1): このハザードポインタが保護する対象を`*ptr`に変更する（現在の保護期間を終了する）。
- (2): このハザードポインタの保護を解除し、非関連 (unassociated) 状態にする。


## テンプレートパラメータ制約
- (1): `T`はハザードポインタで保護可能 (hazard-protectable) な型であること。


## 事前条件
- (1), (2): `*this`が空でないこと。


## 効果
- (1): `ptr`がヌルポインタ値の場合、(2)の`reset_protection()`を呼び出す。そうでない場合、このハザードポインタを`*ptr`に関連付け、それまでの保護期間を終了する。
- (2): （効果は事後条件で規定される。）


## 事後条件
- (2): `*this`が所有するハザードポインタは非関連状態となる。


## 戻り値
なし


## 計算量
定数時間


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
- [`std::hazard_pointer::protect`](protect.md)
- [`std::hazard_pointer::try_protect`](try_protect.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
