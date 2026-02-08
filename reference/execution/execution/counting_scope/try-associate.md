# try-associate
* [meta exposition-only]
* execution[meta header]
* std::execution[meta namespace]
* counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
assoc-t try-associate() noexcept; // exposition only
```
* assoc-t[link ../counting_scope.md]

## 概要
非同期スコープとの関連付けを試行する、説明専用のメンバ関数。
非同期トークン型[`token`](token.md)の[`try_associate`](token/try_associate.md)メンバ動作を定義する。


## 効果
説明用のメンバ変数`count`が`max_associations`と等しいとき、何もしない。
そうでなければ、説明用のメンバ変数`state`に応じて、

- `unused`のとき、`count`をインクリメントし、`state`を`open`に変更する。
- `open`または`open-and-joining`のとき、`count`をインクリメントする。
- それ以外のとき、何もしない。


## 戻り値
`count`がインクリメントされたとき、`*this`に関連付けられた有効(engaged)な[`assoc-t`](../counting_scope.md)型のオブジェクトを返す。それ以外のときは、`assoc-t()`を返す。


## 例外
投げない


## バージョン
### 言語
- C++26


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
- [P3815R1 Add `scope_association` concept to P3149](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3815r1.html)
