# dereferenceable
* [meta exposition-only]
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  // 参照修飾を付加する
  template<class T>
  using with-reference = T&;

  // 参照修飾可能（例えばvoidはこれを満たさない）
  template<class T>
  concept can-reference = requires { 
    typename with-reference<T>;
  };

  // 間接参照可能であり、何らかの結果を返す
  template<class T>
  concept dereferenceable = requires(T& t) {
    { *t } -> can-reference;  // 等しさを保持することを要求しない
  };
}
```

## 概要

これらの説明専用エンティティは、任意の型が`operator*`による間接参照が可能であり、何かしらの結果を返すことを表すための最低限のコンセプトとそのためのエイリアステンプレートである。

これらのものは`<iterator>`ヘッダ内の他のクラスやコンセプトの定義および説明に使用されるものであり、実際に使用可能ではない。

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
