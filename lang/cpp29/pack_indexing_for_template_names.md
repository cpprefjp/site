# テンプレートテンプレートパラメータのパックへのインデックスアクセスを許可 [P3670R4]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、[C++26で導入されたパラメータパックへの添字アクセス](/lang/cpp26/pack_indexing.md)を、テンプレートテンプレートパラメータのパック（テンプレート名のパック）に対しても使用できるようになる。

```cpp
template <template <typename> typename... TT>
struct S {
  template <typename T>
  using First = TT...[0]<T>;
};
```

`TT...[N]`はテンプレート名として扱われ、テンプレート名を書けるあらゆる場所で使用できる。クラステンプレートのテンプレートテンプレートパラメータに加えて、[C++26で導入された変数テンプレート・コンセプトのテンプレートテンプレートパラメータ](/lang/cpp26/concept_and_variable-template_template-parameters.md)のパックにも適用できる。


## 仕様
- 添字アクセス`P...[N]`の`P`はパックを表すテンプレート名であること
- 添字`N`は[`std::size_t`](/reference/cstddef/size_t.md)型へ変換された定数式であり、その値`V`は`0 <= V < sizeof...(P)`の範囲であること。`P...[V]`は、パックの`V`番目のテンプレート名を表す
- `P...[N]`自体はパック展開であり、パターンはテンプレート名である
- `P...[N]`がクラステンプレートやエイリアステンプレートを表す場合は、[クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)にも使用できる


## 例
```cpp example
#include <iostream>
#include <list>
#include <vector>

template <template <class> class... TT>
struct S {
  // パックTTの先頭のテンプレートを、テンプレート名として使用する
  template <class T>
  using First = TT...[0]<T>;
};

int main()
{
  // TT...[0]はstd::vectorを指すため、First<int>はstd::vector<int>
  S<std::vector, std::list>::First<int> v = {1, 2, 3};
  std::cout << v[1] << std::endl;
}
```
* TT...[0][color ff0000]

### 出力
```
2
```


## この機能が必要になった背景・経緯
C++26の[パラメータパックへの添字アクセス](/lang/cpp26/pack_indexing.md) (P2662R3) は、型のパックと式のパックのみを対象としており、テンプレート名のパックには使用できなかった。設計としてはすべてのパックに添字アクセスできることを意図していたが、当時審議中だった[コンセプトと変数テンプレートをテンプレート引数として渡せるようにする提案](/lang/cpp26/concept_and_variable-template_template-parameters.md) (P2841) などとの相互作用が明確でなかったため、テンプレート名のパックは見送られていた。

P2841がテンプレート名のパックへの添字アクセスの設計に影響しないことが確認されたため、本提案によってパック添字アクセスの設計が完成された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)
- [C++26 パラメータパックへのインデックスアクセスを許可](/lang/cpp26/pack_indexing.md)
- [C++26 コンセプトと変数テンプレートをテンプレート引数として渡せるようにする](/lang/cpp26/concept_and_variable-template_template-parameters.md)


## 参照
- [P3670R4 Pack Indexing for Template Names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3670r4.pdf)
