# インライン名前空間
* cpp11[meta cpp]

## 概要
インライン名前空間 (inline namespace)は、名前空間内の機能に透過的にアクセスするための機能である。`inline namespace`によって定義した名前空間の機能には、その名前空間を指定しなくてもアクセスできる。

```cpp
namespace my_namespace {
  inline namespace features {
    void f() {}
  }
}

int main()
{
  my_namespace::features::f();
  my_namespace::f();           // features名前空間は省略できる
}
```

この機能は、以下の用途に使用できる：

- `using namespace`による名前空間省略の階層を段階的に指定する
- APIのバージョニング


## 仕様
- 名前空間の`inline`指定は、名前付き名前空間と無名名前空間の定義で使用できる。`inline`指定された名前空間を「インライン名前空間 (inline namespace)」と呼ぶ

    ```cpp
    inline namespace my_namespace {}
    inline namespace {}
    ```

- インライン名前空間のメンバは、その外側の名前空間 (the enclosing namespace, それを取り囲む名前空間) のメンバとして使用できる
- インライン名前空間とその外側の名前空間は、引数依�の名前探索で探索される「関連ある名前空間(associated namespace)」となる

    ```cpp example
    #include <iostream>

    namespace ns1 {
      class X {};

      inline namespace ns2 {
        class Y {};

        void f(X)
        {
          std::cout << "call f()" << std::endl;
        }
      }

      void g(Y)
      {
        std::cout << "call g()" << std::endl;
      }
    }

    int main()
    {
      f(ns1::X());      // 「call f()」が出力される
      g(ns1::Y());      // 「call g()」が出力される
      g(ns1::ns2::Y()); // 「call g()」が出力される
    }
    ```

- インライン名前空間の外側の名前空間をusingディレクティブに指定することで、インライン名前空間のメンバがその外側の名前空間のメンバとして暗黙的に挿入される

    ```cpp example
    #include <iostream>

    namespace ns1 {
      inline namespace ns2 {
        void f()
        {
          std::cout << "call f()" << std::endl;
        }
      }
    }

    int main()
    {
      using namespace ns1;
      f();
    }
    ```

- インライン名前空間のメンバは、外側の名前空間で外側の名前空間のメンバであるかのように、明示的にインスタンス化、および明示的に特殊化できる

    ```cpp example
    #include <iostream>

    namespace ns1 {
      inline namespace ns2 {
        template <class T>
        struct X {
          static constexpr int value = 0;
        };
      }

      // インライン名前空間で定義されたクラステンプレートを
      // 明示的にインスタンス化
      template struct X<int>;

      // インライン名前空間で定義されたクラステンプレートを
      // 明示的に特殊化
      template <>
      struct X<void> {
        static constexpr int value = 1;
      };
    }

    int main()
    {
      std::cout << ns1::X<int>::value << std::endl;       // 0が出力される
      std::cout << ns1::X<void>::value << std::endl;      // 1が出力される
      std::cout << ns1::ns2::X<void>::value << std::endl; // 1が出力される
    }
    ```

- インライン名前空間の外側の名前空間の機能に、明示的な名前空間修飾付きでアクセスした場合でも、インライン名前空間をusingディレクティブしたのと同様にそのインライン名前空間の機能が外側の名前空間に持ち込まれる。これは、外側の名前空間とインライン名前空間で同名のメンバが定義されたときに、名前衝突による曖昧さが発生することを意味する

    ```cpp
    namespace ns1 {
      inline namespace ns2 {
        int a;
      }
      int a;
    }

    int main()
    {
      ns1::a = 0; // ns2で同名の変数が定義されているため、曖昧になる
    }
    ```

- 翻訳単位は、`std`名前空間をインライン名前空間として宣言してはならない


## 例
### using namespaceによる名前空間省略の階層を段階的に指定する
インライン名前空間を使用することで、`using namespace`の影響範囲をユーザーが選択できるようになる。

```cpp
namespace my_namespace {
  inline namespace features {
    void f() {}
  }

  void g() {}
}

int main()
{
  {
    // my_namespace::features名前空間も含む
    // my_namespace名前空間以下の機能を、名前空間修飾なしで
    // アクセスできるようにする
    using namespace my_namespace;
    f();
    g();
  }
  {
    // my_namespace::features名前空間以下の機能だけを
    // 名前空間修飾なしでアクセスできるようにする
    using namespace my_namespace::features;
    f();
    my_namespace::g();
  }
}
```

#### 出力
```
```


### APIのバージョニング
インライン名前空間をデフォルトのバージョンとし、古いAPIを元の名前空間でそのまま残すようにできる。

デフォルトのバージョンを切り替える際は、デフォルトバージョンにする名前空間をインライン名前空間に変更し、デフォルトバージョン以外の名前空間を非インライン名前空間に変更する。

これによって、バイナリ互換性を保つバージョニングをしやすくする。

```cpp example
#include <iostream>

namespace my_namespace {
  namespace v1 {
    void f()
    {
      std::cout << "v1" << std::endl;
    }
  }

  inline namespace v2 {
    void f()
    {
      std::cout << "v2" << std::endl;
    }
  }
}

int main()
{
  my_namespace::v1::f(); // 古いバージョンのAPIを呼び出す
  my_namespace::v2::f(); // バージョンを明示的に指定してAPIを呼び出す
  my_namespace::f();     // デフォルトバージョンのAPIを呼び出す
}
```

#### 出力
```
v1
v2
v2
```


## 関連項目
- 時間間隔オブジェクトのリテラル
    - [`operator"" ns`](/reference/chrono/duration/op_ns.md)
    - [`operator"" us`](/reference/chrono/duration/op_us.md)
    - [`operator"" ms`](/reference/chrono/duration/op_ms.md)
    - [`operator"" s`](/reference/chrono/duration/op_s.md)
    - [`operator"" min`](/reference/chrono/duration/op_min.md)
    - [`operator"" h`](/reference/chrono/duration/op_h.md)
- 文�列オブジェクトのリテラル
    - [`operator"" s`](/reference/string/basic_string/op_s.md)
- 複素数オブジェクトのリテラル
    - [`operator"" i`](/reference/complex/complex/op_i.md)
    - [`operator"" if`](/reference/complex/complex/op_if.md)
    - [`operator"" il`](/reference/complex/complex/op_il.md)


## 参照
- [N1344 Namespaces and Library Versioning](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1344.pdf)
- [N2013 Versioning with Namespaces](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2013.html)
- [N2331 Namespace Association ("strong" using)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2331.html)
- [N2535 Namespace Association ("inline namespace")](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2535.htm)
- [7.9 Namespace Association - Using the GNU Compiler Collection (GCC)](https://gcc.gnu.org/onlinedocs/gcc/Namespace-Association.html#Namespace-Association)
- [CWG Issue 812. Duplicate names in inline namespaces](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#812)
- [CWG Issue 861. Unintended ambiguity in inline namespace lookup](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#861)
- [Inline namespaces and ambigous declarations - Stackoverflow](http://stackoverflow.com/questions/27252466/inline-namespaces-and-ambigous-declarations/)

