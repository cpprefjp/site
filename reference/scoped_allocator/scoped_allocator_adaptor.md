# scoped_allocator_adaptor
* scoped_allocator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class OuterAlloc, class... InnerAllocs>
  class scoped_allocator_adaptor : public OuterAlloc;
}
```

## 概要
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


## メンバ関数

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

[constructor]: ./scoped_allocator_adaptor/op_constructor.md
[inner_allocator]: ./scoped_allocator_adaptor/inner_allocator.md
[outer_allocator]: ./scoped_allocator_adaptor/outer_allocator.md
[allocate]: ./scoped_allocator_adaptor/allocate.md
[deallocate]: ./scoped_allocator_adaptor/deallocate.md
[max_size]: ./scoped_allocator_adaptor/max_size.md
[construct]: ./scoped_allocator_adaptor/construct.md
[destroy]: ./scoped_allocator_adaptor/destroy.md
[select]: ./scoped_allocator_adaptor/select_on_container_copy_construction.md


## メンバ型

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
| `propagate_on_container_copy_assignment` | コンテナのコピー代入でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_copy_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/false_type.md)が使用される。 | C++11 |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_move_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/false_type.md)が使用される。 | C++11 |
| `propagate_on_container_swap`            | コンテナの`swap`操作でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_swap`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/false_type.md)が使用される。 | C++11 |
| `rebind<U>` | 型`U`を確保するように再束縛する | C++11 |


## 非メンバ関数

| 名前                                                       | 説明       | 対応バージョン |
|------------------------------------------------------------|------------|-------|
| [`operator==`](scoped_allocator_adaptor/op_equal.md)     | 等値比較   | C++11 |
| [`operator!=`](scoped_allocator_adaptor/op_not_equal.md) | 非等値比較 | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](scoped_allocator_adaptor/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例1 コンテナとその要素で、アロケータオブジェクトの状態を伝搬させる
```cpp example
#include <iostream>
#include <vector>
#include <forward_list>

#include <scoped_allocator>

// std::allocatorに状態変数を持たせただけのクラス
template <class T>
class MyAlloc : public std::allocator<T> {
  int state_; // 状態

  template <class> friend class MyAlloc;
public:
  template <class U>
  struct rebind { using other = MyAlloc<U>; };

  MyAlloc(int state = 0)
    : state_(state) {}

  template <class U>
  MyAlloc(const MyAlloc<U>& alloc)
    : state_(alloc.state_) {}

  int getState() const { return state_; }
};

template <class T, class U>
bool operator==(const MyAlloc<T>& lhs, const MyAlloc<U>& rhs)
{ return lhs.getState() == rhs.getState(); }

template <class T, class U>
bool operator!=(const MyAlloc<T>& lhs, const MyAlloc<U>& rhs)
{ return lhs.getState() != rhs.getState(); }

// コンテナの要素(Inner)
using forward_list = std::forward_list<
  int,
  MyAlloc<int>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<MyAlloc<T>>
>;

int main()
{
  // stringで使用するアロケータオブジェクトを、
  // vectorでも使用する
  int state = 5;
  MyAlloc<forward_list> alloc(state);
  vector<forward_list> v(alloc);

  v.push_back(forward_list{100});
  v.push_back(forward_list{200});

  // 同じアロケータオブジェクトが使われていることを確認する。
  // getState()の値が、どちらも5になる。
  std::cout << v.get_allocator().getState() << std::endl;
  std::cout << v.front().get_allocator().getState() << std::endl;
}
```
* std::scoped_allocator_adaptor[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* v.push_back[link /reference/vector/push_back.md]
* v.get_allocator()[link /reference/vector/get_allocator.md]
* v.front()[link /reference/vector/front.md]

### 出力
```
5
5
```

## 例2 全ての要素にアロケータオブジェクトの状態を伝搬させる
```cpp example
#include <iostream>
#include <vector>
#include <forward_list>
#include <scoped_allocator>

// std::allocatorに状態変数を持たせただけのクラス
template <class T>
class MyAlloc : public std::allocator<T> {
  int state_; // 状態

  template <class> friend class MyAlloc;
public:
  template <class U>
  struct rebind { using other = MyAlloc<U>; };

  MyAlloc(int state = 0)
    : state_(state) {}

  template <class U>
  MyAlloc(const MyAlloc<U>& alloc)
    : state_(alloc.state_) {}

  int getState() const { return state_; }
};

template <class T, class U>
bool operator==(const MyAlloc<T>& lhs, const MyAlloc<U>& rhs)
{ return lhs.getState() == rhs.getState(); }

template <class T, class U>
bool operator!=(const MyAlloc<T>& lhs, const MyAlloc<U>& rhs)
{ return lhs.getState() != rhs.getState(); }

// コンテナの要素(Inner)
using forward_list = std::forward_list<
  int,
  MyAlloc<int>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<MyAlloc<T>, MyAlloc<typename T::value_type>>
>;

int main()
{
  int outer_state = 5;
  int inner_state = 2;
  vector<forward_list>::allocator_type alloc {
    (MyAlloc<forward_list>(outer_state)), // vector自体のアロケータオブジェクト
    (MyAlloc<int>(inner_state))    // vectorの全ての要素に使用するアロケータオブジェクト
  };
  vector<forward_list> v(alloc);

  v.push_back(forward_list{100});
  v.push_back(forward_list{200});

  // コンテナに使用されるアロケータの状態を確認
  // 5になる(outer_state)
  std::cout << "container allocator : " << v.get_allocator().getState() << std::endl;

  // 要素に使用されるアロケータの状態を確認
  // 全ての要素に、アロケータの状態が伝搬される
  for (const forward_list& x : v) {
    std::cout << "element allocator : " << x.get_allocator().getState() << std::endl;
  }
}
```
* std::scoped_allocator_adaptor[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* v.push_back[link /reference/vector/push_back.md]
* v.get_allocator()[link /reference/vector/get_allocator.md]
* x.get_allocator()[link /reference/forward_list/get_allocator.md]

### 出力
```
container allocator : 5
element allocator : 2
element allocator : 2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N2554 The Scoped Allocator Model (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2554.pdf)
- [Scoped allocators - C++11 FAQ](http://www.stroustrup.com/C++11FAQ.html#scoped-allocator)

