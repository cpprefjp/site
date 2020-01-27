# 初期化�リスト
* cpp11[meta cpp]

## 概要
「初期化�リスト (initializer lists)」は、ユーザー定義型のオブジェクトに対して、波カッコによるリスト初期化を使用できるようにするようオーバー�ードする機能である。

これによって、[`std::vector`](/reference/vector.md)のようなコンテナクラスに対しても、組み込み配列と同様に、波カッコによる簡易的な初期化構文を使用できる：

```cpp
// 1, 2, 3の3要素を持つ配列オブジェクトを定義する
int ar[] = {1, 2, 3};
std::vector<int> v1 = {1, 2, 3};
std::vector<int> v2 {1, 2, 3};

// 再代入
v2 = {4, 5, 6};
```

ユーザー定義型に対してリスト初期化を許可するためには、[`<initializer_list>`](/reference/initializer_list/initializer_list.md)ヘッダで定義される[`std::initializer_list`](/reference/initializer_list/initializer_list.md)クラスのオブジェクトをパラメータとして、コンストラクタや代入演算�をオーバー�ードする：

```cpp example
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
* init.begin()[link /reference/initializer_list/initializer_list/begin.md]
* init.end()[link /reference/initializer_list/initializer_list/end.md]

リスト初期化用のコンストラクタに`explicit`を付けた場合、代入演算�によるリスト初期化は許可せず、代入演算�を伴わないリスト初期化のみが許可される：

```cpp example
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
* init.begin()[link /reference/initializer_list/initializer_list/begin.md]
* init.end()[link /reference/initializer_list/initializer_list/end.md]


## 仕様
- 波カッコ `{ }` を使用した初期化�のリストによるオブジェクトもしくは参照の初期化を、「リスト初期化 (list initialization)」と呼び、その初期化�を「初期化�リスト (initializer list)」と呼ぶ。初期化�リストは、カンマ区切りで要素を列挙する
- 初期化�リストは、空であってもよい


### <a id="initializer-list-contexts" href="#initializer-list-contexts">初期化�リストを使用できる文脈</a>
初期化�リストは、以下の文脈で使用できる：

- 変数定義での初期化�リストによる初期化

    ```cpp
    struct X {
      X(std::initializer_list<int>) {}
    };

    X x1 {1, 2, 3};   // 直接初期化して変数定義
    X {1, 2, 3};      // 直接初期化して一時オブジェクトを定義
    X x2 = {1, 2, 3}; // コピー初期化して変数定義
    ```

- `new`式での初期化�リストによる初期化

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
      {1, 2, 3}, // 初期化�リストのなかでさらに初期化�リストを使用する
      {4, 5, 6}
    };
    ```

- 基底クラスやメンバの初期化�

    ```cpp
    struct Y : X {
      std::vector<int> values;

      Y()
        : X {1, 2, 3}, values {4, 5, 6} {}
    };
    ```

- 代入演算�の右辺

    ```cpp
    struct X {
      X& operator=(std::initializer_list<int>) { return *this; }
    };

    X x;
    x = {1, 2, 3};
    ```


### <a id="narrow-conversion" href="#narrow-conversion">縮小変換</a>
- 初期化�リストに縮小変換が要求された場合、プ�グラムは不適格となる

    ```cpp
    struct X {
      X(std::initializer_list<int>) {}
    };

    X x1 = {1, 2, 3}; // OK
    //X x2 = {1, 2, 3.0}; // コンパイルエラー！3.0をint型に縮小変換できない
    ```

- 縮小変換以外の型変換は許可される

    ```cpp
    struct X {
      X(std::initializer_list<double>) {}
    };

    X x1 = {1, 2, 3};   // OK
    X x2 = {1, 2, 3.0}; // OK
    ```


### <a id="initializer-list-constructor" href="#initializer-list-constructor">初期化�リストコンストラクタ</a>
以下の条件を満たすコンストラクタを、「初期化�リストコンストラクタ (initializer-list constructor)」と呼ぶ：

- 任意の型`E`を要素とする`std::initializer_list<E>`型のパラメータをひとつだけとり、そのほかのパラメータを持たない
- もしくは、`std::initializer_list<E>`型のパラメータおよび、それ以降にデフォルト引数を持つ


### <a id="overload-resolution" href="#overload-resolution">オーバー�ード解決</a>
- デフォルトコンストラクタと初期化�リストコンストラクタがある場合、空の初期化�リストが渡された際にはデフォルトコンストラクタが呼び出される

    ```cpp example
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

- 初期化�リストコンストラクタと、その初期化�リストの要素型と同じ型のパラメータリストを受け取るコンストラクタでは、初期化�リストコンストラクタが優先して呼び出される。そのような状況では、丸カッコでのコンストラクタ呼び出しが必要となる

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

- 異なる要素型を持つ`std::initializer_list`型同士でオーバー�ードができる

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


### <a id="life-time" href="#life-time">初期化�リストオブジェクトの寿命</a>
- 初期化�リストが暗黙的に`std::initializer_list<E>`に型変換される際、実装は`E`型の要素を`N`個持つ配列を確保するかのように振る舞う。変換された`std::initializer_list<E>`オブジェクトは、元となった初期化�リストの配列を参照する。以下のような初期化�リストの引数渡しがあった場合、

    ```cpp
    struct X {
      X(std::initializer_list<double>) {}
    };

    X x = {1, 2, 3};
    ```

    実装は以下と�価の初期化を行う (実装が用意した`std::initializer_list`クラスがポインタの組を受け取れると仮定する)：

    ```cpp
    double __a[3] = {double{1}, double{2}, double{3}};
    X x(std::initializer_list<double>(__a, __a+3));
    ```

    元となった配列の寿命は、変換先の`std::initializer_list`オブジェクトと同じとなる


### <a id="type-deduction" href="#type-deduction">型推論</a>
- 初期化リストを`auto`で受けた場合、`std::initializer_list`型に推論される。ただし、空の初期化�リストは推論に失敗する

    ```cpp
    auto x1 = {1, 2, 3}; // x1の型はstd::initializer_list<int>
    //auto x2 = {};      // コンパイルエラー！x2の型を推論できない
    ```

- 単一要素の初期化�リストを`auto`で受けた場合、C++11では`std::initializer_list<T>`型に推論されるが、C++17では`T`型に推論されるよう仕様が変更されるので注意

    ```cpp
    auto x = {1}; // C++11ではxの型はstd::initializer_list<int>。
                  // C++17ではxの型はintになる
    ```

- 関数テンプレートのパラメータとして初期化�リストを受けとった場合は、`std::initializer_list`型には推論されない

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


### <a id="evaluation-order" href="#evaluation-order">評価順序</a>
- 初期化�リストに列挙した要素は、先�から順番に評価されることが保証される

    ```cpp example
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


## この機能が必要になった背景・経緯
C++の目標として、「組み込み型の振る舞いをユーザー定義型で定義できるようにする」というものがある。しかし、組み込み配列での波カッコを使用したリスト初期化は、ユーザー定義型に対してオーバー�ードができなかった。それにより、[`std::vector`](/reference/vector.md)のようなコンテナクラスの初期化が使いにくいものとなっていた：

```cpp
const int N = 3;
int ar[N] = {1, 2, 3};
std::vector<int> v(ar, ar + N);
```

この問題を解決するために、波カッコによるリスト初期化をユーザー定義型でオーバー�ードする機能が求められ、[`std::initializer_list`](/reference/initializer_list/initializer_list.md)クラスとオーバー�ード機能が導入された。


## 関連項目
- [C++11 一様初期化](uniform_initialization.md)


## 参照
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

