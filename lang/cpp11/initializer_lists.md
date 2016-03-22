#初期化子リスト
* cpp11[meta cpp]

##概要
「初期化子リスト (initializer lists)」は、ユーザー定義型のオブジェクトに対して、波カッコによるリスト初期化を使用できるようにするようオーバーロードする機能である。

これによって、[`std::vector`](/reference/vector.md)のようなコンテナクラスに対しても、組み込み配列と同様に、波カッコによる簡易的な初期化構文を使用できる：

```cpp
// 1, 2, 3の3要素を持つ配列オブジェクトを定義する
int ar[] = {1, 2, 3};
std::vector<int> v1 = {1, 2, 3};
std::vector<int> v2 {1, 2, 3};

// 再代入
v2 = {4, 5, 6};
```
* std::vector[link /reference/vector.md]

ユーザー定義型に対してリスト初期化を許可するためには、[`<initializer_list>`](/reference/initializer_list.md)ヘッダで定義される[`std::initializer_list`](/reference/initializer_list.md)クラスのオブジェクトをパラメータとして、コンストラクタや代入演算子をオーバーロードする：

```cpp
#include <vector>
#include <initializer_list>

template <class T>
class MyVector {
  std::vector<T> data_;
public:
  // リスト初期化用のコンストラクタ
  MyVector(std::initializer_list<T> init)
    : data_(init.begin(), init.end()) {}
};

int main()
{
  MyVector<int> v = {1, 2, 3};
}
```
* std::vector[link /reference/vector.md]
* std::initializer_list[link /reference/initializer_list.md]
* init.begin()[link /reference/initializer_list/begin.md]
* init.end()[link /reference/initializer_list/end.md]

リスト初期化用のコンストラクタに`explicit`を付けた場合、代入演算子によるリスト初期化は許可せず、代入演算子を伴わないリスト初期化のみが許可される：

```cpp
#include <vector>
#include <initializer_list>

template <class T>
class MyVector {
  std::vector<T> data_;
public:
  // リスト初期化用のコンストラクタ
  explicit MyVector(std::initializer_list<T> init)
    : data_(init.begin(), init.end()) {}
};

int main()
{
// MyVector<int> v = {1, 2, 3}; // コンパイルエラー！
   MyVector<int> v {1, 2, 3};   // OK
}
```
* std::vector[link /reference/vector.md]
* std::initializer_list[link /reference/initializer_list.md]
* init.begin()[link /reference/initializer_list/begin.md]
* init.end()[link /reference/initializer_list/end.md]


##仕様
- 波カッコ `{ }` を使用した初期化子のリストによるオブジェクトもしくは参照の初期化を、「リスト初期化 (list initialization)」と呼び、その初期化子を「初期化子リスト (initializer list)」と呼ぶ。初期化子リストは、カンマ区切りで要素を列挙する
- 初期化子リストは、空であってもよい


###初期化子リストを使用できる文脈
初期化子リストは、以下の文脈で使用できる：

- 変数定義での初期化子リストによる初期化

    ```cpp
struct X {
  X(std::initializer_list<int>) {}
};

X x1 {1, 2, 3};   // 直接初期化して変数定義
X {1, 2, 3};      // 直接初期化して一時オブジェクトを定義
X x2 = {1, 2, 3}; // コピー初期化して変数定義
```
* std::initializer_list[link /reference/initializer_list.md]

- `new`式での初期化子リストによる初期化

    ```cpp
new X {1, 2, 3}; // 動的記憶域でXオブジェクトを直接初期化
```

- `return`文

    ```cpp
X f()
{
  return {1, 2, 3};
}
```

- 関数の引数

    ```cpp
void f(X) {}
f({1, 2, 3});
```

- 式の一部

    ```cpp
std::vector<X> xs {
  {1, 2, 3}, // 初期化子リストのなかでさらに初期化子リストを使用する
  {4, 5, 6}
};
```
* std::vector[link /reference/vector.md]

