#allocator_traits(C++11)
```cpp
namespace std {
  template <class Alloc>
  struct allocator_traits;
}
```

##概要
`allocator_traits`は、アロケータクラスの機能に間接的にアクセスするためのインタフェースを提供するクラスである。


##備考
このクラスはC++11から導入され、メモリアロケータを扱うクラス(たとえばコンテナ)は、アロケータクラスの機能に直接アクセスする従来の仕様から、`allocator_traits`を介してアロケータにアクセスするように変更された。

`allocator_traits`はアロケータに必要な機能の多くに対してデフォルト実装を用意しているため、この変更により、ユーザーが自作アロケータを作るのが容易になった。


###静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------------------------|-------|
| [`allocate`](./allocator_traits/allocate.md)     | メモリを確保する                             | C++11 |
| [`deallocate`](./allocator_traits/deallocate.md) | メモリを解放する                             | C++11 |
| [`max_size`](./allocator_traits/max_size.md)     | 一度に確保可能なメモリの最大サイズを取得する | C++11 |
| [`construct`](./allocator_traits/construct.md)   | 引数を元にインスタンスを構築する             | C++11 |
| [`destroy`](./allocator_traits/destroy.md)       | インスタンスを破棄する                       | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|----------------------------------------------|-------|
| `allocator_type`  | アロケータ型 `Alloc`                         | C++11 |
| `value_type`      | 要素の型 `typename Alloc::value_type`        | C++11 |
| `pointer`         | 要素のポインタ型。<br/> `Alloc`がメンバ型`pointer`を持っていればそれを使用し、そうでなければ`value_type*`を使用する。 | C++11 |
| `const_pointer`   | 読み取り専用の要素のポインタ型。<br/> `Alloc`がメンバ型`const_pointer`を持っていればそれを使用し、そうでなければ[`pointer_traits`](./pointer_traits.md)`<pointer>::rebind<const value_type>`を使用する。 | C++11 |
| `void_pointer`    | `void`のポインタ型。<br/> `Alloc`がメンバ型`void_pointer`を持っていればそれを使用し、そうでなければ[`pointer_traits`](./pointer_traits.md)`<pointer>::rebind<void>`を使用する。 | C++11 |
| `const_void_pointer`    | 読み取り専用の`void`のポインタ型。<br/> `Alloc`がメンバ型`const_void_pointer`を持っていればそれを使用し、そうでなければ[`pointer_traits`](./pointer_traits.md)`<pointer>::rebind<const void>`を使用する。 | C++11 |
| `difference_type` | ポインタの差を表す符号あり整数型。<br/> `Alloc`がメンバ型`difference_type`を持っていればそれを使用し、そうでなければ[`pointer_traits`](./pointer_traits.md)`::difference_type`を使用する。 | C++11 |
| `size_type`       | 要素数を表す符号なし整数型。<br/> `Alloc`がメンバ型`size_type`を持っていればそれを使用し、そうでなければ[`make_unsigned`](/reference/type_traits/make_unsigned.md)`<difference_type>::type`を使用する。 | C++11 |
| `propagate_on_container_copy_assignment` | コンテナのコピー代入時に、アロケータオブジェクトをコピー(伝搬)するか否か。<br/>`Alloc`がメンバ型`propagate_on_container_copy_assignment`を持っていればそれを使用し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を使用する。 | C++11 |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入時に、アロケータオブジェクトをコピー(伝搬)するか否か。<br/>`Alloc`がメンバ型`propagate_on_container_move_assignment`を持っていればそれを使用し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を使用する。 | C++11 |
| `propagate_on_container_swap` | コンテナの交換時に、アロケータオブジェクトをコピー(伝搬)するか否か。<br/>`Alloc`がメンバ型`propagate_on_container_swap`を持っていればそれを使用し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を使用する。 | C++11 |
| `rebind_alloc<U>` | 型`U`を確保するようにアロケータ型を再束縛する。<br/> `Alloc::rebind<U>::other`が有効ならそれを使用し、そうでなければ`Alloc<U, Args`>を使用する。`Alloc`がクラステンプレートでない場合、`rebind_alloc`の使用は不適格となる。 | C++11 |


##例
```cpp
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.3
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

###参照
- [Allocators@C++11 - Cryolite](http://www.slideshare.net/Cryolite/allocator11final)
- [N2982 Allocators post Removal of C++ Concepts (Rev 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2982.pdf)

