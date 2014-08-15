#scoped_allocator_adaptor (C++11)
```cpp
namespace std {
  template <class OuterAlloc, class... InnerAllocs>
  class scoped_allocator_adaptor : public OuterAlloc;
}
```

##概要
`scoped_allocator_adaptor`は、[`vector`](/reference/vector.md)`<`[`string`](/reference/string/basic_string.md)`>`のように、メモリ確保を行う型が入れ子になっているような場合に、外側と内側でアロケータオブジェクトを共有するための、アロケータクラスのアダプタである。

以下は、このアダプタクラスを使用することによって変化する、コンテナのメモリイメージである。


![](https://raw.github.com/cpprefjp/image/master/reference/scoped_allocator/scoped_allocator_adaptor/ScopedAllocatorModel_01.png)

図1 コンテナ、および各要素がそれぞれに別個のアロケータオブジェクトを持つ


![](https://raw.github.com/cpprefjp/image/master/reference/scoped_allocator/scoped_allocator_adaptor/ScopedAllocatorModel_03.png)

図2 コンテナとその要素で、アロケータオブジェクトの状態を伝搬させる(例1)

![](https://raw.github.com/cpprefjp/image/master/reference/scoped_allocator/scoped_allocator_adaptor/ScopedAllocatorModel_02.png)

図3 全ての要素にアロケータオブジェクトの状態を伝搬させる(例2)



テンプレートパラメータは、以下を意味する：

- `OuterAlloc` : 外側のアロケータ。(たとえばコンテナのアロケータ)
- `InnerAlloc...` : 内側のアロケータ。(たとえばコンテナの要素に対するアロケータ)


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------------------------------------|-------|
| [`(constructor)`][constructor]          | コンストラクタ                               | C++11 |
| `~scoped_allocator_adaptor() = default` | デストラクタ                                 | C++11 |
| [`inner_allocator`][inner_allocator]    | 内側のアロケータを取得する                   | C++11 |
| [`outer_allocator`][outer_allocator]    | 外側のアロケータを取得する                   | C++11 |
| [`allocate`][allocate]                  | メモリを確保する                             | C++11 |
| [`deallocate`][deallocate]              | メモリを解放する                             | C++11 |
| [`max_size`][max_size]                  | 一度に確保可能なメモリの最大サイズを取得する | C++11 |
| [`construct`][construct]                | オブジェクトを構築する                       | C++11 |
| [`destroy`][destroy]                    | オブジェクトを破棄する                       | C++11 |
| [`select_on_container_copy_construction`][select] | コンテナのコピー構築に必要なアロケータを取得する | C++11 |

[constructor]: ./scoped_allocator_adaptor/scoped_allocator_adaptor.md
[inner_allocator]: ./scoped_allocator_adaptor/inner_allocator.md
[outer_allocator]: ./scoped_allocator_adaptor/outer_allocator.md
[allocate]: ./scoped_allocator_adaptor/allocate.md
[deallocate]: ./scoped_allocator_adaptor/deallocate.md
[max_size]: ./scoped_allocator_adaptor/max_size.md
[construct]: ./scoped_allocator_adaptor/construct.md
[destroy]: ./scoped_allocator_adaptor/destroy.md
[select]: ./scoped_allocator_adaptor/select_on_container_copy_construction.md


##メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|------------------------------|-------|
| `outer_allocator_type` | 外側のアロケータ`OuterAlloc` | C++11 |
| `inner_allocator_type` | 内側のアロケータ。 `InnerAllocs`が空だったら`scoped_allocator_adaptor<OuterAlloc>`。空じゃなければ`scoped_allocator_adaptor<InnerAllocs...>`。 | C++11 |
| `value_type`           | 要素型` allocator_traits<OuterAlloc>::value_type` | C++11 |
| `size_type`            | 要素数を表す符号なし整数型 `allocator_traits<OuterAlloc>::size_type` | C++11 |
| `difference_type`      | ポインタの差を表す符号あり整数型` allocator_traits<OuterAlloc>::difference_type` | C++11 |
| `pointer`              | 要素のポインタ型` allocator_traits<OuterAlloc>::pointer` | C++11 |
| `const_pointer`        | 読み取り専用の要素のポインタ型 `allocator_traits<OuterAlloc>::const_pointer` | C++11 |
| `void_pointer`         | `void`ポインタ型 `allocator_traits<OuterAlloc>::void_pointer` | C++11 |
| `const_void_pointer`   | 読み取り専用の`void`ポインタ型 `allocator_traits<OuterAlloc>::const_void_pointer` | C++11 |
| `propagate_on_container_copy_assignment` | コンテナのコピー代入でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_copy_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 | C++11 |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_move_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 | C++11 |
| `propagate_on_container_swap`            | コンテナの`swap`操作でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_swap`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 | C++11 |
| `rebind<U>` | 型`U`を確保するように再束縛する | C++11 |


##非メンバ関数

| 名前                                                       | 説明       | 対応バージョン |
|------------------------------------------------------------|------------|-------|
| [`operator==`](./scoped_allocator_adaptor/op_equal.md)     | 等値比較   | C++11 |
| [`operator!=`](./scoped_allocator_adaptor/op_not_equal.md) | 非等値比較 | C++11 |


##例1 コンテナとその要素で、アロケータオブジェクトの状態を伝搬させる
```cpp
#include <iostream>
#include <vector>
#include <string>

#include <scoped_allocator>

// std::allocatorに状態変数を持たせただけのクラス
template <class T>
class MyAlloc : public std::allocator<T> {
  int state_; // 状態

  using BaseType = std::allocator<T>;
  template <class> friend class MyAlloc;
public:
  using BaseType::BaseType;

  MyAlloc(int state = 0)
    : state_(state) {}

  template <class U>
  MyAlloc(const MyAlloc<U>& alloc)
    : state_(alloc.state_) {}

  int getState() const { return state_; }
};

template <class T, class U>
bool operator==(const MyAlloc<T>&, const MyAlloc<U>&)
{ return true; }

template <class T, class U>
bool operator!=(const MyAlloc<T>&, const MyAlloc<U>&)
{ return false; }

template <class T>
using alloc = MyAlloc<T>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc<T>>
>;

int main()
{
  // stringで使用するアロケータオブジェクトを、
  // vectorでも使用する
  int state = 5;
  MyAlloc<string> alloc(state);
  vector<string> v(alloc);

  v.push_back("hello");
  v.push_back("world");

  // 同じアロケータオブジェクトが使われていることを確認する。
  // getState()の値が、どちらも5になる。
  std::cout << v.get_allocator().getState() << std::endl;
  std::cout << v.front().get_allocator().getState() << std::endl;
}
```

###出力
```
5
5
```

##例2 全ての要素にアロケータオブジェクトの状態を伝搬させる
```cpp
#include <iostream>
#include <vector>
#include <string>

#include <scoped_allocator>

// std::allocatorに状態変数を持たせただけのクラス
template <class T>
class MyAlloc : public std::allocator<T> {
  int state_; // 状態

  using BaseType = std::allocator<T>;
  template <class> friend class MyAlloc;
public:
  using BaseType::BaseType;

  MyAlloc(int state = 0)
    : state_(state) {}

  template <class U>
  MyAlloc(const MyAlloc<U>& alloc)
    : state_(alloc.state_) {}

  int getState() const { return state_; }
};

template <class T, class U>
bool operator==(const MyAlloc<T>&, const MyAlloc<U>&)
{ return true; }

template <class T, class U>
bool operator!=(const MyAlloc<T>&, const MyAlloc<U>&)
{ return false; }

template <class T>
using alloc_t = MyAlloc<T>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc_t<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc_t<T>, alloc_t<typename T::value_type>>
>;

int main()
{
  int outer_state = 5;
  int inner_state = 2;
  vector<string>::allocator_type alloc {
    alloc_t<string>(outer_state), // vector自体のアロケータオブジェクト
    alloc_t<char>(inner_state)    // vectorの全ての要素に使用するアロケータオブジェクト
  };
  vector<string> v(alloc);

  v.push_back("hello");
  v.push_back("world");

  // コンテナに使用されるアロケータの状態を確認
  // 5になる(outer_state)
  std::cout << "container allocator : " << v.get_allocator().getState() << std::endl;

  // 要素に使用されるアロケータの状態を確認
  // 全ての要素に、アロケータの状態が伝搬される
  for (const string& x : v) {
    std::cout << "element allocator : " << x.get_allocator().getState() << std::endl;
  }
}
```

###出力
```
container allocator : 5
element allocator : 2
element allocator : 2
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): (4.8時点でサポートされてるはずだが、サンプルが動かない)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###参照
- [N2554 The Scoped Allocator Model (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2554.pdf)
- [スコープ付きアロケータ - C++11 FAQ](http://www32.ocn.ne.jp/~ons/text/CPP0xFAQ.html.ja#scoped-allocator)

