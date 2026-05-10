# inlinable_receiver
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Rcvr, class ChildOp>
  concept inlinable_receiver =
    receiver<Rcvr> &&
    requires (ChildOp* child) {
      { remove_cvref_t<Rcvr>::make_receiver_for(child) } noexcept ->
        same_as<remove_cvref_t<Rcvr>>;
    };
}
```
* receiver[link receiver.md]

## 概要
`inlinable_receiver`コンセプトは、[Sender](sender.md)との接続時に作成される[Operation State](operation_state.md)オブジェクトへのポインタから、必要に応じて再構築可能な[Receiver](receiver.md)要件を定義する。

`Rcvr`型のReceiverオブジェクト`rcvr`が`Op`型のOperation Stateオブジェクト`op`を生成するSenderに接続されていた場合、式`Rcvr::make_receiver_for(`[`addressof`](/reference/memory/addressof.md)`(op))`が`rcvr`と等しいReceiverに評価されるときに限って、`Rcvr`は`inlineable_receiver<Op>`のモデルである。
この条件を満たすReceiverは必要に応じて再作成できるため、`op`のメンバ変数として保存する必要がなくなる。

`ChildOp`は不完全型であってもよい。


## 要件
オブジェクト`O_0`, ..., `O_n`に対して、下記を満たすとき`O_n`は`O_0`から遷移的に構築される(transitively constructed)。

- [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(O_n)>`が[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(O_0)>`と同じ型を表し、かつ
- 下記いずれかを満たす。
    - `O_0`への参照をdecayコピーして`O_1`が初期化された、もしくは
    - `n > 1`かつ`O_{n-1}`が`O_0`から遷移的に構築され(transitively constructed)、`O_{n-1}`への非constで非volatileな右辺値参照から`O_n`が初期化された。

説明用の`E`を適格な式[`connect`](connect.md)`(sndr, rcvr)`とする。`E`の評価中に`rcvr`から遷移的に構築される(transitively constructed)全オブジェクトの生存期間が`E`の評価中に終了するならば、`E`は[Receiver](receiver.md)`rcvr`をインライン化する。
これは、そのような式において[Operation State](operation_state.md)オブジェクトにReceiverを格納する必要がないことを意味する。

説明用の`E`を下記のような適格な式[`connect`](connect.md)`(sndr, rcvr)`とする。

- `sndr`をC++標準ライブラリで定義する[Sender](sender.md)型とし、かつ
- `E`は[Receiver](receiver.md)`rcvr`をインライン化する。

ここで、`op`を`E`の評価結果とし、`op`に関連付けられた操作の仕様において`rcvr`から推移的に構築されたオブジェクトを表す左辺値(glvalue)が含まれている場合、その左辺値は式[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(rcvr)>::make_receiver_for(`[`addressof`](/reference/memory/addressof.md)`(op))`に対して temporary materialization conversionを適用した結果を表すものとする。

`StdRcvr`をC++標準ライブラリで定義する[Receiver](receiver.md)型とする。[Operation State](operation_state.md)型`Op`に対して、`StdRcvr`が`inlinable_receiver<Op>`のモデルであるかは未規定である。

`StdOp`をC++標準ライブラリで定義する[Operation State](operation_state.md)型とし、型`Sndr`と`Rcvr`を[`is_same_v`](/reference/type_traits/is_same.md)`<`[`connect_result_t`](connect_result_t.md)`<Sndr, Rcvr>, StdOp>`が`true`となる型とする。
`Rcvr`が`inlinable_receiver<StdOp>`のモデルである場合、型`Rcvr`のオブジェクト`rcvr`が与えられたとき、[`connect`](connect.md)操作が[Receiver](receiver.md)`rcvr`をインライン化する型`StdOp`のオブジェクトを生成するかは処理系定義である。


## 備考
`inlinable_receiver`コンセプトは、[Operation State](operation_state.md)オブジェクトサイズを削減する最適化の可否を表現するために導入された。C++標準の各種Senderアルゴリズムが実際にこのような最適化を行うかどうかは、処理系（標準ライブラリ実装）に依存する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::receiver`](receiver.md)


## 参照
- [P3425R1 Reducing operation-state sizes for subobject child operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3425r1.html)
- [P3986R1 A Wording Strategy for Inlinable Receivers](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3986r1.pdf)
