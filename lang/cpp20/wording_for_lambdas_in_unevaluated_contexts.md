# 評価されない文脈でのラムダ式
* cpp20[meta cpp]

## 概要

C++17まではラムダ式が評価されない文脈に現れることはできなかったが、C++20からは評価されない文脈にラムダ式を書くことができるようになる。

C++20における評価されない文脈とは、`decltype, sizeof, noexcept, typeid`の引数及び、`concept`の定義内、`requires`節内の6箇所である。これらの文脈に現れている式は通常実行されることはない。そして、これらの場所でラムダ式を直接書くことができるようになる。

```cpp
// conceptの定義内
template<typename T>
concept C = requires {
  []{};
};

// requires節の中
template<typename T>
void f() requires(requires{ []{}; });

// decltypeのオペランド
using lambda_t = decltype([]{});

// noexcept式のオペランド
void g() noexcept(noexcept([]{}));

// sizeofのオペランド
auto s = sizeof([]{});

// typeidのオペランド
auto& t = typeid([]{});
```

ただし、評価されない文脈でもラムダ式を書くことができるようになっただけで、実行できるようになったわけではない。ラムダの後に`()`をおいて呼び出しまで書くこともできるが、その場合にも実行はされずその戻り値の型が囲む構文の処理対象となる。

```cpp
auto s1 = sizeof([]{ return 0;});   // 1
auto s2 = sizeof([]{ return 0;}()); // 4
```

## 仕様
(執筆中)

1. ラムダ式によって生成されるクロージャの型はリンケージを持たない
    - `typedef/using`によってリンケージを持つ名前を付ける事もできない
2. 関数テンプレートのシグネチャに含まれるラムダ式は、宣言が異なれば同一とはみなされない
    - つまり、ラムダ式は関数テンプレートのシグネチャに含まれない
    - 異なる翻訳単位の定義を参照するため、あるいは同一翻訳単位での再宣言において、そのシグネチャにラムダ式が含まれる場合、それら2つ（以上）の宣言は同一のものとはみなされない

## 例
(執筆中)

## この機能が必要になった背景・経緯

C++17までは、ラムダ式をSFINAEの文脈で用いて擬似的なコンセプトのような振る舞いをさせないために評価されない文脈においてラムダ式を書く事が禁止されていた（この制限は、ラムダ式がそれぞれ一意の型を持つため、それらを識別するためのマングリング方法を実装する負担をコンパイラ実装者に負わせないようにするために課されている）。

しかし、それだけでは不十分で非型テンプレートパラメータを巧妙に用いた迂回方法があったため、C++14に対する欠陥報告（[CWG Issue 1607](https://wg21.cmeerw.net/cwg/issue1607)）としてラムダ式がエンティティ（主にテンプレート）のシグネチャに現れるのが禁止された。

この変更に伴う文言によってラムダ式を用いてSFINAEする事は完全に禁止され、評価されない文脈においてラムダ式の使用を制限する必要がなくなったため、C++20においてその制限を緩和することになった。

ただし、ラムダ式が外部リンケージを持つエンティティのシグネチャに現れる事は相変わらず禁止されている。ラムダ式を用いてSFINAEするなど、そのような事がしたい場合には[コンセプト](./concepts.md)を用いる事でより容易に目的を達成できる。

## 関連項目
- [状態を持たないラムダ式を、デフォルト構築可能、代入可能とする](/lang/cpp20/default_constructible_and_assignable_stateless_lambdas.md.nolink)

## 参照
- [P0315R0 Wording for lambdas in unevaluated contexts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0315r0.pdf)
- [P0315R4 Wording for lambdas in unevaluated contexts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0315r4.pdf)
- [CWG Issue.1607 Lambdas in template parameters](https://wg21.cmeerw.net/cwg/issue1607)
- [C++標準化委員会の文書: P0310R--P0319R0 - 本の虫](https://ezoeryou.github.io/blog/article/2016-07-27-cpp-P0310R0-P0319R0.html)