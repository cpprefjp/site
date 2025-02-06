# retire
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* rcu_obj_base[meta class]
* cpp26[meta cpp]

```cpp
void retire(D d = D(),
            rcu_domain& dom = rcu_default_domain()) noexcept;
```
* rcu_domain[link ../rcu_domain.md]
* rcu_default_domain[link ../rcu_default_domain.md]

## 概要
RCU機構により保護されるオブジェクト回収をスケジュールする。


## 適格要件
クラステンプレートパラメータ`T`が、下記条件を満たすRCU保護可能(rcu-protectable)な型であること。

- `rcu_obj_base<T,D>`型を唯一の基底クラスとして持つクラス型であり、かつ
- その基底は公開(public)かつ非仮想基底クラスであり、かつ
- 型`X`, `Y`の他の組合せに対して`rcu_obj_base<X, Y>`型を基底クラスとして持たない。


## 事前条件
- `*this`が型`T`のオブジェクト`x`の基底クラスサブオブジェクトであること。
- `x`に対して`rcu_obj_base<T,D>::retire`が呼び出されていないこと。
- `D`型の説明専用メンバ変数`deleter`への代入が例外で終了しないこと。


## 効果
- `deleter =` [`std::move`](/reference/utility/move.md)`(d)`を評価し、
- RCUドメイン`dom`に対して式`deleter(`[`addressof`](/reference/memory/addressof.md)`(x))`の評価をスケジュールする。
    - 評価が例外で終了した場合は未定義の動作を引き起こす。
- `dom`に対してスケジュールされた評価を呼び出す可能性がある。


## 戻り値
なし


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`rcu_domain::unlock`](../rcu_domain/unlock.md)
- [`rcu_retire`](../rcu_retire.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
