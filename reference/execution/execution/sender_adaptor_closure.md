# sender_adaptor_closure
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class-type D>
  struct sender_adaptor_closure { };
}
```
* class-type[link ../class-type.md]

## 概要
`sender_adaptor_closure`は、ユーザ定義のパイプ可能Senderアダプタクロージャオブジェクトの実装を補助するクラステンプレートである。

`sender_adaptor_closure<T>`を基底クラスとして持つクラス型`T`のオブジェクトは、パイプ可能Senderアダプタクロージャオブジェクトとなる。

`sender_adaptor_closure`のテンプレートパラメータ`D`は不完全型でもよい。
`|`演算子のオペランドにcv修飾された型`D`の式が登場するまでに、`D`は完全型かつ[`derived_from`](/reference/concepts/derived_from.md)`<sender_adaptor_closure<D>>`のモデルとなるべき。


### パイプ可能Senderアダプタクロージャオブジェクト
パイプ可能Senderアダプタクロージャオブジェクト(pipeable sender adaptor closure object)とは、1つ以上の[`sender`](sender.md)を引数にとり、戻り値として[`sender`](sender.md)を返す関数オブジェクトである。

パイプ可能Senderアダプタクロージャオブジェクト`c`と型`decltype((sndr))`が[`sender`](sender.md)のモデルである式`sndr`に対して、下記の2つの式は等価であり、いずれも[`sender`](sender.md)を生成する。

```cpp
c(sndr)
sndr | c
```

さらにパイプ可能Senderアダプタクロージャオブジェクト`d`が与えられたとき、式 `c | d` は別のパイプ可能Senderアダプタクロージャオブジェクト`e`となる。
このとき、`e`は下記の特性を持つ完全転送呼び出しラッパー(perfect forwarding call wrapper)である。

- 対象オブジェクトは、`d`で直接非リスト初期化された型`decltype(auto(d))`のオブジェクト`d2`である。
- `c`で直接非リスト初期化された型`decltype(auto(c))`のオブジェクト`c2`を、1個の束縛引数エンティティとして持つ。
- 説明用の`arg`を`e`に対する関数呼び出し式の引数としたとき、呼び出しパターン`d2(c2(arg))`に対応する。

式 `c | d` は、`e`の全て状態エンティティ(state entities)の初期化が適格な場合に限って適格となる。


### パイプ可能Senderアダプタオブジェクト
パイプ可能Senderアダプタオブジェクト(pipeable sender adaptor object)とは、第1引数に[`sender`](sender.md)をとり、戻り値として[`sender`](sender.md)を返すカスタマイゼーションポイントオブジェクトである。
パイプ可能Senderアダプタオブジェクトが1個の引数しかとらないとき、パイプ可能Senderアダプタクロージャオブジェクトとなる。

パイプ可能Senderアダプタオブジェクト`adaptor`が1個より多い引数をとるとき、型`decltype((sndr))`が[`sender`](sender.md)のモデルである式`sndr`、`args...`を式`adaptor(sndr, args...)`が適格となる引数リスト、型パック`BoundsArgs`を`decltype(auto(args))...`とする。
式`adaptor(args...)`は、下記の特性をもつ完全転送呼び出しラッパーであるパイプ可能Senderアダプタクロージャオブジェクト`f`を生成する。

- 対象オブジェクトは`adaptor`のコピー。
- 束縛引数エンティティ`bound_args`は、それぞれ[`std::forward`](/reference/utility/forward.md)`<decltype((args))>(args)...`で直接非リスト初期化された型`BoundArgs...`のオブジェクトから構成される。
- 説明用の`rcvr`を`f`に対する関数呼び出し式の引数としたとき、呼び出しパターン`adaptor(rcvr, bound_args...)`に対応する。

式`adaptor(args...)`は、前述の通り結果の束縛引数エンティティの初期化が適格な場合に限って適格となる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::sender`](sender.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
