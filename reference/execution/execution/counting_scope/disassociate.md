# disassociate
* execution[meta header]
* std::execution[meta namespace]
* counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void disassociate() noexcept; // exposition only
```

## 概要
非同期スコープとの関連付けを解除する、説明専用のメンバ関数。
非同期トークン型[`token`](token.md)の[`disassociate`](token/disassociate.md)メンバ動作を定義する。


## 事前条件
説明用のメンバ変数`count`は`0`より大きい。


## 効果
`count`をデクリメントする。
デクリメント後の`count == 0`、かつ説明用のメンバ変数`state`が`open-and-joining`または`closed-and-joining`のとき、`state`を`joined`に変更し、`*this`に登録された全てのオブジェクトで`complete()`を呼び出す。


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
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
