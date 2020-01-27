# 継承コンストラクタ
* cpp11[meta cpp]

## 概要
「継承コンストラクタ (inheriting constructors)」は、基底クラスで定義したコンストラクタ群を、派生クラスでそのまま使用できるようにするための糖衣構文である。

継承コンストラクタは、`using`�ーワードに続いて、基底クラス名とそのコンストラクタ名を`::`区切りで記述する：

```cpp example
#include <string>

struct Base1 {
  Base1() {}
  Base1(int) {}
};

struct Base2 {
  Base2() {}
  Base2(const std::string&) {}
};

struct Derived : Base1, Base2 {
  // Base1とBase2のコンストラクタを、Derivedで暗黙的に宣言する
  using Base1::Base1;
  using Base2::Base2;

  // Derived(), Derived(int), Derived(const std::string&)が暗黙宣言される
};

int main()
{
  Derived d1(3);       // OK
  Derived d2("hello"); // OK
}
```

継承コンストラクタは、指定した基底クラスのコンストラクタ全てを暗黙に宣言するが、一部のコンストラクタを明示的に宣言することを許可している：

```cpp
struct Derived : Base1, Base2 {
  // Base1とBase2のコンストラクタを、Derivedで暗黙的に宣言する
  using Base1::Base1;
  using Base2::Base2;

  // Base2::Base2(const std::string&)のコンストラクタだけは、
  // 暗黙宣言されたものを使用せずに、明示的に宣言する。
  Derived(const std::string& s)
    : Base2::Base2(s) {}
};
```


## 仕様
- using宣言で基底クラスのコンストラクタを指定することで、基底クラスのコンストラクタ群を暗黙に宣言できる
- 基底クラスの、ひとつ以上のデフォルト引数を持つコンストラクタは、省略記号 `...` があるバージョンとないバージョンの両方を派生クラスのコンストラクタ候補として宣言し、デフォルト引数を後ろから順番になくしたそれぞれのバージョンを派生クラスのコンストラクタ候補として宣言する

```cpp
struct Base {
  Base(int a = 1, int b = 2);
};

struct Derived : Base {
  using Base::Base;

  // Derived(), Derived(int), Derived(int, int)が候補となる
};
```

- 基底クラスから引き継いだ各コンストラクタ候補は、テンプレートパラメータリスト、パラメータの型リスト、`explicit`、`constexpr`、例外仕様もまた引き継ぐ
- 基底クラスで`delete`宣言されたコンストラクタは、派生クラスでもまた`delete`宣言される


## この機能が必要になった背景・経緯
多くの場合、派生クラスのコンストラクタは、基底クラスと同じものを持つ。そのため、派生クラスから基底クラスのコンストラクタに引数を転送するようお決まりのコードを書く必要があり、これはうんざりするような作�だった。そのために、基底クラスから全てのコンストラクタを引き継ぐコードを簡単に書ける機能が必要とされ、継承コンストラクタが導入されることとなった。


## 検討されたほかの選択肢
継承コンストラクタの構文は、段階的にいくつかのバリエーションが考案された：

1. `using derived = base;` という構文で、`base`クラスのコンストラクタを`derived`クラスで使用できるようにする
2. `using default base;` という構文で、`base`クラスのコンストラクタを派生クラスからデフォルトで参照できるようにする
3. `base_constructors`�ーワードを追加し、`using base_constructors;` という構文で、基底クラスのコンストラクタを派生クラスから使用できるようにする

最終的に、新しい構文や�ーワードを導入することをやめ、既�のusing宣言構文に、各基底クラスのコンストラクタを指定することとなった。


## 参照
- [N1583 Inheriting Constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1583.pdf)
- [N1890 Initialization and initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1890.pdf)
- [N1898 Forwarding and inherited constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1898.pdf)
- [N2119 Inheriting Constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2119.html)
- [N2203 Inheriting Constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2203.html)
- [N2254 Inheriting Constructors (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2254.html)
- [N2376 Inheriting Constructors (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2376.html)
- [N2438 Inheriting Constructors (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2438.htm)
- [N2512 Inheriting Constructors (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2512.html)

