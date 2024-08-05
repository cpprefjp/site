# allocator_traits
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Alloc>
  struct allocator_traits;
}
```

## 概要
`allocator_traits`は、アロケータクラスの機能に間接的にアクセスするためのインタフェースを提供するクラスである。


## 備考
このクラスはC++11から導入され、メモリアロケータを扱うクラス(たとえばコンテナ)は、アロケータクラスの機能に直接アクセスする従来の仕様から、`allocator_traits`を介してアロケータにアクセスするように変更された。

`allocator_traits`はアロケータに必要な機能の多くに対してデフォルト実装を用意しているため、この変更により、ユーザーが自作アロケータを作るのが容易になった。


### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------------------------|-------|
| [`allocate`](allocator_traits/allocate.md)     | メモリを確保する                             | C++11 |
| [`allocate_at_least`](allocator_traits/allocate_at_least.md) | 指定した要素数以上のメモリを確保する | C++23 |
| [`deallocate`](allocator_traits/deallocate.md) | メモリを解放する                             | C++11 |
| [`max_size`](allocator_traits/max_size.md)     | 一度に確保可能なメモリの最大サイズを取得する | C++11 |
| [`construct`](allocator_traits/construct.md)   | 引数を元にインスタンスを構築する             | C++11 |
| [`destroy`](allocator_traits/destroy.md)       | インスタンスを破棄する                       | C++11 |
| [`select_on_container_copy_construction`](allocator_traits/select_on_container_copy_construction.md) | コンテナのコピー構築に使用するアロケータオブジェクトを取得する | C++11 |


### メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|----------------------------------------------|-------|
| `allocator_type`  | アロケータ型 `Alloc`                         | C++11 |
| `value_type`      | 要素の型 `typename Alloc::value_type`        | C++11 |
| `pointer`         | 要素のポインタ型。<br/> `Alloc`がメンバ型`pointer`を持っていればそれを使用し、そうでなければ`value_type*`を使用する。 | C++11 |
| `const_pointer`   | 読み取り専用の要素のポインタ型。<br/> `Alloc`がメンバ型`const_pointer`を持っていればそれを使用し、そうでなければ[`pointer_traits`](pointer_traits.md)`<pointer>::rebind<const value_type>`を使用する。 | C++11 |
| `void_pointer`    | `void`のポインタ型。<br/> `Alloc`がメンバ型`void_pointer`を持っていればそれを使用し、そうでなければ[`pointer_traits`](pointer_traits.md)`<pointer>::rebind<void>`を使用する。 | C++11 |
| `const_void_pointer`    | 読み取り専用の`void`のポインタ型。<br/> `Alloc`がメンバ型`const_void_pointer`を持っていればそれを使用し、そうでなければ[`pointer_traits`](pointer_traits.md)`<pointer>::rebind<const void>`を使用する。 | C++11 |
| `difference_type` | ポインタの差を表す符号付き整数型。<br/> `Alloc`がメンバ型`difference_type`を持っていればそれを使用し、そうでなければ[`pointer_traits`](pointer_traits.md)`<pointer>::difference_type`を使用する。 | C++11 |
| `size_type`       | 要素数を表す符号なし整数型。<br/> `Alloc`がメンバ型`size_type`を持っていればそれを使用し、そうでなければ[`make_unsigned`](/reference/type_traits/make_unsigned.md)`<difference_type>::type`を使用する。 | C++11 |
| `propagate_on_container_copy_assignment` | コンテナのコピー代入時に、アロケータオブジェクトをコピー(伝播)するか否か。<br/>`Alloc`がメンバ型`propagate_on_container_copy_assignment`を持っていればそれを使用し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)を使用する。 | C++11 |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入時に、アロケータオブジェクトをコピー(伝播)するか否か。<br/>`Alloc`がメンバ型`propagate_on_container_move_assignment`を持っていればそれを使用し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)を使用する。 | C++11 |
| `propagate_on_container_swap` | コンテナの交換時に、アロケータオブジェクトをコピー(伝播)するか否か。<br/>`Alloc`がメンバ型`propagate_on_container_swap`を持っていればそれを使用し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)を使用する。 | C++11 |
| `is_always_equal` | `Alloc::is_always_equal`が存在する場合は`Alloc::is_always_equal`。それ以外の場合は`is_empty<Alloc>::type`。 | C++17 |
| `rebind_alloc<U>` | 型`U`を確保するようにアロケータ型を再束縛する。<br/> `Alloc::rebind<U>::other`が有効ならそれを使用し、そうでなければ`Alloc<U, Args>`を使用する(ここで、`Args`は0個以上の型引数で、`Alloc`が`Alloc<T, Args>`だった際の`Args`である)。`Alloc`がクラステンプレートでない場合、`rebind_alloc`の使用は不適格となる。 | C++11 |
| `rebind_traits<U>` | 再束縛した型`U`に対する`allocator_traits`。`allocator_traits<rebind_alloc<U>>` | C++11 |


## 例
### 基本的な使い方
```cpp example
#include <memory>

