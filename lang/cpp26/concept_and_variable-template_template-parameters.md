# コンセプトと変数テンプレートをテンプレート引数として渡せるようにする [P2841R7]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、テンプレートテンプレートパラメータとしてコンセプトおよび変数テンプレートを渡せるようになる。

C++23では、テンプレートテンプレートパラメータにはクラステンプレートまたはエイリアステンプレートのみを渡すことができた。変数テンプレートやコンセプトはテンプレートであるにもかかわらず、テンプレート引数として渡すことができなかった。

```cpp
// コンセプトテンプレートパラメータの構文
template <
  template <typename> concept C   // コンセプトを受け取る
>
struct S {};

// 変数テンプレートテンプレートパラメータの構文
template <
  template <typename> auto V      // 変数テンプレートを受け取る
>
struct T {};

template <typename T>
concept MyConcept = true;

template <typename T>
constexpr auto MyVar = 42;

S<MyConcept> s; // OK (C++26)
T<MyVar> t;     // OK (C++26)
```


## 仕様
### コンセプトテンプレートパラメータ
テンプレートパラメータリストにおいて、`concept`キーワードでコンセプトを受け取るパラメータを宣言できる。

```cpp
template <template <typename> concept C>
void f();
```

コンセプトテンプレートパラメータは、制約としても使用できる。

```cpp
// コンセプトアダプタの定義
template <typename T, template <typename> concept C>
concept decays_to = C<std::decay_t<T>>;

// 簡略構文での使用
template <decays_to<std::copyable> T>
auto f(T&& x);
```

### 変数テンプレートテンプレートパラメータ
テンプレートパラメータリストにおいて、`auto`キーワードで変数テンプレートを受け取るパラメータを宣言できる。

```cpp
template <template <typename> auto V>
void g();
```

変数テンプレートは型が任意に特殊化できるため、`auto`は構文上のマーカーとして機能し、具体的な型名に置き換えることはできない。

```cpp
// 述語を満たす要素を数える変数テンプレート
template <template <typename> auto pred, typename... Ts>
constexpr std::size_t count_if_v = (... + pred<Ts>);
```


## この機能が必要になった背景・経緯
テンプレートテンプレートパラメータは、高階テンプレートやより柔軟な合成を可能にする機能である。クラステンプレートとエイリアステンプレートには対応していたが、変数テンプレートとコンセプトには対応しておらず、テンプレート機能の穴となっていた。

C++23でこれらをテンプレート引数として渡すためには、`static constexpr bool value`メンバをもつクラステンプレートでラップする必要があった。しかし、このワークアラウンドには以下の問題があった：

- クラステンプレートのインスタンス化は変数テンプレートの参照よりもコンパイルコストが高い
- コンセプトの簡略構文 (terse syntax) や包摂 (subsumption) の恩恵を受けられない
- APIに不必要な複雑性を追加する

この提案は、[P1985R3 Universal Template Parameters](https://open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1985r3.pdf)のサブセットとして、コンセプトと変数テンプレートに対するテンプレートテンプレートパラメータのサポートを先行して追加するものである。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++14 変数テンプレート](/lang/cpp14/variable_templates.md)
- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [C++26 制約式内での畳み込み式の順序付け](/lang/cpp26/ordering_of_constraints_involving_fold_expressions.md)


## 参照
- [P2841R7 Concept and variable-template template-parameters](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2841r7.pdf)

