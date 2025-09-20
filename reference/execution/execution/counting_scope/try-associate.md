# try-associate
* execution[meta header]
* std::execution[meta namespace]
* counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
bool try-associate() noexcept; // exposition only
```

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
`count`がインクリメントされたとき、`true`を返す。それ以外のときは、`false`を返す。


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
