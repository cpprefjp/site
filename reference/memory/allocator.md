# allocator
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  class allocator;

  template <>
  class allocator<void> { // C++17から非推奨
    using pointer       = void*;
    using const_pointer = const void*;
    using value_type    = void;
    template <class U> struct rebind { using other = allocator<U>; };
  };
}
```

## 概要
`allocator`は、標準ライブラリ内でデフォルト使用されるメモリアロケータクラスである。

標準ライブラリ内では、主にコンテナがメモリの確保と解放を行っているが、コンテナ内で使用するメモリアロケータは、ユーザーが独自に実装したものを`allocator`クラスの代わりに使用することもできる。例：

```cpp
std::vector<int> v1;                   // std::allocatorクラスでメモリアロケートされる。
std::vector<int, MyAllocator<int>> v2; // 自分が用意したアロケータを使用する。
```


### 備考
C++11から：

デストラクタを除く、`allocator`クラスのメンバ関数は、データ競合を引き起こさない。そのため、複数スレッドから同時に`allocator`クラスのメンバ関数が呼ばれたとしても、正しくメモリ確保・解放される。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------|-------|
| [`(constructor)`](allocator/op_constructor.md) | コンストラクタ                          | |
| [`(destructor)`](allocator/op_destructor.md) | デストラクタ                              | |
| `operator=(const allocator&) = default`   | 代入演算子                                   | |
| [`allocate`](allocator/allocate.md)       | メモリを確保する                             | |
| [`deallocate`](allocator/deallocate.md)   | メモリを解放する                             | |
| [`address`](allocator/address.md)         | 変数のアドレスを取得する                     | C++17から非推奨 |
| [`max_size`](allocator/max_size.md)       | 一度に確保可能なメモリの最大サイズを取得する | C++17から非推奨 |
| [`construct`](allocator/construct.md)     | 引数を元にインスタンスを構築する             | C++17から非推奨 |
| [`destroy`](allocator/destroy.md)         | インスタンスを破棄する                       | C++17から非推奨 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|----------------------------------------------|-------|
| `value_type`      | 要素の型 `T`                                 | |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入時に、アロケータの状態を伝搬するか。 [`true_type`](/reference/type_traits/true_type.md) | C++14 |
| `size_type`       | 要素数を表す符号なし整数型 `size_t`          | C++17から非推奨 |
| `difference_type` | ポインタの差を表す符号あり整数型 `ptrdiff_t` | C++17から非推奨 |
| `pointer`         | 要素のポインタ型 `T*`                        | C++17から非推奨 |
| `const_pointer`   | 読み取り専用の要素のポインタ型 `const T*`    | C++17から非推奨 |
| `reference`       | 要素の参照型 `T&`                            | C++17から非推奨 |
| `const_reference` | 読み取り専用の要素の参照型 `const T&`        | C++17から非推奨 |
| `rebind<U>`       | 型`U`を確保するように再束縛する              | C++17から非推奨 |


## 非メンバ関数

| 名前                                        | 説明                          | 対応バージョン |
|---------------------------------------------|-------------------------------|-------|
| [`operator==`](allocator/op_equal.md)     | 等値比較。常に`true`を返す    | |
| [`operator!=`](allocator/op_not_equal.md) | 非等値比較。常に`false`を返す | |


## 非推奨の詳細
C++17から、`void`の特殊化版が非推奨となった。代わりに[`std::allocator_traits`](allocator_traits.md)クラスの`rebind`機能を使用すること。


## 例
```cpp example
#include <memory>
#include <iostream>
#include <algorithm>
#include <numeric>

int main(int argc, char** argv) {
  auto alc = std::allocator<int>();

  // 10要素のint型が入る領域を確保
  int* arr = alc.allocate(10);

  // 確保した領域の各要素を構築する(コンストラクタを呼び出す)
  for (std::size_t i = 0; i != 10; ++i) alc.construct(arr + i);

  std::iota(arr, arr + 10, 0);
  std::for_each(arr, arr + 10, [](int i) { std::cout << i << " "; });
  std::cout << std::endl;

  // 配列の各要素を破棄する(デストラクタを呼び出す)
  for (std::size_t i = 0; i != 10; ++i) alc.destroy(arr + i);

  // 領域を解放する
  alc.deallocate(arr, 10);
}
```
* std::allocator[color ff0000]
* alc.allocate[link allocator/allocate.md]
* alc.construct[link allocator/construct.md]
* std::iota[link /reference/numeric/iota.md]
* alc.destroy[link allocator/destroy.md]
* alc.deallocate[link allocator/deallocate.md]

### 出力
```
0 1 2 3 4 5 6 7 8 9 
```

### 処理系
- `propagate_on_container_move_assignment`
    - [Clang, C++1y mode](/implementation.md#clang): 3.4
    - [GCC, C++1y mode](/implementation.md#gcc): 
    - [Visual C++](/implementation.md#visual_cpp): 2012, 2013

## 参照
- [A visitor’s guide to C++ allocators](https://rawgit.com/google/cxx-std-draft/allocator-paper/allocator_user_guide.html)
- [LWG #2103 - std::allocator_traits<std::allocator<T>>::propagate_on_container_move_assignment](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2103)
- [N2669 Thread-Safety in the Standard Library (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2669.htm)
- [AllocatorAwareContainer: Introduction and pitfalls of `propagate_on_container_XXX` defaults](http://foonathan.github.io/blog/2015/10/05/allocatorawarecontainer-propagation-pitfalls.html)
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
