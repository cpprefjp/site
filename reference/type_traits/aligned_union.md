# aligned_union
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp23deprecated[meta cpp]

```cpp
namespace std {
  template <std::size_t Len,
            class... Types>
  struct aligned_union {
    using type = …;
    static constexpr std::size_t alignment_value = …;
  };                                                                  // (1) C++11

  template <std::size_t Len, class... Types>
  using aligned_union_t = typename aligned_union<Len,Types...>::type; // (2) C++14
}
```

この機能はC++23で非推奨となった。代わりに`alignas(Ts...)` [`std::byte`](/reference/cstddef/byte.md)`[`[`std::max`](/reference/algorithm/max.md)`({sizeof(Ts)...})];`を使用することを推奨する。


## 概要
アライメント調整された共用体領域を作る。


## 要件
`Types...`に、1個以上の型が与えられること。かつ、それらの型は全て完全型であること。


## 効果
- `aligned_union`は、領域サイズ`Len`、要素型列`Types...`で調整した未初期化の共用体領域をメンバ型`type`として定義する。
- メンバ型`type`は、以下の型分類となる：
    - C++11 : `Types...`のいずれかの型が非POD型だとしても、メンバ型`type`は[POD型](is_pod.md)となる
    - C++20 : `Types...`のいずれかの型が非トリビアル型だとしても、メンバ型`type`は[トリビアル型](is_trivial.md)となる

また、`Types...`全ての厳格なアライメント値を、[`std::size_t`](/reference/cstddef/size_t.md)型の静的メンバ定数`alignment_value`として定義する。


## 非推奨の詳細 (C++23)
この機能は、いくつかの点で高いレベルの有害になりえる：

- この機能を呼び出すことで未定義動作を引き起こす (この型はストレージを提供するわけではない)
- 保証が正しくない (標準では、型が少なくとも要求された以上の大きさであることのみを要件としているだけで、上限サイズを要求できない)
- APIが多くの理由で間違っている。そのためにこのAPIを使うために繰り返し同じ事前作業が必要になる。API設計が間違っている理由は以下：
    - `::type`の値にアクセスするために`reinterpret_cast`が必要となってしまう。これによって`constexpr`で使用できず、未定義動作を引き起こせてしまう
    - C++14で導入された`aligned_union_t`ではなく誤って`aligned_union`を使用してしまい、その違いに気づきにくい (`aligned_union`は`::type`を指定しなければならない)
    - 少なくともNバイト以上という指定はできるが、実際のサイズ (上限サイズ) を指定できないため、必要以上のメモリが使用される可能性がある

これらの問題は[`aligned_storage`](aligned_storage.md)も同様である。`aligned_union`固有の問題はそれほどひどくないが、それでも望ましくない以下のような問題がある：

- 第1テンプレートパラメータが無意味
    - この機能は、可変個のすべての型のサイズとアライメントを推論し、それらの最大値を実際のストレージとして使用する。先頭のテンプレートパラメータはストレージの最小サイズである。すべての型がそれより小さい場合でも、ストレージは第1テンプレートパラメータより小さくならない
    - 最小サイズを必要とすることはめずらしいことであり、ほとんどの場合は`aligned_union_t<0, Ts...>`のように使用する。この引数`0`は機能に精通していなければ理解しにくい
- サイズとアライメントの推論が[`aligned_storage`](aligned_storage.md)と一貫していない
    - 一貫した仕様であるならば、`aligned_union_t<0, T>`のような型をひとつだけ指定する用途につながるが、現在の仕様は何を意図していたのか不明である

この機能を以下のように置き換えることを推奨する：

```diff
template <typename... Ts>
class MyContainer {
  // [...]
private:
- std::aligned_union_t<0, Ts...> t_buff;
+ alignas(Ts...) std::byte t_buff[std::max({sizeof(Ts)...})];
  // [...]
};
```
* std::byte[link /reference/cstddef/byte.md]
* std::max[link /reference/algorithm/max.md]


## 例
```cpp example
#include <iostream>
#include <string>
#include <type_traits>

union X {
  int n;
  std::string s;

  X(const char* str)
    : s(str) {}
};

int main()
{
  using aligned_X = std::aligned_union<sizeof(X), int, std::string>;

  aligned_X::type x;

  new (&x) X("hello");

  std::cout << reinterpret_cast<X&>(x).s << std::endl;
  std::cout << aligned_X::alignment_value << std::endl;
}
```
* std::aligned_union[color ff0000]

### 出力例(アライメント値は処理系定義)
```
hello
8
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 5.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2012は、`alignment_value`が定義されていない。
	- 2012は、可変引数テンプレートに対応していないため、不完全な実装である。
	- `aligned_union_t`は2013から


## 関連項目
- [C++20 PODを非推奨化](/lang/cpp20/deprecate_pod.md)


## 参照
- [N1877 Adding Alignment Support to the C++ Programming Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1877.pdf)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
    - C++14で`aligned_union_t`が定義された
- [LWG Issue 2979. `aligned_union` should require complete object types](https://wg21.cmeerw.net/lwg/issue2979)
- [P0767R1 Deprecate POD](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0767r1.html)
    - C++20でPOD用語の非推奨化にともない、メンバ型`type`がPOD型ではなくトリビアル型に分類されるよう規定が変更された
- [P1413R3 Deprecate `std::aligned_storage` and `std::aligned_union`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1413r3.pdf)
    - C++23でこの機能が非推奨となった
