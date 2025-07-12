# 全ての非型テンプレート引数の定数式評価を許可 [N4268]

* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17では、非型テンプレート引数(non-type template argument)で扱える型はとくに変わらないが、渡せる値についての制限緩和が行われる。

今回緩和されるのは、ポインタの値である。C++14までは、以下のような制限があった：

- 静的記憶域を持つ完全オブジェクトへのポインタ値もしくは参照、もしくは
- ヌルポインタ値に評価される定数式、
- ヌルメンバポインタ値に評価される定数式であること

つまり、`static`でないオブジェクトへのポインタは、ヌルポインタしか渡せなかった。

C++17ではこの制限が撤廃され、定数式で評価されるポインタならなんでも渡せるようになる。その許可される定数式での評価には、配列からポインタへの変換や、関数から関数ポインタへの変換、修飾の変換なども含まれる。

## 仕様
直接の根拠は、次の記述が与えている。C++14での記述は削除され、C++17で置き換えられた。

[n4659](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf) [temp.arg.nontype]/2より

型ではないテンプレートパラメータのテンプレート引数は、テンプレートパラメータの型の変換された定数式になる。
参照型またはポインタ型の非型テンプレートパラメータの場合、定数式の値は参照してはいけない（ポインタ型の場合は、次のアドレスにはならない）

- サブオブジェクト
- 一時オブジェクト
- 文字列リテラル
- typeid式の結果
- 定義済みの`__func__`変数

C++14からC++17にかけて、次の表のような変更があったと考えられる。[n4198](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4198.html)を参照。

| パラメータ種別 | C++14での引数の構文 |
|---|---|
| 整数または列挙 |	任意の定数式 |
| ポインタ型 | 正確な構文と実体、配列、関数、リンケージを使用して静的記憶期間オブジェクトまたは関数を参照する。NULLポインタに評価される任意の定数式 |
| 参照型 |	正確な構文とオブジェクト、関数、リンケージを使用して静的記憶期間オブジェクトまたは関数を参照する |
| メンバへのポインタ | 正確な構文と`&X::y` 、またはメンバへのポインタが`NULL`に評価される任意の定数式 |
| [`std::nullptr_t`](/reference/cstddef/nullptr_t.md) | 任意の定数式 |

から

| パラメータ種別 | C++17での引数の構文 |
|---|---|
| 整数または列挙 |	任意の定数式 |
| ポインタ型 | 静的記憶期間を持つ、関数、または`NULL`ポインタを持つ完全なオブジェクトのアドレスに評価される任意の定数式 |
| 参照型 |	静的記憶期間を持つ完全なオブジェクトまたは関数を参照する、`glvalue`に評価される任意の定数式。 |
| メンバへのポインタ | 任意の定数式 |
| [`std::nullptr_t`](/reference/cstddef/nullptr_t.md) | 任意の定数式 |

## 例
C++14では、以下のコードはコンパイルエラーとなるが、C++17では問題なくコンパイルされる。

```cpp example
template<int* p> 
struct A {};

int n;
A<&n> a; // ok

constexpr int* p() { return &n; }
A<p()> b; // error in C++14

constexpr int* q() { return nullptr; }
A<q()> c; // ok!

int main(){}
```

### 出力例
clang での出力例

C++14

```
prog.cc:8:3: error: non-type template argument does not refer to any declaration
A<p()> b; // error in C++14
  ^~~
prog.cc:1:15: note: template parameter is declared here
template<int *p> 
              ^
1 error generated.
```

C++17

```
```

## この機能が必要になった背景・経緯
http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4198.html を google 翻訳して編集

ポインタ、参照、およびメンバへのポインタに対する構文上の制限はぎこちなく、妥当なリファクタリングを妨げていた。例えば：

```cpp
template<int *p> struct A {};
int n;
A<&n> a; // ok

constexpr int *p() { return &n; }
A<p()> b; // error

constexpr int *q() { return nullptr; }
A<q()> c; // ok!
```

これまでの制限の歴史的な理由は、C++がこれまでポインタ、参照、またはメンバへのポインタ型の定数式のための十分に強力な仕様を持っていなかったことが原因だった。しかし、それはもはや当てはまらない。現状では、そのようなテンプレート引数を評価するには実装が必要だが、結果がnullでないことが判明した場合は結果を破棄する必要がある。

上記に加えて、リンケージを持つエンティティに対する制限はエクスポートされたテンプレートのアーティファクトであり、テンプレートタイプパラメータに対するリンケージ制限が削除されたときに削除された可能性がある。

(翻訳は正しくない可能性がある。正しくは、[原文](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4198.html)を参照。)

## 参照
- [N4198 Allow constant evaluation for all non-type template arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4198.html)
- [N4268 Allow constant evaluation for all non-type template arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4268.html)
- [C++1z 全ての非型テンプレート引数の定数式評価を許可 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/10/27/180801)
