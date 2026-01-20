# disassociate
* execution[meta header]
* std::execution[meta namespace]
* simple_counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]
* [meta exposition-only]

```cpp
void disassociate() noexcept;
```

## 概要
非同期スコープとの関連付けを解除する、説明専用のメンバ関数。


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


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
