# make-sender
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Tag, class Data = see below, class... Child>
constexpr auto make-sender(Tag tag, Data&& data, Child&&... child);
```
* see below[italic]

## 概要
`make-sender`は、Senderアルゴリズム動作仕様定義で用いられる説明専用の関数テンプレートである。

[`sender`](sender.md)のモデルである説明専用クラステンプレート[`basic-sender`](basic-sender.md)のインスタンスを生成する。

- `Tag` : [Senderアルゴリズムタグ](tag_of_t.md)（例：[`just`](just.md), [`then`](then.md.nolink)）
- `Data` : Senderアルゴリズムに指定された追加の引数。複数個の引数は[`product-type`](product-type.md)型を用いて単一値として保持する。
- `Child` : 子Senderのリスト。Senderファクトリでは0個、Senderアダプタでは通常1個の子Senderを保持する。


## 適格要件
- [`semiregular`](/reference/concepts/semiregular.md)`<Tag> == true`
- [`movable-value`](../movable-value.md)`<Data> == true`
- `(`[`sender`](sender.md)`<Child> && ...) == true`


## 戻り値
転送された各引数により直接非リスト初期化された型[`basic-sender`](basic-sender.md)`<Tag,` [`decay_t`](/reference/type_traits/decay.md)`<Data>,` [`decay_t`](/reference/type_traits/decay.md)`<Child>...>`のprvalueを返す。


## 備考
テンプレートパラメータ`Data`のデフォルト引数は、[`semiregular`](/reference/concepts/semiregular.md)のモデルである空のトリビアルにコピー可能な未規定なクラス型。


## バージョン
### 言語
- C++26


## 関連項目
- [`basic-sender`](basic-sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
