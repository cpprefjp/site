# 属性の無視性を見直し [P2552R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20時点で、不明な属性を無視する仕様は以下のようになっていた。

「この規格書で規定されていない属性の動作は実装定義である。実装が認識できない属性はすべて無視される。」

この仕様は、規格外の属性を無視するものなのか、規格内の属性も無視してよい意図なのか、という点であいまいだった。

C++26では、以下の方針で属性の無視性を決定する。

1. 構文的な無視性
2. 意味論的な無視性
3. `__has_cpp_attribute`の動作


### 1. 構文的な無視性
標準属性は、構文的に無視してはならず、意味論的に無視するとしても、実装は構文を診断しなければならない。パラメータのあり・なし、およびその形式といった構文が規定されたものであること。

```cpp
// C++26: noreturn属性はパラメータを持たないため構文エラー
[[noreturn("cannot have a reason")]]
int f();

// C++26: deprecated属性のパラメータは文字列でなければならないため構文エラー
[[deprecated(not_a_string)]] int g();

// C++26: nodiscard属性のパラメータは文字列でなければならないため構文エラー
[[nodiscard(this?is!a:balanced%{token[sequence]})]]
int h();
```

### 2. 意味論的な無視性
適格なプログラムが与えられた際、特定の標準属性のインスタンスをすべて削除し、プログラムの観測可能な振る舞いを変化させることが実装に許可される。ただし、削除後の動作が削除前のプログラムにとって適合動作 (conforming behaviour) である場合に限られる。

例として、空のオブジェクトのサイズを削減する[`[[no_unique_address]]`](/lang/cpp20/language_support_for_empty_objects.md)において、`sizeof(Y)`は[`[[no_unique_address]]`](/lang/cpp20/language_support_for_empty_objects.md)属性が無視されなければ`sizeof(int)`と同値となり、無視されれば`sizeof(X) + sizeof(int)`となる。

```cpp
struct X {};

struct Y {
  [[no_unique_address]] X x;
  int i;
};

int main() {
  return sizeof(Y) == sizeof(int);
}
```

`sizeof(Y) == sizeof(int)`の結果が`true`と`false`どちらであったとしても、適合動作であることに変わりはないため、無視することが許容される。

C++11の策定段階では属性だった[`alignas`](/lang/cpp11/alignas.md) (その後キーワードになった) は、アライメントが変わるとプログラムの適格動作 (mandated behaviour) が変わるため、無視してはならない。


### 3. `__has_cpp_attribute`の動作
標準属性の機能テストマクロは、実装がその属性の (省略可能な) 意味論を実装している場合にのみ正の値を返す。構文チェックのみを行い、意味論を実装しない場合には、正の値を返してはならない。

```cpp
// no_unique_addressの構文チェックと意味論まで実装されている場合に、trueとなる
#if __has_cpp_attribute(no_unique_address)
  …
#endif
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 属性構文](/lang/cpp11/attributes.md)
- [C++17 不明な属性を無視する](/lang/cpp17/non_standard_attributes.md)


## 参照
- [P2552R3 On the ignorability of standard attributes](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2552r3.pdf)
