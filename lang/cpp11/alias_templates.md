#エイリアステンプレート
* cpp11[meta cpp]

##概要
「エイリアステンプレート (alias templates)」は、テンプレートによって型の別名を定義する機能である。これによって、パラメータ化した型の別名付けができる。

エイリアステンプレートによる型の別名付けには、`typedef`キーワードではなく`using`キーワードを使用する：

```cpp
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
* std::vector[link /reference/vector.md]
* v.push_back[link /reference/vector/push_back.md]

`using`キーワードによる型の別名付けは、非テンプレートに対しても使用できる。この機能を「エイリアス宣言 (alias declaration)」という：

```cpp
// int型にIntegerという別名を付ける
using Integer = int;

// int型を2つパラメータとしてとり、int型を返す関数ポインタに、
// FunctionPointerという名前を付ける
using FunctionPointer = int(*)(int, int);
```

##参照
- [N1406 Proposed Addition to C++: Typedef Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1406.pdf)
- [N1449 Proposal to add template aliases to C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1449.pdf)
- [N1451 A Case for Template Aliasing](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1451.html)
- [N1489 Templates aliases for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1489.pdf)
- [N2112 Templates Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2112.pdf)
- [N2258 Templates Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2258.pdf)