- 基本クラスやメンバの初期化子

    ```cpp
struct Y : X {
  std::vector<int> values;

  Y()
    : X {1, 2, 3}, values {4, 5, 6} {}
};
```
* std::vector[link /reference/vector.md]

- 代入演算子の右辺

    ```cpp
struct X {
  X& operator=(std::initializer_list<int>) { return *this; }
};

X x;
x = {1, 2, 3};
```
* std::initializer_list[link /reference/initializer_list.md]


###縮小変換
- 初期化子リストに縮小変換が要求された場合、プログラムは不適格となる

    ```cpp
struct X {
  X(std::initializer_list<int>) {}
};

X x1 = {1, 2, 3}; // OK
//X x2 = {1, 2, 3.0}; // コンパイルエラー！3.0をint型に縮小変換できない
```
* std::initializer_list[link /reference/initializer_list.md]

- 縮小変換以外の型変換は許可される

    ```cpp
struct X {
  X(std::initializer_list<double>) {}
};

X x1 = {1, 2, 3};   // OK
X x2 = {1, 2, 3.0}; // OK
```
* std::initializer_list[link /reference/initializer_list.md]


###初期化子リストコンストラクタ
以下の条件を満たすコンストラクタを、「初期化子リストコンストラクタ (initializer-list constructor)」と呼ぶ：

- 任意の型`E`を要素とする`std::initializer_list<E>`型のパラメータをひとつだけとり、そのほかのパラメータを持たない
- もしくは、`std::initializer_list<E>`型のパラメータおよび、それ以降にデフォルト引数を持つ