template <class T, class Alloc>
class MyVector {
  T* data_;
  std::size_t size_;
  Alloc alloc_;
public:
  MyVector(std::size_t size)
  {
    using traits = std::allocator_traits<Alloc>;

    size_ = size;

    // メモリを確保
    data_ = traits::allocate(alloc_, size);

    // 要素を構築
    for (std::size_t i = 0; i < size_; ++i) {
      traits::construct(alloc_, &data_[i]);
    }
  }

  ~MyVector()
  {
    using traits = std::allocator_traits<Alloc>;

    // 要素を破棄
    for (std::size_t i = 0; i < size_; ++i) {
      traits::destroy(alloc_, &data_[i]);
    }

    // メモリを解放
    traits::deallocate(alloc_, data_, size_);
  }
};

int main()
{
  MyVector<int, std::allocator<int>> v(3);
}
```
* std::allocator_traits[color ff0000]
* std::allocator[link allocator.md]
* traits::allocate[link allocator_traits/allocate.md]
* traits::construct[link allocator_traits/construct.md]
* traits::destroy[link allocator_traits/destroy.md]
* traits::deallocate[link allocator_traits/deallocate.md]

#### 出力
```
```


### rebind_allocの使用例
```cpp
#include <iostream>
#include <memory>

template <class T>
struct node {
  T value;
  node<T>* next;
};

// 単方向リンクリストの実装
template <class T, class Alloc=std::allocator<T>>
class my_forward_list {
  // 実際にメモリ確保したいのはT型ではなくnode<T>型なので、
  // allocator<T>をallocator<node<T>>に置き換える
  using allocator_type = typename std::allocator_traits<
    Alloc
  >::template rebind_alloc<node<T>>;

  using allocator_traits_type =
    std::allocator_traits<allocator_type>;

  node<T>* head_ = nullptr;
  allocator_type alloc_;

public:
  ~my_forward_list() {
    node<T>* p = head_;
    while (p) {
      node<T>* next = p->next;

      allocator_traits_type::destroy(alloc_, p);
      allocator_traits_type::deallocate(alloc_, p, 1);

      p = next;
    }
  }

  void push_back(const T& x) {
    node<T>* new_node = allocator_traits_type::allocate(alloc_, 1);
    allocator_traits_type::construct(alloc_, new_node, node<T>{x, nullptr});

    if (!head_) {
      head_ = new_node;
    }
    else {
      node<T>* last_node = head_;
      while (true) {
        if (!last_node->next) {
          last_node->next = new_node;
          break;
        }
        last_node = last_node->next;
      }
    }
  }

  void print() {
    for (auto* p = head_; p; p = p->next) {
      std::cout << p->value << std::endl;
    }
  }
};

int main() {
  my_forward_list<int> ls;
  ls.push_back(3);
  ls.push_back(1);
  ls.push_back(4);
  ls.print();
}
```
* rebind_alloc[color ff0000]
* allocator_traits_type::allocate[link allocator_traits/allocate.md]
* allocator_traits_type::construct[link allocator_traits/construct.md]
* allocator_traits_type::destroy[link allocator_traits/destroy.md]
* allocator_traits_type::deallocate[link allocator_traits/deallocate.md]

#### 出力
```
3
1
4
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]

## 参照
- [Allocators@C++11 - Cryolite](http://www.slideshare.net/Cryolite/allocator11final)
- [A visitor’s guide to C++ allocators](https://rawgit.com/google/cxx-std-draft/allocator-paper/allocator_user_guide.html)
- [N2982 Allocators post Removal of C++ Concepts (Rev 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2982.pdf)
- [AllocatorAwareContainer: Introduction and pitfalls of `propagate_on_container_XXX` defaults](https://www.foonathan.net/2015/10/allocatorawarecontainer-propagation-pitfalls/)
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
