#pointer_traits (C++11)
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Ptr> struct pointer_traits;
  template <class T> struct pointer_traits<T*>;
}
```

##概要
`pointer_traits`は、ポインタと見なせる型の情報に統一的にアクセスするためのクラスである。スマートポインタもポインタと見なせる。


###静的メンバ関数

| 名前                                           | 説明                       | 対応バージョン |
|------------------------------------------------|----------------------------|-------|
| [`pointer_to`](./pointer_traits/pointer_to.md) | 変数へのポインタを取得する | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------|----------------------------------------------|-------|
| `pointer`      | ポインタと見なせる型 `Ptr` | C++11 |
| `element_type` | ポインタが指す要素型。<br/> 型`Ptr`が`element_type`型を持っていればそれを使用する。型`Ptr`が要素型`T`と0個以上の他のパラメータをとるクラステンプレートであれば`T`を使用する。そうでなければ不適格となる。 | C++11 |
| `difference_type` | ポインタの差を表す符号あり整数型。<br/> 型`Ptr`が`difference_type`型を持っていればそれを使用し、そうでなければ[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)型を使用する。 | C++11 |
| `rebind<U>`    | 型の再束縛。<br/> 型`Ptr`が`rebind<U>`を持っていればそれを使用する。型`Ptr`が型`T`と0個以上の他のパラメータをとるクラステンプレートであれば、型`U`で再束縛した`Ptr`型を使用する。どちらもなければ、`rebind<U>`のインスタンス化は不適格となる。 | C++11 |


###メンバ型(ポインタに対する特殊化)

| 名前              | 説明 | 対応バージョン |
|-------------------|------|----------------|
| `pointer`         | `T*` | C++11          |
| `element_type`    | `T`  | C++11          |
| `difference_type` | [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++11 |
| `rebind<U>`       | `U*` | C++11          |


##例
```cpp
#include <memory>
#include <type_traits>

int main()
{
  // スマートポインタの要素型を取得する
  using smart_ptr_element = std::pointer_traits<std::shared_ptr<int>>::element_type;
  static_assert(std::is_same<smart_ptr_element, int>::value, "element type is int");

  // ポインタの要素型を取得する
  using ptr_element = std::pointer_traits<int*>::element_type;
  static_assert(std::is_same<ptr_element, int>::value, "element type is int");
}
```
- pointer_traits[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0

###参照
- [N2982 Allocators post Removal of C++ Concepts (Rev 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2982.pdf)
- [Why `pointer_traits` was introduced in C++11 - Doug Judd's Blog](http://blog.nuggetwheat.org/index.php/2015/09/01/why-pointer_traits-was-introduced-in-c11/)

