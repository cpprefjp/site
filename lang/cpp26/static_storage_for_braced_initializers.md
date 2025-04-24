# std::initializer_listの配列を静的記憶域に配置する [P2752R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++11で導入された[`std::initializer_list`](/reference/initializer_list/initializer_list.md)は、自作クラスで組み込み配列のような配列初期化をする構文であるが、そのメモリとしてはスタック上に配置されていた。

```cpp
std::vector<int> v = {1, 2, 3};

// 以下と等価：
const int __a[] = {1, 2, 3};
std::vector<int> v(__a, __a + 3);
```

C++26では、プリプロセス時にファイル読み込む[`#embed`](/lang/cpp26/embed.md)機能が導入されることもあり、スタックオーバーフローのリスクがあった。

```cpp
std::vector<char> v = {
  #embed "2mb-image.png"
};
```

このため、C++26では、定数値のみ、かつ`mutable`に保持しない[`std::initializer_list`](/reference/initializer_list/initializer_list.md)は、静的記憶域に配置されるようになる。

```cpp
void f(std::initializer_list<double> il);

void g(float x) {
  f({1, x, 3});

  // 変数を含むため、静的記憶域には保持されない。
  // 以下と等価：
  // const double __a[3] = {double{1}, double{x}, double{3}};
  // f(std::initializer_list<double>(__a, __a+3));
}

void h() {
  f({1, 2, 3});

  // 定数のみであるため、静的記憶域に保持される。
  // 以下と等価：
  // static constexpr double __b[3] = {double{1}, double{2}, double{3}};
  // f(std::initializer_list<double>(__b, __b+3));
}

struct A {
  mutable int i;
};

void q(std::initializer_list<A>);

void r() {
  q({A{1}, A{2}, A{3}});

  // mutableにするため、静的記憶域に保持される。
  // 以下と等価：
  // const A __c[3] = {A{1}, A{2}, A{3}};
  // q(std::initializer_list<A>(__c, __c+3));
}
```

将来的に、静的記憶域に配置される配列は、共有される可能性がある。この動作のために、共有で予期しない問題が起きる`mutable`は共有から除外される。

```cpp
std::initializer_list<int> i1 = {1,2,3,4,5};
std::initializer_list<int> i2 = {2,3,4};
PERMIT(i1.begin() == i2.begin() + 1);  // 将来的な動作
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 初期化子リスト](/lang/cpp11/initializer_lists.md)
- [C++26 ファイルを読み込む`#embed`命令を追加](/lang/cpp26/embed.md)


## 参照
- [P2752R3 Static storage for braced initializers](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2752r3.html)
