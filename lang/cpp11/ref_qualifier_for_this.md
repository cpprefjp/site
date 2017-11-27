# メンバ関数の左辺値／右辺値修飾
* cpp11[meta cpp]

## 概要
メンバ関数の`CV`修飾は、`*this`が`const`／`volatile`である場合とそうでない場合でメンバ関数をオーバーロードできる。

同じように、メンバ関数に対して`&`もしくは`&&`の参照修飾子を付加することで、`*this`が左辺値である場合に呼び出されるメンバ関数のオーバーロード、`*this`が右辺値である場合に呼び出されるメンバ関数のオーバーロードを定義できる。

これを使用することで、「一時オブジェクトな`*this`に対して特定のメンバ関数を呼び出せてはならない制約」、「`*this`が左辺値もしくは右辺値である場合の効率的な実装を使い分ける」といった設計ができるようになる。

```cpp
struct X {
  // 代入演算子は、*thisが左辺値である場合のみ呼び出せるようにする
  X& operator=(const X&) &
  {
    return *this;
  }
};

int main()
{
  X lvalue;
  lvalue = X(); // OK : lvalueオブジェクトは左辺値

//X() = lvalue; // コンパイルエラー！右辺値のオブジェクトに対して代入演算子は呼び出せない
}
```

参照修飾子は、CV修飾子と組み合わせて使用できる：

```cpp example
#include <iostream>

struct X {
  int f() &       // *thisが非constな左辺値である場合に呼び出される
  { return 1; }

  int f() const & // *thisがconstな左辺値である場合に呼び出される
  { return 2; }

  int f() &&      // *thisが右辺値である場合に呼び出される
  { return 3; }
};

int main()
{
  X x;
  const X cx;

  std::cout << x.f() << std::endl;   // 1
  std::cout << cx.f() << std::endl;  // 2
  std::cout << X().f() << std::endl; // 3
}
```


## 仕様
- コンストラクタとデストラクタに対しては、参照修飾子を付加できない
- CV修飾のみされたメンバ関数と、参照修飾のみされたメンバ関数ではオーバーロードできない

    ```cpp
    struct X {
      int f() const;
      int f() &;     // コンパイルエラー！
    };
    ```

- 仮想関数は、基本クラスと派生クラスで、同じ参照修飾子を持たなくてはならない


## 例
```cpp example
#include <vector>
#include <utility>

class X {
  std::vector<int> data_;
public:
  X() : data_(100) {}

  // *thisが左辺値の場合は、保持しているvectorオブジェクトへの参照を返す
  const std::vector<int>& data() const&
  { return data_; }

  // *thisが右辺値の場合は参照を返すと一時オブジェクトの寿命が尽きてしまうため、
  // ムーブで返す
  std::vector<int> data() &&
  { return std::move(data_); }
};

int main()
{
  X x;

  const std::vector<int>& v1 = x.data();
  std::vector<int> v2 = X().data();
}
```
* <utility>[link /reference/utility.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```


## 関連項目
- [C++20 `const`修飾されたメンバポインタの制限を修正](/lang/cpp20/fixing_const_qualified_pointers_to_members.md)


## 参照
- [N1784 A proposal to add l-value member function qualifier](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1784.htm)
- [N1821 Extending Move Semantics To `*this` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1821.htm)
- [N2377 Extending move semantics to `*this` (revised wording)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2377.htm)
- [N2439 Extending move semantics to `*this` (revised wording)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2439.htm)

