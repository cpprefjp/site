# エイリアステンプレート
* cpp11[meta cpp]

## 概要
「エイリアステンプレート (alias templates)」は、テンプレートによって型の別名を定義する機能である。これによって、パラメータ化した型の別名付けができる。

エイリアステンプレートによる型の別名付けには、`typedef`キーワードではなく`using`キーワードを使用する：

```cpp example
#include <vector>

// 型std::vectorに別名Vecを付ける。
// 要素型Tはパラメータ化する
template <class T>
using Vec = std::vector<T>;

int main()
{
  // 要素型を渡してstd::vector型の別名を使用する
  Vec<int> v;
  v.push_back(3);
  v.push_back(1);
  v.push_back(4);
}
```
* v.push_back[link /reference/vector/push_back.md]

`using`キーワードによる型の別名付けは、非テンプレートに対しても使用できる。この機能を「エイリアス宣言 (alias declaration)」という：

```cpp
int f(int, int) { return 0; }

// int型にIntegerという別名を付ける
using Integer = int;

// int型を2つパラメータとしてとり、int型を返す関数ポインタに、
// FunctionPointerという名前を付ける
using FunctionPointer = int(*)(int, int);

// decltypeと組み合わせることで、
// 特定関数への関数ポインタの型をより簡単に取得できる
using FunctionPointerByDecltype = decltype(&f);
```


## 仕様
- テンプレートによる型の別名付けは、`using`キーワードによるもののみを許可し、`typedef`キーワードに対しては許可しない
- エイリアステンプレートによって付けられた型の別名と元の型は同等と見なされ、それらの間でオーバーロードはできない

    ```cpp
    template <class T>
    using Vec = std::vector<T>;

    template <class T>
    void f(const Vec<T>&) {}

    template <class T>
    void f(const std::vector<T>&) {} // コンパイルエラー！再定義と見なされる
    ```

- エイリアステンプレートに対しては、明示的な特殊化、および部分特殊化を許可しない


## この機能が必要になった背景・経緯
エイリアステンプレートがなかったころは、パラメータ化した型の別名付けとして、クラステンプレートを使用していた：

```cpp
template <class T>
struct Vec {
  typedef std::vector<T> type;
};

Vec<int>::type v;
v.push_back(3);
```
* v.push_back[link /reference/vector/push_back.md]

このような回避策は標準ライブラリでも、`std::allocator`クラスの`rebind`で使用されている。`T`型のメモリアロケータを使用している状況でほかの型をアロケートする必要ができた際には、`U`型をアロケートする`std::allocator`型を取得する機能が必要とされる。そのような状況のために用意されている`rebind`は、以下のように定義される：

```cpp
template <class T>
struct allocator {
  template <class U>
  struct rebind { typedef allocator<U> other; };
};

typedef allocator<void> void_alloc;

// int型をアロケートするallocator型を取得
typedef void_alloc::rebind<int>::other int_alloc;
```

前述した例での`::type`や、アロケータの例での`other`は冗長であり、必要とされることが多いこの機能には言語サポートが求められた。こういった経緯から、パラメータ化した型の別名付けが、言語機能としてサポートされることとなった。


## 参照
- [N1406 Proposed Addition to C++: Typedef Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1406.pdf)
- [N1449 Proposal to add template aliases to C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1449.pdf)
- [N1451 A Case for Template Aliasing](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1451.html)
- [N1489 Templates aliases for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1489.pdf)
- [N2112 Templates Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2112.pdf)
- [N2258 Templates Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2258.pdf)