###オーバーロード解決
- デフォルトコンストラクタと初期化子リストコンストラクタがある場合、空の初期化子リストが渡された際にはデフォルトコンストラクタが呼び出される

    ```cpp
#include <iostream>
#include <initializer_list>

struct X {
  X()
  {
    std::cout << "default constructor" << std::endl;
  }

  X(std::initializer_list<int>)
  {
    std::cout << "initializer-list constructor" << std::endl;
  }
};

int main()
{
  X x = {}; // 「default constructor」が出力される
}
```
* std::initializer_list[link /reference/initializer_list.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

- 初期化子リストコンストラクタと、その初期化子リストの要素型と同じ型のパラメータリストを受け取るコンストラクタでは、初期化子リストコンストラクタが優先して呼び出される。そのような状況では、丸カッコでのコンストラクタ呼び出しが必要となる

    ```cpp
struct X {
  X(std::initializer_list<double>) {
    std::cout << 1 << std::endl;
  }
  X(double d) {
    std::cout << 2 << std::endl;
  }
};

X x1 = {3.0}; // 「1」が出力される
```
* std::initializer_list[link /reference/initializer_list.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

- 異なる要素型を持つ`std::initializer_list`型同士でオーバーロードができる

    ```cpp
struct X {
  X(std::initializer_list<int>)
  {
    std::cout << 1 << std::endl;
  }

  X(std::initializer_list<double>)
  {
    std::cout << 2 << std::endl;
  }
};

X {1, 2, 3};       // 「1」が出力される
X {1.0, 2.0, 3.0}; // 「2」が出力される
```
* std::initializer_list[link /reference/initializer_list.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###初期化子リストオブジェクトの寿命
- 初期化子リストが暗黙的に`std::initializer_list<E>`に型変換される際、実装は`E`型の要素を`N`個持つ配列を確保するかのように振る舞う。変換された`std::initializer_list<E>`オブジェクトは、元となった初期化子リストの配列を参照する。以下のような初期化子リストの引数渡しがあった場合、

    ```cpp
struct X {
  X(std::initializer_list<double>) {}
};

X x = {1, 2, 3};
```
* std::initializer_list[link /reference/initializer_list.md]

    実装は以下と同等の初期化を行う (実装が用意した`std::initializer_list`クラスがポインタの組を受け取れると仮定する)：

    ```cpp
double __a[3] = {double{1}, double{2}, double{3}};
X x(std::initializer_list<double>(__a, __a+3));
```
* std::initializer_list[link /reference/initializer_list.md]

    元となった配列の寿命は、変換先の`std::initializer_list`オブジェクトと同じとなる


###型推論
- 初期化リストを`auto`で受けた場合、`std::initializer_list`型に推論される。ただし、空の初期化子リストは推論に失敗する

    ```cpp
auto x1 = {1, 2, 3}; // x1の型はstd::initializer_list<int>
//auto x2 = {};      // コンパイルエラー！x2の型を推論できない
```

- 単一要素の初期化子リストを`auto`で受けた場合、C++11では`std::initializer_list<T>`型に推論されるが、C++1zでは`T`型に推論されるよう仕様が変更される予定なので注意

    ```cpp
auto x = {1}; // C++11ではxの型はstd::initializer_list<int>。
              // C++1zではxの型はintになる予定
```

- 関数テンプレートのパラメータとして初期化子リストを受けとった場合は、`std::initializer_list`型には推論されない

    ```cpp
template <class T>
void f(T) {}

int main()
{
  f({1, 2, 3}); // コンパイルエラー！Tの型を推論できない
}
```

- `std::initializer_list`の要素型のみを関数テンプレートで推論させることはできる

    ```cpp
template <class T>
void f(std::initializer_list<T>) {}

f({1, 2, 3}); // OK : Tはint
```
* std::initializer_list[link /reference/initializer_list.md]


###評価順序
- 初期化子リストに列挙した要素は、先頭から順番に評価されることが保証される

    ```cpp
#include <iostream>
#include <initializer_list>

int f()
{
  std::cout << 1 << std::endl;
  return 1;
}

int g()
{
  std::cout << 2 << std::endl;
  return 2;
}

int h()
{
  std::cout << 3 << std::endl;
  return 3;
}

int main()
{
  std::initializer_list<int> init = { f(), g(), h() }; // 1, 2, 3の順で出力される
}
```
* std::initializer_list[link /reference/initializer_list.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


##この機能が必要になった背景・経緯
C++の目標として、「組み込み型の振る舞いをユーザー定義型で定義できるようにする」というものがある。しかし、組み込み配列での波カッコを使用したリスト初期化は、ユーザー定義型に対してオーバーロードができなかった。それにより、[`std::vector`](/reference/vector.md)のようなコンテナクラスの初期化が使いにくいものとなっていた：

```cpp
const int N = 3;
int ar[N] = {1, 2, 3};
std::vector<int> v(ar, ar + N);
```
* std::vector[link /reference/vector.md]

この問題を解決するために、波カッコによるリスト初期化をユーザー定義型でオーバーロードする機能が求められ、[`std::initializer_list`](/reference/initializer_list.md)クラスとオーバーロード機能が導入された。


##関連項目
- [C++11 一様初期化](uniform_initialization.md)


##参照
- [N1493 Braces Initialization Overloading](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1493.pdf)
- [N1509 Generalized Initializer Lists](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1509.pdf)
- [N1584 Regularizing Initialization Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1584.pdf)
- [N1701 Regularizing Initialization Syntax (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1701.pdf)
- [N1824 Extending Aggregate Initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1824.htm)
- [N1890 Initialization and initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1890.pdf)
- [N1919 Initializer lists](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1919.pdf)
- [N2210 Initializer lists (Rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2100.pdf)
- [N2215 Initializer lists (Rev. 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2215.pdf)
- [N2531 Initializer lists WP wording (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2531.pdf)
- [N2575 Initializer Lists - Alternative Mechanism and Rationale](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2575.pdf)
- [N2640 Initializer Lists - Alternative Mechanism and Rationale (v. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2640.pdf)
- [N2672 Initializer List proposed wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2672.htm)
- [CWG Issue 1030. Evaluation order in initializer-lists used in aggregate initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1030)

