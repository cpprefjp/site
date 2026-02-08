# make-sender
* [meta exposition-only]
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Tag, class Data = see below, class... Child>
constexpr auto make-sender(Tag tag, Data&& data, Child&&... child);
```

## 概要
`make-sender`は、Senderアルゴリズム動作仕様定義で用いられる説明専用の関数テンプレートである。

[`sender`](sender.md)のモデルである説明専用クラステンプレート[`basic-sender`](basic-sender.md)のインスタンスを生成する。

- `Tag` : [Senderアルゴリズムタグ](tag_of_t.md)（例：[`just`](just.md), [`then`](then.md)）
- `Data` : Senderアルゴリズムに指定された追加の引数。複数個の引数は[`product-type`](product-type.md)型を用いて単一値として保持する。
- `Child` : 子Senderのリスト。Senderファクトリでは0個、Senderアダプタでは通常1個の子Senderを保持する。


## 適格要件
下記の式が全て`true`であること。

- [`semiregular`](/reference/concepts/semiregular.md)`<Tag>`
- [`movable-value`](../movable-value.md)`<Data>`
- `(`[`sender`](sender.md)`<Child> && ...)`
- 型`Sndr`を[`basic-sender`](basic-sender.md)`<Tag, decay_t<Data>, decay_t<Child>...>`としたとき、[`dependent_sender`](dependent_sender.md)`<Sndr> ||` [`sender_in`](sender_in.md)`<Sndr>`


## 戻り値
転送された各引数により直接非リスト初期化された型[`basic-sender`](basic-sender.md)`<Tag,` [`decay_t`](/reference/type_traits/decay.md)`<Data>,` [`decay_t`](/reference/type_traits/decay.md)`<Child>...>`のprvalueを返す。


## 備考
テンプレートパラメータ`Data`のデフォルト引数は、[`semiregular`](/reference/concepts/semiregular.md)のモデルである空のトリビアルにコピー可能な未規定なクラス型。

[`sender_in`](sender_in.md)`<Sndr>`の評価結果が[`get_completion_signatures`](get_completion_signatures.md)`<Sndr>()`から送出された例外の場合、処理系（標準ライブラリ実装者）はエラーメッセージにその例外に関する情報を含めることが推奨される。


## バージョン
### 言語
- C++26


## 関連項目
- [`basic-sender`](basic-sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG4456 Decay `Data` and `Child` in `make-sender`](https://cplusplus.github.io/LWG/issue4456)
