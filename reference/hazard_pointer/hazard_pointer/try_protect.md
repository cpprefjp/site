# try_protect
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
template <class T>
bool try_protect(T*& ptr, const atomic<T*>& src) noexcept;
```

## 概要
`ptr`が指すオブジェクトをこのハザードポインタで保護してよいか試み、その後の`src`の値と一致しているかを確認する。

[`protect()`](protect.md)メンバ関数は内部でこの関数を成功するまで繰り返し呼び出す。ロックフリーなアルゴリズムで、保護の設定と再確認を1ステップで行いたい場合に使用する。


## テンプレートパラメータ制約
- `T`はハザードポインタで保護可能 (hazard-protectable) な型であること。


## 事前条件
- `*this`が空でないこと。


## 効果
以下の手順を順に実行する：

1. 型`T*`の変数`old`を`ptr`の値で初期化する。
2. [`reset_protection`](reset_protection.md)`(old)`を評価する。
3. `src.load(memory_order::acquire)`の値を`ptr`へ代入する。
4. `old == ptr`が`false`の場合、[`reset_protection`](reset_protection.md)`()`を評価する。
* reset_protection[link reset_protection.md]
* src.load[link /reference/atomic/atomic/load.md]
* memory_order::acquire[link /reference/atomic/memory_order.md]


## 戻り値
`old == ptr`。すなわち、保護しようとしたポインタが、保護後の`src`の値と一致していれば`true`。


## 例外
投げない


## 備考
- 戻り値が`false`の場合、`ptr`には`src`の新しい値が格納されているので、再度この関数を呼び出して保護を試みることができる。


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
- [`std::hazard_pointer::reset_protection`](reset_protection.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
