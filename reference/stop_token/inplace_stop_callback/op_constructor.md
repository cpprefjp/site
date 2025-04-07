# コンストラクタ
* stop_token[meta header]
* std[meta namespace]
* inplace_stop_callback[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Initializer>
explicit inplace_stop_callback(inplace_stop_token st, Initializer&& init)
  noexcept(is_nothrow_constructible_v<CallbackFn, Initializer>);  // (1)

inplace_stop_callback(const inplace_stop_callback&) = delete;  // (2)
inplace_stop_callback(inplace_stop_callback&&) = delete;       // (3)
```
* inplace_stop_token[link ../inplace_stop_token.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]

## 概要
- (1) : [`inplace_stop_token`](../inplace_stop_token.md)を受け取り、その`inplace_stop_token`が参照する停止状態への停止要求に応じて呼び出されるコールバックを登録する。
- (2) : コピーコンストラクタ。コピー不可。
- (3) : ムーブコンストラクタ。ムーブ不可。


## テンプレートパラメータ制約
クラステンプレートのテンプレート引数`CallbackFn`とコンストラクタのテンプレート引数`Initializer`は[`constructible_from`](/reference/concepts/constructible_from.md)`<CallbackFn, Initializer>`制約を満たすこと。


## 効果
説明専用のメンバ変数`callback-fn`を[`std::forward`](/reference/utility/forward.md)`<CallbackFn>(init)`で初期化し、[停止可能コールバック登録](../stoppable_token.md)を実行する。


## 例外
説明専用のメンバ変数`callback-fn`を`init`で初期化する際に例外が発生する場合は、その例外を送出する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
