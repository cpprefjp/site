# tag_of_t
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<sender Sndr>
  using tag_of_t = see below;
}
```
* sender[link sender.md]

## 概要
[Sender型](sender.md)`Sndr`のSenderアルゴリズムタグ型を取得する。

説明用の`sndr`を`decltype((sndr))`が`Sndr`型となる式とする。型`tag_of_t<Sndr>`は下記の通り定義される。

- 次の宣言が適格であれば、`tag_of_t<Sndr>`は`decltype(auto(tag))`の別名となる。

    ```cpp
    auto&& [tag, data, ...children] = sndr;
    ```

- そうでなければ、`tag_of_t<Sndr>`は不適格となる。


### Senderアルゴリズムタグ
実行制御ライブラリのSenderアルゴリズムから生成された[Sender](sender.md)`sndr`は、[構造化束縛](/lang/cpp17/structured_bindings.md)によってSenderアルゴリズムタグ`tag`、データ`data`、0個以上の子Senderパック`...children`の組へと分解される。

この仕様は[Sender変換](transform_sender.md)が行われる可能性のあるSenderアルゴリズムに対してのみ要求されるものであり、ユーザ定義のSender型において構造化束縛による分解をサポートする必要はない。


## 例
```cpp example
#include <concepts>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr = ex::just(42);
  using Tag = ex::tag_of_t<decltype(sndr)>;
  static_assert(std::same_as<Tag, ex::just_t>);
}
```
* ex::tag_of_t[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::just_t[link just.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`basic-sender`](basic-sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
