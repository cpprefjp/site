# define_aggregate
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval info define_aggregate(info type_class, R&& members);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
不完全なクラス型を、指定されたデータメンバを持つ集成体として定義する。


## 効果
`type_class`が表すクラス型を`C`とし、`members`の各要素が表すデータメンバ記述を`(T, N, A, W, NUA, ANN)`とする。

`C`を定義する宣言を注入する。この宣言は次の性質を持つ：

- `members`の各要素について、`C`のクラススコープに属する**public**なメンバ`M`が対応して生成される：
    - `N`が無い（名前を持たない）場合、`M`は無名ビットフィールドとなる。そうでなければ、`M`は名前`N`を持つ非静的メンバ変数となる
    - `M`の型は`T`である
    - `NUA`が`true`の場合に限り、`M`は`[[no_unique_address]]`属性付きで宣言される
    - `W`が指定されている場合、`M`は幅`W`のビットフィールドとなる。そうでなければビットフィールドではない
    - `A`が指定されている場合、`M`は`alignas(A)`を持つ
    - `ANN`の各リフレクションは`M`のアノテーションとなる
    - メンバは`members`に与えた順に宣言される
- `C`がテンプレートクラスの特殊化であってローカルクラスでない場合、この宣言は明示的特殊化となる


## 戻り値
`type_class`（定義の結果、完全型となったクラス`C`を表すリフレクション）を返す。


## 定数式に評価される条件
以下のすべてを満たすこと：

- `type_class`がCV修飾されていないクラス型を表すこと
- `C`が評価コンテキストのあらゆる地点から不完全であること
- `members`の各要素`r`について、[`is_data_member_spec()`](is_data_member_spec.md)`(r)`が`true`であること
- `members`の各要素のデータメンバ記述の型`T`について、[`is_complete_type()`](is_complete_type.md)`(T)`が`true`であること
- `members`の先行する要素`r_K`と後続の要素`r_L`（`K < L`）の組それぞれについて、両者の名前`N_K`と`N_L`がともに存在するならば、次のいずれかであること。すなわち、指定する識別子はそれぞれ一意であるか`_`である
    - `N_K`と`N_L`が異なる識別子である
    - `N_K`が識別子`_`（アンダースコア）である


## 備考
`C`がテンプレートクラスの特殊化でまだ実体化されていない場合、`C`は明示的特殊化として扱われる。


## 例
```cpp example
#include <meta>
#include <print>

struct MyStruct;

consteval {
  std::meta::define_aggregate(^^MyStruct, {
    std::meta::data_member_spec(^^int, {.name = "id"}),
    std::meta::data_member_spec(^^double, {.name = "value"})
  });
}

int main() {
  MyStruct s{42, 3.14};
  std::println("id={}, value={}", s.id, s.value);
}
```

### 出力
```
id=42, value=3.14
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`data_member_spec`](data_member_spec.md)
- [`data_member_options`](data_member_options.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [LWG Issue 4424. `meta::define_aggregate` should require a class type](https://cplusplus.github.io/LWG/issue4424)
    - C++26で、`type_class`がCV修飾されていないクラス型を表すことが要件として明確化された。非クラス型やCV修飾された型を渡した場合はコンパイルエラーとして診断される
- [LWG Issue 4443. Clean up identifier comparisons in `meta::define_aggregate`](https://cplusplus.github.io/LWG/issue4443)
    - C++26で、メンバ名の比較を文字列ではなく識別子として直接おこなう（`N_K`が`N_L`と同じ識別子でない、`N_K`が識別子`_`である、など）よう文言が整理された。動作は変わらない
