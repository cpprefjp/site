# iterator_traits
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Iterator>
  struct iterator_traits {
    using difference_type   = typename Iterator::difference_type;
    using value_type        = typename Iterator::value_type;
    using pointer           = typename Iterator::pointer;
    using reference         = typename Iterator::reference;
    using iterator_category = typename Iterator::iterator_category;
  };

  // ポインタに対する特殊化、C++20から
  template<class T>
    requires is_object_v<T>
  struct iterator_traits<T*> {
    using iterator_concept  = contiguous_iterator_tag;
    using iterator_category = random_access_iterator_tag;
    using value_type        = remove_cv_t<T>;
    using difference_type   = ptrdiff_t;
    using pointer           = T*;
    using reference         = T&;
  };

  // ポインタに対する特殊化、C++17まで
  template <class T>
  struct iterator_traits<T*> {
    using difference_type   = ptrdiff_t;

    using value_type        = T;              // C++03
    using value_type        = remove_cv_t<T>; // C++17

    using pointer           = T*;
    using reference         = T&;
    using iterator_category = random_access_iterator_tag;
  };

  template <class T>
  struct iterator_traits<const T*> { // C++14まで
    using difference_type   = ptrdiff_t;
    using value_type        = T;
    using pointer           = const T*;
    using reference         = const T&;
    using iterator_category = random_access_iterator_tag;
  };
}
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* random_access_iterator_tag[link /reference/iterator/iterator_tag.md]
* contiguous_iterator_tag[link /reference/iterator/iterator_tag.md]

## 概要
`iterator_traits`は、イテレータに関する型情報を取得するためのクラスである。

イテレータが指す値型、分類を取得でき、ポインタに対しても一様に適用できる。


| 型 | 説明 |
|---------------------|------------------------|
| `difference_type`   | イテレータの差を表す符号付き整数型 |
| `value_type`        | イテレータが指している値型 |
| `pointer`           | ポインタ型 |
| `reference`         | イテレータが指している参照型 |
| `iterator_category` | イテレータの分類を表す型(参照： [iterator tag](/reference/iterator/iterator_tag.md)) |

## 定義

任意のイテレータ型を`I`とする。

### C++17

- `iterator_traits<I>`の特殊化がある場合、それが使用される。
- 特殊化されておらず、`I`が5つのメンバ型（`difference_type, value_type, pointer, reference, iterator_category`）を定義している場合、それを用いて上記にあるように定義される。
- それ以外の場合、`iterator_traits<I>`は5つのメンバ型のいずれも定義しない。

### C++20

- `iterator_traits<I>`の特殊化がある場合、それが使用される。

- 特殊化されておらず、`I`が4つのメンバ型（`difference_type, value_type, reference, iterator_category`）を定義している場合、それぞれのメンバ型は次のように定義される
  ```cpp
  using difference_type   = typename I::difference_type;
  using value_type        = typename I::value_type;
  using pointer           = void;
  using reference         = typename I::reference;
  using iterator_category = typename I::iterator_category;
  ```

    - この時、`I::pointer`も定義されているならば、`pointer`はそれを用いて定義される。

- いずれかのメンバ型が定義されておらず、`I`が`cpp17-input-iterator`コンセプトを満たす場合、それぞれのメンバ型は次のように定義される
    ```cpp
    using difference_type   = typename incrementable_traits<I>::difference_type;
    using value_type        = typename indirectly_readable_traits<I>::value_type;
    using pointer           = see below;
    using reference         = see below;
    using iterator_category = see below;
    ```
    * indirectly_readable_traits[link /reference/iterator/indirectly_readable_traits.md]
    * incrementable_traits[link /reference/iterator/incrementable_traits.md]
    * iter_reference_t[link /reference/iterator/iter_reference_t.md]

    - `pointer`は、上から順に次のいずれか
    ```cpp
    using pointer = I::pointer;
    using pointer = decltype(declval<I&>().operator->());
    using pointer = void;
    ```

    - `reference`は、上から順に次のいずれか
    ```cpp
    using reference = typename I::reference;
    using reference = iter_reference_t<I>;
    ```
    * iter_reference_t[link /reference/iterator/iter_reference_t.md]

    - `iterator_category`は、上から順に次のいずれか
        - `I`が`cpp17-random-access-iterator`コンセプトを満たす場合、`random_access_iterator_tag`
        - `I`が`cpp17-bidirectional-iterator`コンセプトを満たす場合、`bidirectional_iterator_tag`
        - `I`が`cpp17-forward-iterator`コンセプトを満たす場合、`forward_iterator_tag`
        - それ以外の場合、`input_iterator_tag`


