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

