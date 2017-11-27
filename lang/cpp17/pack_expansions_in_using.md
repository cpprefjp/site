# using宣言のパック展開
* cpp17[meta cpp]

## 概要

C++17にて`using`宣言の仕様が拡張され、パラメータパックが指定できるようになった。
具体的には`using`宣言の識別子をカンマで区切ること、
パラメータパックに省略記号`...`を指定してパック展開が可能になる。

C++14では下記のように1つずつ宣言していたが、

```cpp
using std::cout;
using std::endl;
```

下記のように一度に宣言できるようになった。
1つ目の識別子と名前空間が同じであっても省略はできないため、
2番目のような書き方はできない。

```cpp
using std::cout, std::endl;

//using std::cout, endl; // NG
```

省略記号`...`を指定しパック展開を行う例は下記の通り。

```cpp
template <typename... T>
struct A : T... {
  using T::operator()...; // 受け取ったクラスのoperator()を全て使えるようにする
};
```


## 仕様

文法の仕様は下記の通り。

```
  using-declaration:
    using using-declarator-list ;

  using-declarator-list:
    using-declarator ...opt
    using-declarator-list , using-declarator ...opt
```

## 例

`ForAll`は`operator()(int)`メンバ関数を持つクラステンプレートである。
複数のクラスをテンプレートパラメータに受け取り、受け取った全てのクラスを継承する。
テンプレートパラメータのパック展開を行う`using`宣言により、
継承した全てのクラスの`operator()`を使えるようにしている。

この例では`long`や`std::string`を引数として渡すと`ForAll::operator()(int)`ではなく、
`using`宣言した`ForLong::operator()(long)`や`ForString::operator()(cons std::string&)`が呼び出される。

```cpp example
#include <iostream>

struct ForLong {
  void operator()(long v) {
    std::cout << "ForLong:" << v << std::endl;
  }
};

struct ForString {
  void operator()(const std::string& v) {
    std::cout << "ForString:" << v << std::endl;
  }
};

template <typename... T>
struct ForAll : T... {
  using T::operator()...;
  void operator()(int v) {
    std::cout << "ForAll:" << v << std::endl;
  }
};

int main()
{
  ForAll<ForLong, ForString> p;
  p(10);
  p(100L);
  p("hello");
}
```


### 出力

```
ForAll:10
ForLong:100
ForString:hello
```


## この機能が必要になった背景・経緯

C++11にて可変引数テンプレートが導入され、
テンプレートパラメータに渡されたクラスをパック展開し、一度に全て継承することができるようになった。

```cpp
template <typename... T>
struct ForAll2 : T... {
  // Tに指定されたクラスを全て継承
};
```

しかしC++11やC++14ではパラメータパックに指定されたクラスが持つメンバ関数を、
全て`using`宣言する簡単な方法がなかった。
このためクラステンプレートが基本クラスと派生クラスでメンバ関数をオーバーロードする場合、
実装が煩雑になってしまう問題があった。

```cpp example
#include <iostream>

struct ForLong {
  void operator()(long v) {
    std::cout << "ForLong:" << v << std::endl;
  }
};

struct ForString {
  void operator()(const std::string& v) {
    std::cout << "ForString:" << v << std::endl;
  }
};

// C++14までの方法、C++17でも使えるが冗長

// クラスを2つ以上受け取る場合、先頭のクラス T とそれ以外 Ts に分割する
template <typename T, typename... Ts>
struct ForAll2 : T, ForAll2<Ts...> {
  using T::operator(); // 先頭のクラス T の operator() を使えるようにする
  using ForAll2<Ts...>::operator(); // 残りのクラスを再帰的に使えるようにする
};

// クラスを1つだけ受け取る場合、特殊な処理を行う（部分特殊化）
//
// クラステンプレートのみだと、クラスを1つしか受け取らない場合に
// Ts... が空になって ForAll2<Ts...> が文法エラーになる
// このためクラスが1つの場合は特別扱いする必要がある
template <typename T>
struct ForAll2<T> : T {
  using T::operator();
  void operator()(int v) {
    std::cout << "ForAll2:" << v << std::endl;
  }
};

int main()
{
  ForAll2<ForLong, ForString> p;
  p(20);
  p(200L);
  p("hello2");
}
```

### 出力

```
ForAll2:20
ForLong:200
ForString:hello2
```


この問題を解決するためC++17では`using`でパック展開ができるようになった。


## 関連項目
- [可変引数テンプレート](/lang/cpp11/variadic_templates.md)

## 参照
- [P0195R2 Pack expansions in using-declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0195r2.html)
