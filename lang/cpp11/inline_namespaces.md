#インライン名前空間
* cpp11[meta cpp]

##概要
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


##例
###using namespaceによる名前空間省略の階層を段階的に指定する
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

####出力
```
```


###APIのバージョニング
インライン名前空間をデフォルトのバージョンとし、古いAPIを元の名前空間でそのまま残すようにできる。

```cpp
namespace my_namespace {
  namespace v1 {
    void f() {}
  }

  inline namespace v2 {
    void f() {}
  }
}

int main()
{
  my_namespace::v1::f(); // 古いバージョンのAPIを呼び出す
  my_namespace::v2::f(); // バージョンを明示的に指定してAPIを呼び出す
  my_namespace::f();     // デフォルトバージョンのAPIを呼び出す
}
```

####出力
```
```


##関連項目
- 時間間隔オブジェクトのリテラル
    - [`operator"" ns`](/reference/chrono/duration/op_ns.md)
    - [`operator"" us`](/reference/chrono/duration/op_us.md)
    - [`operator"" ms`](/reference/chrono/duration/op_ms.md)
    - [`operator"" s`](/reference/chrono/duration/op_s.md)
    - [`operator"" min`](/reference/chrono/duration/op_min.md)
    - [`operator"" h`](/reference/chrono/duration/op_h.md)
- 文字列オブジェクトのリテラル
    - [`operator"" s`](/reference/string/basic_string/op_s.md)
- 複素数オブジェクトのリテラル
    - [`operator"" i`](/reference/complex/op_i.md)
    - [`operator"" if`](/reference/complex/op_if.md)
    - [`operator"" il`](/reference/complex/op_il.md)


##参照
- [N1344 Namespaces and Library Versioning](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1344.pdf)
- [N2013 Versioning with Namespaces](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2013.html)
- [N2331 Namespace Association ("strong" using)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2331.html)
- [N2535 Namespace Association ("inline namespace")](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2535.htm)
- [7.9 Namespace Association - Using the GNU Compiler Collection (GCC)](https://gcc.gnu.org/onlinedocs/gcc/Namespace-Association.html#Namespace-Association)