- そうではなく、`I`が`cpp17-iterator`コンセプトを満たす場合、それぞれのメンバ型は次のように定義される
    ```cpp
    using difference_type   = typename incrementable_traits<I>::difference_type;
    using value_type        = void;
    using pointer           = void;
    using reference         = void;
    using iterator_category = output_iterator_tag;
    ```
    * incrementable_traits[link /reference/iterator/incrementable_traits.md]

    - この時、`incrementable_traits<I>::difference_type`が定義されない場合、`difference_type = void`

- それ以外の場合、`iterator_traits<I>`は5つのメンバ型のいずれも定義しない。

登場した`cpp17-input-iterator`等のコンセプトは全て次のように定義される説明専用のものである。

```cpp
template<class I>
concept cpp17-iterator =
  copyable<I> && requires(I i) {
    {   *i } -> can-reference;
    {  ++i } -> same_as<I&>;
    { *i++ } -> can-reference;
  };

template<class I>
concept cpp17-input-iterator =
  cpp17-iterator<I> && equality_comparable<I> && requires(I i) {
    typename incrementable_traits<I>::difference_type;
    typename indirectly_readable_traits<I>::value_type;
    typename common_reference_t<iter_reference_t<I>&&,
                                typename indirectly_readable_traits<I>::value_type&>;
    typename common_reference_t<decltype(*i++)&&,
                                typename indirectly_readable_traits<I>::value_type&>;
    requires signed_integral<typename incrementable_traits<I>::difference_type>;
  };

template<class I>
concept cpp17-forward-iterator =
  cpp17-input-iterator<I> && constructible_from<I> &&
  is_lvalue_reference_v<iter_reference_t<I>> &&
  same_as<remove_cvref_t<iter_reference_t<I>>,
          typename indirectly_readable_traits<I>::value_type> &&
  requires(I i) {
    {  i++ } -> convertible_to<const I&>;
    { *i++ } -> same_as<iter_reference_t<I>>;
  };

template<class I>
concept cpp17-bidirectional-iterator =
  cpp17-forward-iterator<I> && requires(I i) {
    {  --i } -> same_as<I&>;
    {  i-- } -> convertible_to<const I&>;
    { *i-- } -> same_as<iter_reference_t<I>>;
  };

template<class I>
concept cpp17-random-access-iterator =
  cpp17-bidirectional-iterator<I> && totally_ordered<I> &&
  requires(I i, typename incrementable_traits<I>::difference_type n) {
    { i += n } -> same_as<I&>;
    { i -= n } -> same_as<I&>;
    { i +  n } -> same_as<I>;
    { n +  i } -> same_as<I>;
    { i -  n } -> same_as<I>;
    { i -  i } -> same_as<decltype(n)>;
    {  i[n]  } -> convertible_to<iter_reference_t<I>>;
  };
```
* copyable[link /reference/concepts/copyable.md]
* can-reference[link /reference/iterator/dereferenceable.md]
* incrementable_traits[link /reference/iterator/incrementable_traits.md]
* indirectly_readable_traits[link /reference/iterator/indirectly_readable_traits.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* signed_integral[link /reference/concepts/signed_integral.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* totally_ordered[link /reference/concepts/totally_ordered.md]

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

// 範囲の合計値を計算する
template <class Iterator>
typename std::iterator_traits<Iterator>::value_type
    sum(Iterator first, Iterator last)
{
  // イテレータの型から値型を取得する
  using value_type = typename std::iterator_traits<Iterator>::value_type;

  // 取得した値型の変数を定義し、合計値を計算する
  value_type result = value_type();
  for (; first != last; ++first) {
    result += *first;
  }
  return result;
}

int main()
{
  // std::vector
  {
    std::vector<int> v = {1, 2, 3, 4, 5};

    int result = sum(std::begin(v), std::end(v));
    std::cout << result << std::endl;
  }
  // ポインタ
  {
    int ar[] = {1, 2, 3, 4, 5};

    int result = sum(std::begin(ar), std::end(ar));
    std::cout << result << std::endl;
  }
}
```
* std::iterator_traits<Iterator>::value_type[color ff0000]

### 出力
```
15
15
```

## 参照
- [LWG 2952. `iterator_traits` should work for pointers to cv `T`](https://wg21.cmeerw.net/lwg/issue2952)
    - C++17から、`const T*`の部分特殊化が、`T*`の部分特殊化に統合され、`volatile`付きのポインタもこのクラスで扱えるようになった
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
